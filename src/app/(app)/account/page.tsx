"use client";

import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOutBtn from "~/components/auth/SignOutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function AccountPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Account</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
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
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account and user preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profile-photo">Profile Photo</Label>
                <div className="flex items-center gap-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt="Profile Photo"
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue={session?.user?.name ?? "Loading..."}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={session?.user?.email ?? "Loading..."}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-muted-foreground text-xs">
              <SignOutBtn />
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
