"use server";

import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import {
  type NewProjectParams,
  type ProjectId,
  type UpdateProjectParams,
  insertProjectSchema,
  projectIdSchema,
  projects,
  updateProjectSchema,
} from "~/server/db/schema";

export const createProject = async (project: NewProjectParams) => {
  const session = await getServerSession(authOptions);

  const newProject = insertProjectSchema.parse({
    ...project,
    createdById: session?.user?.id,
  });

  try {
    const [p] = await db.insert(projects).values(newProject).returning();

    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProject = async (
  id: ProjectId,
  project: UpdateProjectParams,
) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authenticated");
  }

  const { id: projectId } = projectIdSchema.parse({ id });
  const newProject = updateProjectSchema.parse({
    ...project,
    createdById: session?.user?.id,
  });

  try {
    const [p] = await db
      .update(projects)
      .set({ ...newProject, updatedAt: new Date() })
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.createdById, session.user.id),
        ),
      )
      .returning();

    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProject = async (id: ProjectId) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authenticated");
  }

  const { id: projectId } = projectIdSchema.parse({ id });

  try {
    const [p] = await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.createdById, session.user.id),
        ),
      )
      .returning();

    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
