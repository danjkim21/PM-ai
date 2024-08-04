"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProject } from "~/app/actions/project/mutations";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { Project, type ProjectStatus } from "~/server/db/schema";

const formSchema = z.object({
  status: z.enum(["draft", "active", "archived"]),
});

export default function ProjectStatusCard({ project }: { project: Project }) {
  const router = useRouter();
  const [editable, setEditable] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: project.status,
    },
  });

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedProject = await updateProject(project.id, {
        ...project,
        status: values.status,
      });

      if (!updatedProject) {
        throw new Error("Failed to update project.");
      }

      router.refresh();
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
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
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!editable}
                    >
                      <SelectTrigger aria-label="Select status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the name of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              {editable && (
                <Button type="submit" className="gap-1">
                  <span className="sm:whitespace-nowrap">Update Status</span>
                </Button>
              )}
              {!editable && (
                <Button className="gap-1" onClick={() => setEditable(true)}>
                  <span className="sm:whitespace-nowrap">Edit Status</span>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
