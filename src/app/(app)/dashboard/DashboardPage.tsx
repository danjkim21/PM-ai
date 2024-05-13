"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "~/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useChat } from "ai/react";
import { getTicket } from "~/app/actions/chat/mutations";
import { Toaster } from "~/components/ui/sonner";
import { toast } from "sonner";
import { formSchema, ticketTemplate } from "./page";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [loading, setLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: "",
      photo: "",
      template: ticketTemplate,
    },
  });

  const generateBio = async (values: z.infer<typeof formSchema>) => {
    const prompt = `Given this user story: "${values.story}${values.story.endsWith(".") ? "" : "."}" Generate a professional Jira ticket in the format that adheres to this strict Jira template: 
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
      toast(error);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-start py-2">
      <h1 className="text-center text-3xl font-bold">
        Dashboard - {session?.user?.name}
      </h1>

      <p className="mt-5 text-slate-500">0 tickets generated so far.</p>

      <Form {...form}>
        <form
          className="mt-10 flex w-full max-w-xl flex-col gap-4"
          onSubmit={form.handleSubmit(generateBio)}
        >
          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-3">
                  <p className="text-left font-medium">
                    1) Copy your user story
                    <span className="text-slate-500">
                      (or write a few sentences about your task)
                    </span>
                    .
                  </p>
                </div>
                <FormLabel className="sr-only">User Task</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
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

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-3">
                  <p className="text-left font-medium">
                    Or upload a photo of your Figma component
                  </p>
                </div>
                <FormLabel className="sr-only">Photo</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" disabled {...field} />
                </FormControl>
                <FormDescription>
                  Feature only available for __ tier plan users
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-3">
                  <p className="text-left font-medium">
                    2) Review and modify your ticket template .
                  </p>
                </div>
                <FormLabel className="sr-only"> Jira Template</FormLabel>
                <FormControl>
                  <Textarea id="template" rows={12} disabled {...field} />
                </FormControl>
                <FormDescription>
                  Feature only available for __ tier plan users
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {!loading && (
            <Button className="w-full" type="submit">
              Generate your ticket &rarr;
            </Button>
          )}
          {loading && (
            <Button className="w-full" type="submit" disabled>
              ... Generating
            </Button>
          )}
        </form>
      </Form>

      <section className="mt-10 flex w-full max-w-xl flex-col gap-4">
        {generatedTicket && (
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold">
              Your generated ticket
            </h2>
            <div className="whitespace-pre-wrap">{generatedTicket}</div>
          </article>
        )}
      </section>
      <Toaster />
    </main>
  );
}
