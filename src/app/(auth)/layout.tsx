"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
