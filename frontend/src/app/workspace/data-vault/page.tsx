/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useMemo, useState } from "react";
import { useWorkspaceContext } from "@/context/workspace";
import RequireWorkspace from "@/components/RequireWorkspace";

export default function DataVaultPage() {
  const { datasets, addDataset, addActivity } = useWorkspaceContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState<"Private" | "Team">("Team");

  const rows = useMemo(() => datasets, [datasets]);

  const onUpload = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    addDataset({ name: n, description: description.trim(), access });
    addActivity({
      type: "upload",
      message: `Uploaded encrypted dataset "${n}"`,
      timestamp: "Just now",
    });
    setName("");
    setDescription("");
    setAccess("Team");
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
          Data Vault
        </h2>
        <p 
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
          Store encrypted datasets (mock upload, metadata only).
        </p>
        <span className="font-mono text-[10px] uppercase opacity-50">
          {rows.length} datasets
        </span>
      </header>

      <section className="grid-border bg-white p-6">
        <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
          Upload Dataset
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={onUpload}>
          <input
            className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]"
            placeholder="Dataset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-3">
            <select
              className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] flex-1"
              value={access}
              onChange={(e) => setAccess(e.target.value as any)}
            >
              <option value="Private">Private</option>
              <option value="Team">Team Access</option>
            </select>
            <button className="grid-border bg-black text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Upload
            </button>
          </div>
        </form>
      </section>

      <section className="grid-border bg-white overflow-hidden">
        <div className="border-b border-black/10 px-6 py-4 flex items-center justify-between">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
            Datasets
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] border-b border-black/10">
              <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Uploaded By</th>
                <th className="px-6 py-3">Upload Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Linked Jobs</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-b border-black/5">
                  <td className="px-6 py-4 font-sans text-sm">{d.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{d.uploadedBy}</td>
                  <td className="px-6 py-4 font-mono text-xs opacity-70">
                    {d.uploadDate}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs uppercase">
                    {d.status}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{d.linkedJobs}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={5}>
                    No datasets uploaded yet.
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

