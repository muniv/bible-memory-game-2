import { GoogleGenAI } from "@google/genai";

// This is a placeholder for future AI features, such as explaining the verse to children
// or generating quizzes based on the verse.
// Currently, the app uses hardcoded verses as per the core requirements.

export const generateVerseExplanation = async (verseText: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found via process.env.API_KEY");
    return "API Key is missing.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain this Bible verse to a 5-year-old child in Korean, keep it very short and sweet: "${verseText}"`,
    });

    return response.text || "설명을 가져올 수 없어요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "오류가 발생했습니다.";
  }
};