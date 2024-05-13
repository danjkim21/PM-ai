import { Triangle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { appMoreLinks, appPageLinks } from "~/config/nav";

export default function Sidebar() {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Dashboard" asChild>
          <Link href="/dashboard">
            <Triangle className="fill-foreground size-5" />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <TooltipProvider>
          {appPageLinks.map((link) => (
            <Tooltip key={link.title}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label={link.title}
                  asChild
                >
                  <Link href={link.href}>
                    <link.icon className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {link.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          {appMoreLinks.map((link) => (
            <Tooltip key={link.title}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label={link.title}
                  asChild
                >
                  <Link href={link.href}>
                    <link.icon className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {link.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
