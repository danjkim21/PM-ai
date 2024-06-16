export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <div>My Post: {params.projectId}</div>;
}
