"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { rateLimitByKey } from "~/lib/limiter";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

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
 * Generates a ticket based on the provided message using text streaming.
 *
 * @param {string} message - The message to generate the ticket from.
 * @return {Object} An object containing the generated ticket output.
 */
export async function generateTicketStream({ message }: { message: string }) {
  // TODO: refactor and implement rate limiting by user id
  const stream = createStreamableValue("");

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt: message,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
