"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome, {session?.user?.name} </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">0 tickets generated so far.</p>
          <p className="text-slate-500">
            Navigate to Playground to generate tickets.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
