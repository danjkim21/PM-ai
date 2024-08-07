import { Book, LifeBuoy, SquareTerminal, SquareUser } from "lucide-react";

export const webLinks = [
  { href: "#features", title: "Features" },
  { href: "#testimonials", title: "Testimonials" },
  { href: "#pricing", title: "Pricing" },
  { href: "#contact", title: "Contact" },
  { href: "/api/auth/signin", title: "Sign In" },
];

export const appPageLinks = [
  { href: "/playground", title: "Playground", icon: SquareTerminal },
  { href: "/projects", title: "Projects", icon: Book },
];

export const appMoreLinks = [
  { href: "/help", title: "Help", icon: LifeBuoy },
  { href: "/account", title: "Account", icon: SquareUser },
];
