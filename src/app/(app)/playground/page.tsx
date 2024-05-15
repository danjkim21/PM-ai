"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bird,
  CornerDownLeft,
  Paperclip,
  Rabbit,
  Settings,
  Share,
  Turtle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getTicket } from "~/app/actions/chat/mutations";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Toaster } from "~/components/ui/sonner";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { defaultTemplate } from "~/config/ticket-templates";

const formSchema = z.object({
  story: z.string().min(2, {
    message: "Story must be at least 2 characters.",
  }),
  photo: z.string().optional(),
  template: z.string().min(2, {
    message: "Template must be at least 2 characters.",
  }),
});

export default function PlaygroundPage() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: "",
      photo: "",
      template: defaultTemplate,
    },
  });

  const generateTicket = async (values: z.infer<typeof formSchema>) => {
    const prompt = `Given this user story: "${values.story}${
      values.story.endsWith(".") ? "" : "."
    }" Generate a professional Jira ticket in the format that adheres to this strict Jira template: 
    "${values.template}."
    Finally analyze the story complexity (if high complexity, offer suggestions to break down the ticket to be more manageable), identify any user pain points to consider, and suggest a general data structure/schema for the success response to help the backend team.`;

    setGeneratedTicket("");
    setLoading(true);

    try {
      const { text, finishReason, usage } = await getTicket({
        userId: session?.user.id,
        message: prompt,
      });
      setGeneratedTicket(text);
      setLoading(false);

      console.log(text, finishReason, usage);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.warning(error.message);
      } else {
        toast.warning("An unexpected error occurred.");
      }
    }
  };

  return (
    <Form {...form}>
      <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Playground</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Settings className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and ticket template.
              </DrawerDescription>
            </DrawerHeader>
            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  {/* TODO: update form fields with react-hook-form */}
                  <Label htmlFor="model">Model</Label>
                  <Select disabled>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="text-muted-foreground flex items-start gap-3">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="text-foreground font-medium">
                                Genesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="text-muted-foreground flex items-start gap-3">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="text-foreground font-medium">
                                Explorer
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="text-muted-foreground flex items-start gap-3">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="text-foreground font-medium">
                                Quantum
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  {/* TODO: update form fields with react-hook-form */}
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="0.4"
                    disabled
                  />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                {/* TODO: update form fields with react-hook-form */}
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Review & modify ticket template
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="preset">Preset</Label>
                  <Select defaultValue="system" disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a preset template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">Default</SelectItem>
                      <SelectItem value="user">Engineering</SelectItem>
                      <SelectItem value="assistant">Design</SelectItem>
                      <SelectItem value="test">Product Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Ticket Template</FormLabel>
                        <FormControl>
                          <Textarea
                            id="template"
                            rows={12}
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Feature only available for __ tier plan users
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button>
      </header>

      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="relative hidden flex-col items-start gap-8 md:flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <form
            className="grid w-full items-start gap-6"
            onSubmit={form.handleSubmit(generateTicket)}
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Adjust AI settings
              </legend>
              <div className="grid gap-3">
                {/* TODO: update form fields with react-hook-form */}
                <Label htmlFor="model">Model</Label>
                <Select disabled>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genesis">
                      <div className="text-muted-foreground flex items-start gap-3">
                        <Rabbit className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="text-foreground font-medium">
                              Genesis
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="explorer">
                      <div className="text-muted-foreground flex items-start gap-3">
                        <Bird className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="text-foreground font-medium">
                              Explorer
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Performance and speed for efficiency.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="quantum">
                      <div className="text-muted-foreground flex items-start gap-3">
                        <Turtle className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="text-foreground font-medium">
                              Quantum
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            The most powerful model for complex computations.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                {/* TODO: update form fields with react-hook-form */}
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="0.7"
                  disabled
                />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Review & modify ticket template
              </legend>
              <div className="grid gap-3">
                {/* TODO: update form fields with react-hook-form */}
                <Label htmlFor="role">Preset</Label>
                <Select defaultValue="system" disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">Default</SelectItem>
                    <SelectItem value="user">Engineering</SelectItem>
                    <SelectItem value="assistant">Design</SelectItem>
                    <SelectItem value="test">Product Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Ticket Template</FormLabel>
                      <FormControl>
                        <Textarea
                          id="template"
                          className="min-h-[14.5rem] border-0 p-3 shadow-none focus-visible:ring-0"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Feature only available for __ tier plan users
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </form>
        </div>

        <div className="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
            Output
          </Badge>
          <div className="flex-1 whitespace-pre-wrap">{generatedTicket}</div>

          <form
            className="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1"
            x-chunk="dashboard-03-chunk-1"
            onSubmit={form.handleSubmit(generateTicket)}
          >
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">User Task</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-14 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      placeholder={
                        "As a user, I would like to access my profile page and update my username, email and bio..."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled>
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {!loading && (
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Generate Ticket(s)
                  <CornerDownLeft className="size-3.5" />
                </Button>
              )}
              {loading && (
                <Button className="w-full" type="submit" disabled>
                  ... Generating
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Toaster />
    </Form>
  );
}
