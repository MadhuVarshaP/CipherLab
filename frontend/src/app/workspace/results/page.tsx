"use client";

import { useMemo } from "react";
import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function ResultsPage() {
  const { results } = useWorkspaceContext();
  const rows = useMemo(() => results, [results]);

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
        <header className="flex flex-col items-center text-center gap-2 pt-6 text-white">
          <h2
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            className="text-3xl font-bold uppercase tracking-tighter"
          >
            Results
          </h2>
          <p  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
            Compute outputs generated from jobs (mock).
          </p>
          <span className="font-mono text-[10px] uppercase opacity-50">
            {rows.length} results
          </span>
        </header>

        <section className="grid-border bg-white overflow-hidden">
          <div className="border-b border-black/10 px-6 py-4">
            <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
              Results List
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fafafa] border-b border-black/10">
                <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                  <th className="px-6 py-3">Result</th>
                  <th className="px-6 py-3">Source Job</th>
                  <th className="px-6 py-3">Datasets</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-black/5">
                    <td className="px-6 py-4 font-sans text-sm">{r.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {r.sourceJobName}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {r.datasetsUsed.join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs opacity-70">
                      {r.createdAt}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={4}>
                      No results yet. Complete a compute job to generate one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </RequireWorkspace>
  );
}

