"use server";

import { getSession } from "next-auth/react";
import { db } from "~/server/db";
import {
  type NewProjectParams,
  insertProjectSchema,
  projects,
} from "~/server/db/schema";

export const createProject = async (project: NewProjectParams) => {
  const session = await getSession();
  const newProject = insertProjectSchema.parse({
    ...project,
    createdById: session?.user?.id,
  });

  try {
    const [a] = await db.insert(projects).values(newProject).returning();

    return { authors: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
