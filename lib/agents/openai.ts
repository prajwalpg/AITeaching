import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with the provided API token
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCN1gdaNNtcFaigqCokYyf-X2VSmn5kqQE";
const genAI = new GoogleGenerativeAI(apiKey);

export const openai = {
  chat: {
    completions: {
      create: async ({ messages, response_format, model }: any) => {
        try {
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
