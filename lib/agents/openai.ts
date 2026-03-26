import OpenAI from 'openai';

// Make sure to set OPENAI_API_KEY in the environment variables
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_to_allow_builds',
});
