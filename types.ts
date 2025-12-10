export enum AppStep {
  HOME = 'HOME',
  BUILDER = 'BUILDER',
  RESULT = 'RESULT',
  SAVED = 'SAVED'
}

export interface UserPreferences {
  imageType: string;
  subject: string;
  style: string;
  mood: string;
  lighting: string;
  colors: string;
  aspectRatio: string;
}

export interface GeneratedResult {
  prompt: string;
  negativePrompt?: string; // Optional if we decide to add it later
  modelSuggested: string;
}

export interface SavedPrompt {
  id: string;
  timestamp: number;
  originalInput: UserPreferences;
  finalPrompt: string;
}

// Predefined options for the UI
export const IMAGE_TYPES = [
  "Photorealistic", "3D Render", "Logo/Icon", "Illustration", "Oil Painting", "Vector Art", "Cinematic Scene"
];

export const STYLE_PRESETS = [
  "Minimalist", "Cyberpunk", "Surrealism", "Bauhaus", "Steampunk", "Studio Ghibli", "Vaporwave", "Noir", "Isometric"
];

export const ASPECT_RATIOS = [
  "16:9", "1:1", "9:16", "4:3", "3:2", "21:9"
];