"use client";

import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function ContributionGraphPage() {
  const { datasets, jobs, results } = useWorkspaceContext();

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
            Contribution Graph
          </h2>
          <p 
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
            Simple provenance chain (dataset → job → result).
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 cl-card">
            <div className="cl-card-header">
              <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
                Provenance Flow
              </h3>
              <span className="font-mono text-[9px] uppercase opacity-50">
                dataset → job → result
              </span>
            </div>

            <div className="space-y-4">
              {Array.from({ length: Math.max(1, Math.max(datasets.length, jobs.length, results.length)) }).map((_, i) => {
                const d = datasets[i];
                const j = jobs[i];
                const r = results[i];
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 bg-[#fafafa] p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-center">
                      <div className="rounded-xl border border-black/10 bg-white p-4">
                        <p className="font-mono text-[9px] uppercase opacity-50">Dataset</p>
                        <p className="font-sans text-sm font-semibold mt-1">
                          {d?.name ?? "Lung Scan Dataset"}
                        </p>
                        <p className="font-mono text-[9px] uppercase opacity-50 mt-2">
                          {(d?.uploadedBy ?? "Alice") + " • " + (d?.status ?? "Encrypted")}
                        </p>
                      </div>

                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-10 h-px bg-black/20" />
                        <div className="w-2 h-2 rounded-full bg-black/30" />
                        <div className="w-10 h-px bg-black/20" />
                      </div>

                      <div className="rounded-xl border border-black/10 bg-white p-4">
                        <p className="font-mono text-[9px] uppercase opacity-50">Job</p>
                        <p className="font-sans text-sm font-semibold mt-1">
                          {j?.name ?? "Tumor Detection Training"}
                        </p>
                        <p className="font-mono text-[9px] uppercase opacity-50 mt-2">
                          {(j?.operationType ?? "Model Training") + " • " + (j?.status ?? "Running")}
                        </p>
                      </div>

                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-10 h-px bg-black/20" />
                        <div className="w-2 h-2 rounded-full bg-black/30" />
                        <div className="w-10 h-px bg-black/20" />
                      </div>

                      <div className="rounded-xl border border-black/10 bg-white p-4">
                        <p className="font-mono text-[9px] uppercase opacity-50">Result</p>
                        <p className="font-sans text-sm font-semibold mt-1">
                          {r?.name ?? "Model Accuracy Report"}
                        </p>
                        <p className="font-mono text-[9px] uppercase opacity-50 mt-2">
                          {r?.sourceJobName ?? "Tumor Detection Training"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cl-card">
            <div className="cl-card-header">
              <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
                Artifacts
              </h3>
              <span className="font-mono text-[9px] uppercase opacity-50">
                {datasets.length + jobs.length + results.length} items
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-[9px] uppercase opacity-50 mb-2">
                  Datasets
                </p>
                <div className="space-y-2">
                  {datasets.slice(0, 5).map((d) => (
                    <div key={d.id} className="rounded-xl border border-black/10 p-3">
                      <p className="font-sans text-sm font-medium">{d.name}</p>
                      <p className="font-mono text-[9px] uppercase opacity-50 mt-1">
                        {d.uploadedBy}
                      </p>
                    </div>
                  ))}
                  {datasets.length === 0 && (
                    <p className="font-sans text-sm opacity-60">None yet.</p>
                  )}
                </div>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase opacity-50 mb-2">
                  Jobs
                </p>
                <div className="space-y-2">
                  {jobs.slice(0, 5).map((j) => (
                    <div key={j.id} className="rounded-xl border border-black/10 p-3">
                      <p className="font-sans text-sm font-medium">{j.name}</p>
                      <p className="font-mono text-[9px] uppercase opacity-50 mt-1">
                        {j.status}
                      </p>
                    </div>
                  ))}
                  {jobs.length === 0 && (
                    <p className="font-sans text-sm opacity-60">None yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RequireWorkspace>
  );
}

