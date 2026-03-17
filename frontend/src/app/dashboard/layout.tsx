export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#fafafa]">
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <header className="flex justify-between items-center mb-12 h-12 border-b border-black/10 pb-4">
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
