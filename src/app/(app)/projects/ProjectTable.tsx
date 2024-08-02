import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import ProjectTableRow from "./ProjectTableRow";
import { getProjects } from "~/app/actions/project/queries";

export default async function ProjectTable() {
  const { projects } = await getProjects();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Manage your Projects and generate tickets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Status
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">
                Last updated at
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <ProjectTableRow key={project.id} project={project} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground text-xs">
          Showing{" "}
          <strong>
            {projects?.length}-{projects?.length}
          </strong>{" "}
          of <strong>{projects?.length}</strong> Projects
        </div>
      </CardFooter>
    </Card>
  );
}
