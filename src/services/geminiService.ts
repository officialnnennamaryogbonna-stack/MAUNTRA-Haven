import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export function useAssistant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAssistant = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are MAUNTRA Assistant, a supportive, trauma-informed guide for domestic violence survivors. Your goal is to offer calm, non-judgmental guidance, help users find resources, and encourage safe actions. NEVER replace professional help. Always include a disclaimer that you are an AI and not a substitute for emergency services or professional counseling. Use simple, clear language. Focus on safety and empowerment.",
        },
      });
      return response.text;
    } catch (err) {
      console.error(err);
      setError("I'm having trouble connecting right now. Please try again later or use the emergency resources.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { askAssistant, loading, error };
}
