"use client";

import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Sidebar from "~/components/sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Input } from "~/components/ui/input";
import { Toaster } from "~/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();
  const pathItems = pathname.split("/").slice(1);

  if (status === "unauthenticated") redirect("/");

  return (
    <div className=" flex h-screen w-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sidebar />
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {!pathItems.includes("dashboard") &&
              pathItems.map((item) => (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/${item}`}>{item}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {children}
      </main>

      <Toaster />
    </div>
  );
}
