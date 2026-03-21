import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateMotivation(streakDays: number) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a short, powerful, masculine motivational quote for someone who has a ${streakDays} day streak of self-discipline. Keep it under 20 words.`,
    config: {
      systemInstruction: "You are a stoic mentor focused on discipline and strength. Your tone is firm, encouraging, and minimal.",
    },
  });
  return response.text;
}

export async function analyzeRelapse(reason: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user relapsed for this reason: "${reason}". Analyze this reason and provide 3 short, actionable tips to prevent this in the future. Format as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
  });
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return ["Stay focused", "Identify triggers", "Try again"];
  }
}

export async function getImprovementTips(streakDays: number) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user is on a ${streakDays} day streak. Suggest 3 advanced discipline techniques to level up their progress. Format as a JSON array of objects with 'title' and 'description'.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    },
  });
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return [];
  }
}
