'use server';

import { generateChatbotIdeas, type ChatbotIdeaInput, type ChatbotIdeaOutput } from '@/ai/flows/chatbot-idea-generator';

export async function getChatbotIdeasAction(input: ChatbotIdeaInput): Promise<ChatbotIdeaOutput | { error: string }> {
  try {
    const result = await generateChatbotIdeas(input);
    return result;
  } catch (error) {
    console.error("Error generating chatbot ideas:", error);
    return { error: "Failed to generate chatbot ideas. Please try again." };
  }
}
