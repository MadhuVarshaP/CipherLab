"use client";

import { useMemo, useState } from "react";
import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function ActivityPage() {
  const { activities } = useWorkspaceContext();
  const [filter, setFilter] = useState<
    "all" | "upload" | "compute" | "team" | "result" | "treasury" | "workspace"
  >("all");

  const filterOptions: Array<
    "all" | "upload" | "compute" | "team" | "result" | "treasury" | "workspace"
  > = ["all", "upload", "compute", "team", "result", "treasury", "workspace"];

  const rows = useMemo(() => {
    if (filter === "all") return activities;
    return activities.filter((a) => a.type === filter);
  }, [activities, filter]);

  return (
    <RequireWorkspace>
      <div className="space-y-8 cl-page relative">
      <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.9] h-full w-full"
          style={{
            backgroundImage: "url('/images/dashboard.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <header className="flex flex-col items-center text-center gap-4 pt-6 text-white">
          <div className="space-y-2">
            <h2
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
              className="text-3xl font-bold uppercase tracking-tighter"
            >
              Activity
            </h2>
            <p  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
              Timeline of workspace events (mock).
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filterOptions.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`grid-border px-3 py-2 font-mono text-[9px] uppercase tracking-widest transition-all ${
                  filter === t ? "bg-black text-white" : "hover:bg-black/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        <section className="grid-border bg-white p-6">
          <div className="space-y-4">
            {rows.map((a) => (
              <div key={a.id} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-black rounded-full mt-2" />
                <div className="flex-1">
                  <p className="font-sans text-sm">{a.message}</p>
                  <p className="font-mono text-[9px] uppercase opacity-50 mt-1">
                    {a.type} • {a.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="font-sans text-sm opacity-60">
                No activity for this filter.
              </p>
            )}
          </div>
        </section>
      </div>
    </RequireWorkspace>
  );
}

