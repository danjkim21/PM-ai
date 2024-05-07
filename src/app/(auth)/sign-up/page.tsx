"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AuthFormError from "~/components/auth/AuthFormError";

export default function SignUpPage() {
  // const [state, formAction] = useFormState(signUpAction, {
  //   error: "",
  // });

  return (
    <main className="bg-popover mx-auto my-4 max-w-lg p-10">
      <h1 className="text-center text-2xl font-bold">Create an account</h1>
      {/* <AuthFormError state={state} /> */}
      <form
      // action={formAction}
      >
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input name="email" type="email" id="email" required />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />
        <SubmitButton />
      </form>
      <div className="text-muted-foreground mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          Sign in
        </Link>
      </div>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Sign{pending ? "ing" : ""} up
    </Button>
  );
};
