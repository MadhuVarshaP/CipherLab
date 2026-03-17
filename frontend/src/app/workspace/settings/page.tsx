"use client";

import { FormEvent, useState } from "react";
import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function SettingsPage() {
  const { workspace, createWorkspace, disconnectWallet, walletAddress } =
    useWorkspaceContext();
  const [name, setName] = useState(workspace?.name ?? "CipherLab Research");
  const [description, setDescription] = useState(
    workspace?.description ?? "Privacy-preserving collaboration workspace."
  );
  const [organization, setOrganization] = useState(
    workspace?.organization ?? "CipherLab Org"
  );

  const onSave = (e: FormEvent) => {
    e.preventDefault();
    createWorkspace({ name, description, organization });
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
            Settings
          </h2>
          <p  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
            Workspace configuration (mock, local state only).
          </p>
        </header>

        <section className="grid-border bg-white p-6">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Workspace Information
          </h3>
          <form className="space-y-4" onSubmit={onSave}>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Workspace Name
              </label>
              <input
                className="grid-border px-4 py-3 font-sans text-sm focus:outline-none focus:bg-[#fafafa] w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Description
              </label>
              <textarea
                className="grid-border px-4 py-3 font-sans text-sm focus:outline-none focus:bg-[#fafafa] w-full h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-60">
                Organization
              </label>
              <input
                className="grid-border px-4 py-3 font-sans text-sm focus:outline-none focus:bg-[#fafafa] w-full"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
         <div className="flex justify-center">
         <button className="grid-border bg-black text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Save
            </button>
         </div>
          </form>
        </section>

        <section className="grid-border bg-white p-6">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Security
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase opacity-60">
                Connected Wallet
              </p>
              <p className="font-mono text-xs">{walletAddress}</p>
            </div>
            <button
              onClick={() => disconnectWallet()}
              className="grid-border bg-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Disconnect Wallet
            </button>
          </div>
        </section>
      </div>
    </RequireWorkspace>
  );
}

