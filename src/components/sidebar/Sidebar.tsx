import { PanelLeft, Triangle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { appMoreLinks, appPageLinks } from "~/config/nav";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Sidebar() {
  return (
    <div className="h-auto sm:h-full">
      {/* MOBILE MENU TOGGLE */}
      <aside>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
              >
                <Triangle className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Dashboard</span>
              </Link>

              {appPageLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  {link.title}
                </Link>
              ))}

              {appMoreLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="inset-y fixed left-0 top-0 z-20 hidden h-full flex-col border-r sm:flex">
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
    </div>
  );
}
