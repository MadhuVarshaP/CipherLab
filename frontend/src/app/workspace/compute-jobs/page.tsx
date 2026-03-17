"use client";

import { FormEvent, useMemo, useState } from "react";
import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function ComputeJobsPage() {
  const {
    datasets,
    jobs,
    addJob,
    updateJobStatus,
    addResultForJob,
    addActivity,
  } = useWorkspaceContext();

  const datasetOptions = useMemo(() => datasets, [datasets]);
  const rows = useMemo(() => jobs, [jobs]);

  const [jobName, setJobName] = useState("Tumor Detection Training");
  const [datasetId, setDatasetId] = useState(datasetOptions[0]?.id ?? "");
  const [operationType, setOperationType] = useState("Model Training");
  const [description, setDescription] = useState(
    "Train machine learning model to detect lung tumors."
  );

  const onCreate = (e: FormEvent) => {
    e.preventDefault();
    const name = jobName.trim();
    if (!name || !datasetId) return;

    const jobId = `job_${Date.now()}`;
    addJob({ id: jobId, name, datasetId, operationType, description });
    addActivity({
      type: "compute",
      message: `Created job "${name}"`,
      timestamp: "Just now",
    });

    // Simulated execution: pending -> running -> completed
    setTimeout(() => updateJobStatus(jobId, "Running"), 1200);
    setTimeout(() => {
      updateJobStatus(jobId, "Completed");
      addResultForJob(jobId);
      addActivity({
        type: "result",
        message: `Generated results for "${name}"`,
        timestamp: "Just now",
      });
    }, 4200);
  };

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
            Compute Jobs
          </h2>
          <p 
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
            Create jobs and simulate execution status changes.
          </p>
          <span className="font-mono text-[10px] uppercase opacity-50">
            {rows.filter((j) => j.status === "Running").length} running
          </span>
        </header>

        <section className="grid-border bg-white p-6">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Create Compute Job
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onCreate}>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Job Name
              </label>
              <input
                className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] w-full"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Dataset
              </label>
              <select
                className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] w-full"
                value={datasetId}
                onChange={(e) => setDatasetId(e.target.value)}
              >
                <option value="" disabled>
                  Select dataset...
                </option>
                {datasetOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Operation Type
              </label>
              <select
                className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] w-full"
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
              >
                <option>Dataset Aggregation</option>
                <option>Statistical Analysis</option>
                <option>Model Training</option>
                <option>Custom Compute</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Description
              </label>
              <input
                className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-center pt-2">
              <button className="grid-border w-auto min-w-40 bg-black text-white px-8 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Create Job
              </button>
            </div>
          </form>
        </section>

        <section className="grid-border bg-white overflow-hidden">
          <div className="border-b border-black/10 px-6 py-4 flex items-center justify-between">
            <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
              Job Queue
            </h3>
            <span className="font-mono text-[10px] uppercase opacity-50">
              {rows.length} jobs
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fafafa] border-b border-black/10">
                <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                  <th className="px-6 py-3">Job Name</th>
                  <th className="px-6 py-3">Dataset</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created By</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((j) => (
                  <tr key={j.id} className="border-b border-black/5">
                    <td className="px-6 py-4 font-sans text-sm">{j.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{j.datasetName}</td>
                    <td className="px-6 py-4 font-mono text-xs uppercase">
                      {j.status}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{j.createdBy}</td>
                    <td className="px-6 py-4 font-mono text-xs opacity-70">
                      {j.createdAt}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={5}>
                      No jobs yet. Create one above.
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

