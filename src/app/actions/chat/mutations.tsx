"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { rateLimitByKey } from "~/lib/limiter";

export async function getTicket({
  userId,
  message,
}: {
  userId: string | undefined;
  message: string;
}) {
  await rateLimitByKey(userId, 1, 10000).catch(() => {
    throw new Error("Rate limit exceeded");
  });

  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: message,
  });

  return { text, finishReason, usage };
}
