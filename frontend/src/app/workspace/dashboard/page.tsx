/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useWorkspaceContext } from "@/context/workspace";
import Link from "next/link";
import RequireWorkspace from "@/components/RequireWorkspace";

export default function WorkspaceDashboardPage() {
  const { workspace, contributors, datasets, jobs, activities } =
    useWorkspaceContext();

  const overview = {
    collaborators: contributors.length || 5,
    datasets: datasets.length || 12,
    jobs: jobs.length || 4,
  };

  return (
    <RequireWorkspace>
      <div className="cl-page space-y-10 relative">
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cl-card flex flex-col justify-between">
          <div className="space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-60">
              Workspace Overview
            </p>
            <h2 style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}  className=" text-2xl font-bold uppercase tracking-tighter">
              {workspace?.name ?? "CipherLab Workspace"}
            </h2>
            <p className="font-sans text-xs opacity-70">
              {workspace?.description ??
                "Private research collaboration space with encrypted datasets and trusted compute."}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-black/10 p-3 bg-[#fafafa]">
              <p className="font-mono text-[8px] uppercase opacity-50">
                Collaborators
              </p>
              <p className="font-brand text-xl font-bold">
                {overview.collaborators}
              </p>
            </div>
            <div className="rounded-xl border border-black/10 p-3 bg-[#fafafa]">
              <p className="font-mono text-[8px] uppercase opacity-50">
                Datasets
              </p>
              <p className="font-brand text-xl font-bold">
                {overview.datasets}
              </p>
            </div>
            <div className="rounded-xl border border-black/10 p-3 bg-[#fafafa]">
              <p className="font-mono text-[8px] uppercase opacity-50">
                Active Jobs
              </p>
              <p className="font-brand text-xl font-bold">{overview.jobs}</p>
            </div>
          </div>
        </div>

        <div className="cl-card flex flex-col justify-between">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/workspace/data-vault"
              className="w-full rounded-xl border border-black/10 px-4 py-3 flex items-center justify-between hover:bg-black hover:text-white transition-all"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Upload Dataset
              </span>
              <span className="font-mono text-[10px]">↗</span>
            </Link>
            <Link
              href="/workspace/compute-jobs"
              className="w-full rounded-xl border border-black/10 px-4 py-3 flex items-center justify-between hover:bg-black hover:text-white transition-all"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Start Compute Job
              </span>
              <span className="font-mono text-[10px]">↗</span>
            </Link>
            <Link
              href="/workspace/team"
              className="w-full rounded-xl border border-black/10 px-4 py-3 flex items-center justify-between hover:bg-black hover:text-white transition-all"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Invite Collaborator
              </span>
              <span className="font-mono text-[10px]">↗</span>
            </Link>
          </div>
        </div>

        <div className="cl-card flex flex-col justify-between">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Contribution Summary
          </h3>
          <div className="space-y-2">
            {(contributors.length
              ? contributors
              : [
                  { name: "Alice", contributionPercent: 35 },
                  { name: "Bob", contributionPercent: 25 },
                  { name: "Carol", contributionPercent: 20 },
                  { name: "David", contributionPercent: 15 },
                  { name: "Eve", contributionPercent: 5 },
                ]
            ).map((c: any) => (
              <div
                key={c.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-sans">{c.name}</span>
                <span className="font-mono text-[10px] uppercase">
                  {c.contributionPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 cl-card">
          <div className="cl-card-header">
            <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
              Recent Activity
            </h3>
            <span className="font-mono text-[9px] uppercase opacity-50">
              Last events
            </span>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
            {activities.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="w-1 h-8 bg-black/10 rounded-full mt-1" />
                <div>
                  <p className="font-sans text-sm">{a.message}</p>
                  <p className="font-mono text-[9px] uppercase opacity-50 mt-1">
                    {a.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cl-card">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Workspace Signals
          </h3>
          <ul className="space-y-3 text-sm font-sans">
            <li>• Encrypted datasets stored in private vault.</li>
            <li>• Secure compute jobs executing in TEEs.</li>
            <li>• Contribution graph updating as jobs complete.</li>
            <li>• Rewards ready for distribution in Treasury.</li>
          </ul>
        </div>
      </section>
      </div>
    </RequireWorkspace>
  );
}

