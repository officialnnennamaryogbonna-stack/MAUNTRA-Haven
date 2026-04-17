import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const OFFLINE_RESPONSES: Record<string, string> = {
  "default": "I'm currently offline, but I can still provide basic guidance. If you are in immediate danger, please call emergency services (911). You can also check the 'Support' or 'Emergency' tabs for saved information that is available offline.",
  "help": "I'm here to help. Since I'm offline, I'm using my local knowledge-base. I recommend checking the 'Emergency' tab for your saved contacts and the 'Support' tab for local organizations specialized in domestic violence support.",
  "safety": "Safety is the absolute priority. For offline safety planning:\n1. Identify 2 exit routes from your current location.\n2. Keep a 'Go Bag' with ID, cash, and documents ready.\n3. Identify a safe friend or shelter you can go to immediately.\n4. Remember: You can use the 'Quick Exit' button at any time to hide this app.",
  "emergency": "If this is an emergency, please call 911 (or your local emergency number) immediately. While I'm offline, your primary safety tools are the 'Emergency Call' buttons in the Emergency section of this app.",
  "housing": "If you need a safe place to stay, the 'Support' tab contains pre-loaded information about shelters and housing assistance. Many shelters operate 24/7 crisis lines that you can call directly for immediate placement.",
  "legal": "For legal guidance while offline, check the 'Support' section for resources on restraining orders and legal aid. It is helpful to document any incidents in the 'Report' section to keep a timestamped record for future use.",
  "finance": "Financial independence is key to long-term safety. If you can, try to set aside small amounts of cash in a safe place. The 'Support' section identifies organizations that can help with financial planning and emergency grants.",
  "children": "If children are involved, prioritize their safety along with yours. Identify a code word you can use with them that means it's time to leave. Check the 'Support' section for child-specific trauma resources.",
  "emotional": "It's normal to feel overwhelmed, scared, or lonely. You are incredibly strong for seeking support. While I can't chat deeply while offline, remember that your feelings are valid. Try focused breathing: Inhale for 4 seconds, hold for 4, exhale for 4.",
  "incidents": "You can still document incidents while offline! Go to the 'Report' section. Any reports you save will be stored locally on your device and will be available in the 'Saved Log' for your records.",
};

export function useAssistant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAssistantStream = async (prompt: string, isOnline: boolean, onChunk: (chunk: string) => void) => {
    if (!isOnline) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
      
      const lowerPrompt = prompt.toLowerCase();
      let response = OFFLINE_RESPONSES.default;
      
      if (lowerPrompt.includes("emergency") || lowerPrompt.includes("911") || lowerPrompt.includes("help me")) response = OFFLINE_RESPONSES.emergency;
      else if (lowerPrompt.includes("safe") || lowerPrompt.includes("plan") || lowerPrompt.includes("leave")) response = OFFLINE_RESPONSES.safety;
      else if (lowerPrompt.includes("house") || lowerPrompt.includes("shelter") || lowerPrompt.includes("stay") || lowerPrompt.includes("sleep")) response = OFFLINE_RESPONSES.housing;
      else if (lowerPrompt.includes("law") || lowerPrompt.includes("police") || lowerPrompt.includes("court") || lowerPrompt.includes("order")) response = OFFLINE_RESPONSES.legal;
      else if (lowerPrompt.includes("money") || lowerPrompt.includes("cash") || lowerPrompt.includes("bank") || lowerPrompt.includes("finance")) response = OFFLINE_RESPONSES.finance;
      else if (lowerPrompt.includes("kids") || lowerPrompt.includes("child") || lowerPrompt.includes("baby") || lowerPrompt.includes("son") || lowerPrompt.includes("daughter")) response = OFFLINE_RESPONSES.children;
      else if (lowerPrompt.includes("sad") || lowerPrompt.includes("scared") || lowerPrompt.includes("cry") || lowerPrompt.includes("fear") || lowerPrompt.includes("anxious")) response = OFFLINE_RESPONSES.emotional;
      else if (lowerPrompt.includes("report") || lowerPrompt.includes("save") || lowerPrompt.includes("log") || lowerPrompt.includes("record")) response = OFFLINE_RESPONSES.incidents;
      else if (lowerPrompt.includes("help") || lowerPrompt.includes("what can you do")) response = OFFLINE_RESPONSES.help;
      
      onChunk(response);
      return response;
    }

    setLoading(true);
    setError(null);
    try {
      const ai = getAI();
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are MAUNTRA Assistant, a supportive, trauma-informed guide for domestic violence survivors. Your goal is to offer calm, non-judgmental guidance, help users find resources, and encourage safe actions. NEVER replace professional help. Always include a disclaimer that you are an AI and not a substitute for emergency services or professional counseling. Use simple, clear language. Focus on safety and empowerment.",
        },
      });

      let fullResponse = "";
      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          onChunk(text);
        }
      }
      return fullResponse;
    } catch (err) {
      console.error("Gemini API Error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`AI Error: ${errorMessage}. Please ensure your internet connection is stable.`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { askAssistantStream, loading, error };
}
