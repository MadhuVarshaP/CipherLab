import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-12 h-12">
          <h2 className="font-brand text-2xl font-bold uppercase tracking-tighter italic">
            Workspace Dashboard
          </h2>
          <div className="flex gap-4">
            <button className="grid-border bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Invite Team
            </button>
            <button className="grid-border bg-black text-white px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              New Project
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
