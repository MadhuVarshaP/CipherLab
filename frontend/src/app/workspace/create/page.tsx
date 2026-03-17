"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceContext } from "@/context/workspace";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const { createWorkspace, walletAddress, connectWallet } =
    useWorkspaceContext();

  const [name, setName] = useState("AI Medical Research Collaboration");
  const [description, setDescription] = useState(
    "A private collaboration environment for analyzing medical imaging datasets."
  );
  const [organization, setOrganization] = useState(
    "Global Health Research Lab"
  );

  if (!walletAddress) {
    connectWallet("walletconnect");
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createWorkspace({ name, description, organization });
    router.push("/workspace/dashboard");
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
      <div className="max-w-2xl w-full border border-black grid-border bg-white p-10 space-y-8 py-4">
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
            Create Workspace
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
          >
            Initialize collaboration space
          </h1>
          <p className="font-sans text-sm opacity-70">
            Define the workspace that your team will use to upload encrypted
            datasets, run compute jobs, and distribute rewards.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Workspace Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full grid-border px-4 py-3 font-sans text-sm focus:outline-none focus:bg-[#fafafa]"
              placeholder="AI Medical Research Collaboration"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Workspace Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full grid-border px-4 py-3 font-sans text-sm h-24 focus:outline-none focus:bg-[#fafafa]"
              placeholder="A private collaboration environment for analyzing medical imaging datasets."
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Organization Name
            </label>
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full grid-border px-4 py-3 font-sans text-sm focus:outline-none focus:bg-[#fafafa]"
              placeholder="Global Health Research Lab"
            />
          </div>

          <button
            type="submit"
            className="w-full grid-border bg-black text-white px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
          >
            Create Workspace
          </button>
        </form>
      </div>
    </main>
  );
}


