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

const ticketTemplate = `Title: [Feature Name] - Implement [Specific Component/Functionality]
Assignee: [Developer's Name]
Reporter: [Name of the person creating the ticket]
Epic Link: [Link to the associated epic for context and tracking]
Labels: FrontEnd, BackEnd, [Feature], [Sprint Number], [Any other relevant label]
Priority: [Critical, High, Medium, Low]
Due Date: [MM/DD/YYYY]

User Story
As a [type of user], I want [the goal], so that [reason].
Acceptance Criteria (Break this down by assignee type: front-end engineers, back-end engineers, and ux-ui designers.  Ensure that each acceptance criteria has at least two bullet points.)
1. Criteria 1: [Description of what is to be achieved or validated]
• [Specific details]
• [Specific details]
2. Criteria 2: [Description of what is to be achieved or validated]
• [Specific details]
• [Specific details]
3. Criteria 3: [Description of what is to be achieved or validated]
• [Specific details]

Design Files
• Link: [URL to Figma/Sketch/Adobe XD file]
• Screens: [List specific screens or components referenced in the task]
Prototype Link
• Interactive Prototype: [URL to the interactive prototype if available]

API Documentation
• Endpoint: [API endpoint that will be used or needs to be created]
• Method: [GET, POST, PUT, DELETE]
• Payload: [Description of the data structure expected/requested, including draft data structure and schema design]
• Success Response: [Expected success response details, including draft data structure and schema design]
• Error Response: [Expected error response details, including draft data structure and schema design]
Dependencies

• Blockers: [Any tasks that must be completed before work can start on this ticket]
• Related Tickets: [Link to any related Jira tickets]

Notes
• [Any additional information that the developer might find useful, such as special conditions, expected difficulties, etc.]
Attachments
• Additional Documents: [Link to any additional resources, guidelines, or documentation]`;

const formSchema = z.object({
  story: z.string().min(2, {
    message: "Story must be at least 2 characters.",
  }),
  photo: z.string().optional(),
  template: z.string().min(2, {
    message: "Template must be at least 2 characters.",
  }),
});

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
    <>
      <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-start py-2">
        <p className="mt-5 text-slate-500">0 tickets generated so far.</p>
      </main>
    </>
  );
}
