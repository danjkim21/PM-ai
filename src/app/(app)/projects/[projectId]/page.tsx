import Link from "next/link";
import {
  ExternalLinkIcon,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getProjectById } from "~/app/actions/project/queries";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectStatusCard from "./ProjectStatusCard";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { project } = await getProjectById(Number(params.projectId));
  // const router = useRouter();

  // const navigateBack = () => {
  //   router.back();
  // };

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          {/* <Button
                onClick={navigateBack}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button> */}
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {project.title}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            {project.status}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <ProjectDetailsCard project={project} />

            {/* TODO: Refactor card and update when project tickets backend is ready */}
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Project Tickets</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    {/* TODO: Remove disabled attr when you have data & filtering implemented */}
                    <TabsTrigger value="drafts" disabled>
                      Drafts
                    </TabsTrigger>
                    <TabsTrigger value="archived" disabled>
                      Archived
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Ticket 1
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Draft</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="drafts"></TabsContent>
                  <TabsContent value="archived"></TabsContent>
                </Tabs>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Create Ticket
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ProjectStatusCard project={project} />

            {/* TODO: Refactor card and update when project resources backend is ready */}
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Project Resources</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  <li className="font-mono text-sm">
                    <Link
                      href="#"
                      className="flex items-center justify-start gap-2 underline-offset-2 hover:underline"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      Jira Project
                    </Link>
                  </li>
                  <li className="font-mono text-sm">
                    <Link
                      href="#"
                      className="flex items-center justify-start gap-2 underline-offset-2 hover:underline"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      Slack Space
                    </Link>
                  </li>
                  <li className="font-mono text-sm">
                    <Link
                      href="#"
                      className="flex items-center justify-start gap-2 underline-offset-2 hover:underline"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      Github Repository
                    </Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Resource
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
