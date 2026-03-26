import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with the provided API token securely
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Critical: GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const openai = {
  chat: {
    completions: {
      create: async ({ messages, response_format, model }: any) => {
        try {
          if (!apiKey) {
            throw new Error("GEMINI_API_KEY is missing in environment variables");
          }

          // Detect if we need JSON parsing
          const isJson = response_format?.type === 'json_object';
          
          const generativeModel = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
          });

          // Serialize legacy OpenAI format messages into a single Gemini Prompt
          const prompt = messages.map((m: any) => `${m.role.toUpperCase()}:\n${m.content}`).join('\n\n');
          
          const result = await generativeModel.generateContent(prompt);
          let responseText = result.response.text();

          if (isJson) {
            responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
          }

          // OpenAI expects a specific layout
          return {
            choices: [
              {
                message: { 
                  content: responseText 
                }
              }
            ]
          };
        } catch (e: any) {
             console.error("Gemini Bridge Error: ", e);
             throw new Error("AI Backend Configuration Failed: " + e.message);
        }
      }
    }
  }
};
