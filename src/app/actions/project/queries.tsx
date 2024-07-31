"use server";

import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { type ProjectId, projectIdSchema, projects } from "~/server/db/schema";

export const getProjects = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authenticated");
  }

  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.createdById, session.user.id));

  if (rows === undefined) return {};
  const p = rows;
  return { projects: p };
};

export const getProjectById = async (id: ProjectId) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authenticated");
  }

  const { id: projectId } = projectIdSchema.parse({ id });

  const [row] = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.createdById, session.user.id),
      ),
    );

  if (row === undefined) return {};
  const p = row;
  return { project: p };
};
