
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
const API_KEY = "AIzaSyC63QdhsY4wklYhO0J_gzZmRGH4LWdMLOU";
const genAI = new GoogleGenerativeAI(API_KEY);

// Configure the model to use
const MODEL_NAME = "gemini-pro";

export interface GeminiMessage {
  role: "user" | "model" | "system";
  parts: string;
}

export async function generateGeminiResponse(messages: { role: string; content: string }[]) {
  try {
    // Convert to the format expected by Gemini
    const geminiMessages = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: msg.content
    }));

    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Start a chat session
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1) as any[],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Send the last message and get a response
    const lastMessage = geminiMessages[geminiMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts);
    const response = await result.response;
    const text = response.text();

    return {
      message: {
        role: "assistant",
        content: text
      }
    };
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    throw error;
  }
}
