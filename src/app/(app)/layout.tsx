import Sidebar from "~/components/sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
