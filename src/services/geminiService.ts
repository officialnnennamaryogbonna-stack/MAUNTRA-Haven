import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const OFFLINE_RESPONSES: Record<string, string> = {
  "default": "I'm currently offline, but I can still provide basic guidance. If you are in immediate danger, please call emergency services (911). You can also check the 'Resources' or 'Emergency' tabs for saved information that is available offline.",
  "help": "I'm here to help. Since I'm offline, I can't provide real-time AI responses, but I recommend checking the 'Emergency' tab for your saved contacts and the 'Resources' tab for local support organizations.",
  "safety": "Your safety is the priority. If you need to leave quickly, use the 'Quick Exit' button. For offline safety planning, try to identify a safe place to go and keep your important documents and emergency contacts ready.",
  "emergency": "If this is an emergency, please call 911 or your local emergency number immediately. My AI capabilities are limited while offline, but your saved emergency contacts are available in the 'Emergency' section.",
};

export function useAssistant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAssistant = async (prompt: string, isOnline: boolean) => {
    if (!isOnline) {
      setLoading(true);
      // Simulate a small delay for "thinking" feel even offline
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
      
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes("help")) return OFFLINE_RESPONSES.help;
      if (lowerPrompt.includes("safe")) return OFFLINE_RESPONSES.safety;
      if (lowerPrompt.includes("emergency") || lowerPrompt.includes("911")) return OFFLINE_RESPONSES.emergency;
      
      return OFFLINE_RESPONSES.default;
    }

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
