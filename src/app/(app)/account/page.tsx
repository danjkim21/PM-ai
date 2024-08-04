"use client";

import { useSession } from "next-auth/react";
import SignOutBtn from "~/components/auth/SignOutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
    <div>
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
    </div>
  );
}
