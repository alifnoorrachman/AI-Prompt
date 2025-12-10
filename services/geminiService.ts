import { GoogleGenAI } from "@google/genai";
import { UserPreferences, GeneratedResult } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize outside to avoid re-creating on every render
const ai = new GoogleGenAI({ apiKey });

export const generateDetailedPrompt = async (prefs: UserPreferences): Promise<GeneratedResult> => {
  
  const prompt = `
    You are an expert Prompt Engineer for high-end AI Image Generators (like Midjourney v6, Kling, and Adobe Firefly).
    
    Your task is to convert the following user requirements into a single, highly detailed, professional prompt.
    
    USER INPUTS:
    - Type: ${prefs.imageType}
    - Subject: ${prefs.subject}
    - Style: ${prefs.style}
    - Mood: ${prefs.mood}
    - Lighting: ${prefs.lighting}
    - Colors: ${prefs.colors}
    - Aspect Ratio: ${prefs.aspectRatio}

    INSTRUCTIONS:
    1. Create a cohesive, descriptive paragraph.
    2. Focus on visual descriptors (texture, lighting, composition, camera lens if applicable).
    3. If the type is 'Photorealistic', specify camera settings (e.g., 85mm lens, f/1.8).
    4. If the type is '3D Render', specify engine (e.g., Unreal Engine 5, Octane Render).
    5. Append aspect ratio parameters suitable for Midjourney (e.g., --ar 16:9) at the very end.
    6. RETURN ONLY THE PROMPT TEXT. Do not add conversational filler.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return {
      prompt: response.text.trim(),
      modelSuggested: 'gemini-2.5-flash'
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate prompt. Please check your inputs or try again.");
  }
};