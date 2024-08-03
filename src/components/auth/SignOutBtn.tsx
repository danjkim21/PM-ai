"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
// import { useFormStatus } from "react-dom";
// import { signOutAction } from "@/lib/actions/users";

export default function SignOutBtn() {
  return (
    // <form
    //   // TODO: Create Sign Out Action
    //   action={signOut}
    //   className="w-full text-left"
    // >
    //   <Btn />
    // </form>
    <Button variant="destructive" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}

// const Btn = () => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending} variant={"destructive"}>
//       Sign{pending ? "ing" : ""} out
//     </Button>
//   );
// };
