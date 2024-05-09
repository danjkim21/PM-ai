export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
