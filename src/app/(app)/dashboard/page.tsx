"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <>
      <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-start gap-2 py-6">
        <h2 className="text-xl font-semibold">
          Welcome, {session?.user?.name}
        </h2>
        <Image
          src={session?.user?.image ?? ""}
          alt={session?.user?.name ?? ""}
          width={64}
          height={64}
        />
        <p className="text-slate-500">0 tickets generated so far.</p>
        <p className="text-slate-500">
          Navigate to Playground to generate tickets.
        </p>
      </main>
    </>
  );
}
