"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function getTicket(message: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: message,
  });

  return { text, finishReason, usage };
}
