import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ProjectSheet from "./ProjectSheet";
import ProjectTable from "./ProjectTable";

export default async function ProjectsPage() {
  return (
    <div
    // className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"
    >
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <ProjectSheet />
          </div>
        </div>
        <TabsContent value="all">
          <ProjectTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
