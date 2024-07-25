"use server";

import { getSession } from "next-auth/react";
import { db } from "~/server/db";
import { projects } from "~/server/db/schema";

export const createProject = async (project) => {
  const session = await getSession();
  const newProject = { ...project, createdById: session?.user?.id };

  try {
    const [a] = await db.insert(projects).values(newProject).returning();

    return { authors: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
