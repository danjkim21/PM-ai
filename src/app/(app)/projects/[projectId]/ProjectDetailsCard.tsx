"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "Title must be at least 4 characters.",
    })
    .max(50),
  description: z.string().max(500).optional(),
});

export default function ProjectDetailsCard({
  projectTitle,
  projectDescription,
}: {
  projectTitle: string;
  projectDescription: string;
}) {
  const [editable, setEditable] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: projectTitle,
      description: projectDescription,
    },
  });

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // TODO: Update logic
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Project update failed",
          description: error.message,
        });
      } else {
        console.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription className="break-all">
          {projectDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={!editable} {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the name of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={!editable} {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the description of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              {editable && (
                <Button type="submit" className="gap-1">
                  <span className="sm:whitespace-nowrap">Update Details</span>
                </Button>
              )}
              {!editable && (
                <Button className="gap-1" onClick={() => setEditable(true)}>
                  <span className="sm:whitespace-nowrap">Edit Details</span>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
