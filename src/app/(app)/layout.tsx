"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "~/components/sidebar/Sidebar";
import { Toaster } from "~/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "unauthenticated") redirect("/");

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">{children}</div>
      <Toaster />
    </div>
  );
}
