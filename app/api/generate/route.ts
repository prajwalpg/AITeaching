import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';

// Initialize Gemini SDK with the user's provided token:
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCN1gdaNNtcFaigqCokYyf-X2VSmn5kqQE";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { topic, difficulty, questionType, filepath } = await req.json();

    // 1. Content Analyzer Agent Logic: Extract text from uploaded file if provided
    let fileContext = '';
    if (filepath) {
      try {
        const fileContent = await fs.readFile(filepath, 'utf-8');
        // Basic extraction fallback to first 5000 chars for context size safety
        fileContext = "Textbook Context Uploaded: " + fileContent.substring(0, 5000); 
      } catch (e) {
        console.error("Content Analyzer unable to read file path:", filepath);
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

    const jsonParsed = JSON.parse(responseText);

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
