"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import Image from "next/image";
import { TableCell, TableRow } from "~/components/ui/table";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { type Project } from "~/server/db/schema";
import { deleteProject } from "~/app/actions/project/mutations";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";

export default function ProjectTableRow({ project }: { project: Project }) {
  const router = useRouter();
  const { toast } = useToast();

  const onEdit = () => {
    console.log("edit", project.id);
    router.push(`/projects/${project.id}`);
  };
  const onDelete = async () => {
    try {
      const deletedProject = await deleteProject(project.id);

      if (!deletedProject) {
        throw new Error("Failed to create project.");
      }

      router.refresh();
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Project deletion failed",
          description: error.message,
        });
      } else {
        console.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Link href={`/projects/${project.id}`}>
          <Image
            alt="Project image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src="/placeholder.svg"
            width="64"
          />
        </Link>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`/projects/${project.id}`}>{project.title}</Link>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge variant="outline">{project.status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {project.createdAt.toDateString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {project.updatedAt ? project.updatedAt.toDateString() : "No updates"}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-700 focus:text-red-600"
              onClick={onDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
