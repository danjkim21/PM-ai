export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: implement redirect if user has active session
  // eg. if (session) redirect("/dashboard");

  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
