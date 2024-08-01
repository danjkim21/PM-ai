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

export default function ProjectTableRow({ project }: { project: Project }) {
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
      <TableCell>
        <Badge variant="outline">{project.status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {project.createdAt.toDateString()}
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
            {/* TODO - Add actions for editing project and deleting */}
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
