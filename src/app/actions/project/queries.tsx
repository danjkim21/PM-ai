"use server";

import { and, eq } from "drizzle-orm";
import { getSession } from "next-auth/react";
import { db } from "~/server/db";
import { projects } from "~/server/db/schema";

export const getProjects = async () => {
  const session = await getSession();

  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.createdById, session?.user.id));

  if (rows === undefined) return {};
  const p = rows;

  return { authors: p };
};

export const getProjectById = async (id) => {
  const session = await getSession();

  const [row] = await db
    .select()
    .from(projects)
    .where(
      and(eq(projects.id, id), eq(projects.createdById, session?.user.id)),
    );

  if (row === undefined) return {};
  const p = row;
  return { project: p };
};
