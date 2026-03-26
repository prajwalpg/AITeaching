import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Initialize Gemini SDK securely via environment variable
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Critical: GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const { topic, difficulty, questionType, filepath } = await req.json();

    console.log("Incoming request:", { topic, difficulty, questionType, filepath });

    // Validate inputs
    if (!topic || !difficulty || !questionType) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields"
      }, { status: 400 });
    }

    // 1. Content Analyzer Agent Logic: Extract text from uploaded file if provided
    let fileContext = '';
    if (filepath) {
      if (!fs.existsSync(filepath)) {
         return NextResponse.json({ success: false, error: "File not found" }, { status: 400 });
      }
      try {
        const fileContent = fs.readFileSync(filepath, 'utf-8');
        // Basic extraction fallback to first 5000 chars for context size safety
        fileContext = "Textbook Context Uploaded: " + fileContent.substring(0, 5000); 
      } catch (e) {
        console.error("Content Analyzer unable to read file path:", filepath);
        return NextResponse.json({ success: false, error: "Unable to read uploaded file" }, { status: 500 });
      }
    }

    // 2. Question Generator Agent Logic:
    const prompt = `You are a Question Generator Agent for an AI Teaching application.
Target Topic: ${topic}
Difficulty: ${difficulty}
Format Type: ${questionType} (e.g. MCQ, Short, Descriptive)

Additional Context limits: ${fileContext ? fileContext : 'Generate based on general syllabus standards.'}

Analyze the topic and generate a beautifully formatted json output question paper.
Your output MUST be a valid JSON Object with a "questions" array.
Structure for EACH question:
{
  "id": number,
  "questionText": "What is ...?",
  "options": ["A", "B", "C", "D"], // Only if MCQ, else null
  "correctAnswer": "A",
  "marks": number
}

Output ONLY valid JSON starting with { "questions": [...] }.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("Gemini raw response:", responseText);

    let cleaned = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let jsonParsed;
    try {
      jsonParsed = JSON.parse(cleaned);
    } catch (parseError: any) {
      console.error("JSON parsing error:", parseError, "Cleaned Body:", cleaned);
      return NextResponse.json({
         success: false,
         error: "AI failed to return valid JSON format."
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: jsonParsed
    });

  } catch (error: any) {
    console.error('Question Generation Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Generation failed'
    }, { status: 500 });
  }
}
