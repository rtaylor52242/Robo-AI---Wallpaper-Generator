
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function dataUrlToGoogleGenerativeAIPart(dataUrl: string) {
    const regex = /^data:(.+);base64,(.*)$/;
    const matches = dataUrl.match(regex);
    if (!matches || matches.length !== 3) {
        throw new Error("Invalid data URL format");
    }
    return {
        inlineData: {
            mimeType: matches[1],
            data: matches[2],
        },
    };
}


export async function generateWallpapers(prompt: string, aspectRatio: AspectRatio): Promise<string[]> {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `${prompt}, phone wallpaper, high resolution, stunning, beautiful, 8k`,
        config: {
          numberOfImages: 4,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No images were generated. The prompt may have been blocked.");
    }

    const imageUrls = response.generatedImages.map(img => {
        const base64ImageBytes: string = img.image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    });

    return imageUrls;
  } catch (error: any) {
    console.error("Error generating images with Gemini API:", error);
    if (error.toString().includes('RESOURCE_EXHAUSTED') || error.message?.includes('429')) {
      throw new Error("Quota exceeded. Please check your plan and billing details, or try again later.");
    }
    throw new Error("Failed to communicate with the image generation service.");
  }
}

export async function generateRemixPrompt(originalPrompt: string, image: string): Promise<string> {
    try {
        const imagePart = dataUrlToGoogleGenerativeAIPart(image);
        const textPart = {
            text: `Based on the user's vibe "${originalPrompt}" and the provided image, create a new, more detailed and evocative text prompt for an AI image generator to create similar but unique variations. The prompt should be a single paragraph, focusing on visual details. Do not add any conversational text, just the prompt itself.`,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text.trim();
    } catch (error: any) {
        console.error("Error generating remix prompt:", error);
        if (error.toString().includes('RESOURCE_EXHAUSTED') || error.message?.includes('429')) {
          throw new Error("Quota exceeded. Please check your plan and billing details, or try again later.");
        }
        throw new Error("Failed to generate a new prompt for remixing.");
    }
}
