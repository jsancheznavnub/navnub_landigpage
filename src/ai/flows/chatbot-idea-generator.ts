'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating chatbot ideas based on user-provided business needs.
 *
 * The flow takes a description of business needs as input and returns AI-powered chatbot recommendations.
 * It exports the following:
 * - `generateChatbotIdeas`: A function that triggers the chatbot idea generation flow.
 * - `ChatbotIdeaInput`: The input type for the generateChatbotIdeas function.
 * - `ChatbotIdeaOutput`: The output type for the generateChatbotIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotIdeaInputSchema = z.object({
  businessNeeds: z
    .string()
    .describe('A detailed description of the client business needs and requirements.'),
});
export type ChatbotIdeaInput = z.infer<typeof ChatbotIdeaInputSchema>;

const ChatbotIdeaOutputSchema = z.object({
  chatbotIdeas: z
    .string()
    .describe(
      'A list of chatbot ideas tailored to the business needs, including potential features and use cases.'
    ),
});
export type ChatbotIdeaOutput = z.infer<typeof ChatbotIdeaOutputSchema>;

export async function generateChatbotIdeas(input: ChatbotIdeaInput): Promise<ChatbotIdeaOutput> {
  return chatbotIdeaGeneratorFlow(input);
}

const chatbotIdeaGeneratorPrompt = ai.definePrompt({
  name: 'chatbotIdeaGeneratorPrompt',
  input: {schema: ChatbotIdeaInputSchema},
  output: {schema: ChatbotIdeaOutputSchema},
  prompt: `You are an AI-powered chatbot idea generator for Navnub, a company specializing in AI and cloud solutions for small and medium-sized businesses (PYMEs).

  A potential client has described their business needs as follows:

  {{businessNeeds}}

  Based on these needs, generate a list of chatbot ideas that Navnub can implement to address their specific requirements. Include potential features, use cases, and how these chatbots can integrate with landing pages and WhatsApp Business.
  Focus on solutions based in the cloud and AI.
  Format the output as a numbered list.
  `,
});

const chatbotIdeaGeneratorFlow = ai.defineFlow(
  {
    name: 'chatbotIdeaGeneratorFlow',
    inputSchema: ChatbotIdeaInputSchema,
    outputSchema: ChatbotIdeaOutputSchema,
  },
  async input => {
    const {output} = await chatbotIdeaGeneratorPrompt(input);
    return output!;
  }
);

