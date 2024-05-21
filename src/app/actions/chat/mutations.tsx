"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { rateLimitByKey } from "~/lib/limiter";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";
import { formSchema } from "~/app/(app)/playground/page";

// TODO: refactor rate limiting using Vercel KV and Upstash Ratelimit
// https://sdk.vercel.ai/docs/advanced/rate-limiting

/**
 * Retrieves a ticket for a user based on the provided message.
 *
 * @param {Object} params - The parameters for retrieving the ticket.
 * @param {string | undefined} params.userId - The ID of the user.
 * @param {string} params.message - The message for generating the ticket.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the generated ticket information.
 * @throws {Error} - If the rate limit is exceeded.
 */
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

/**
 * Generates a streamable value of a professional Jira ticket based on the provided user story and template.
 *
 * @param {Object} params - The parameters for generating the ticket.
 * @param {z.infer<typeof formSchema>} params.values - The values for generating the ticket.
 * @param {string} params.values.story - The user story for generating the ticket.
 * @param {string} params.values.assigneeType - The type of assignee for the ticket.
 * @param {string} params.values.template - The template for the ticket.
 * @return {Promise<{output: string}>} A promise that resolves to an object containing the generated ticket as a string.
 */
export async function generateTicketStream({
  values,
}: {
  values: z.infer<typeof formSchema>;
}) {
  const stream = createStreamableValue("");

  const userPrompt = `Given this user story: "${values.story}${
    values.story.endsWith(".") ? "" : "."
  }" Generate a professional Jira ticket for a ${values.assigneeType} type assignee in the format that adheres to this strict Jira template:
    "${values.template}."
    Finally analyze the story complexity (if high complexity, offer suggestions to break down the ticket to be more manageable), identify any user pain points to consider, and suggest a general data structure/schema for the success response to help the backend team.`;

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt: userPrompt,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
