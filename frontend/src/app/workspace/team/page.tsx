"use client";

import { FormEvent, useMemo, useState } from "react";
import { useWorkspaceContext } from "@/context/workspace";
import RequireWorkspace from "@/components/RequireWorkspace";

export default function TeamPage() {
  const { contributors, addTeamMember, addActivity } = useWorkspaceContext();
  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Researcher");

  const rows = useMemo(() => contributors, [contributors]);

  const onAdd = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = wallet.trim();
    if (!trimmed) return;
    addTeamMember({ wallet: trimmed, name: name.trim() || "Collaborator", role });
    addActivity({
      type: "team",
      message: `Invited collaborator (${role})`,
      timestamp: "Just now",
    });
    setWallet("");
    setName("");
    setRole("Researcher");
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
          Team
        </h2>
        <p 
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
          Manage workspace collaborators (mock state).
        </p>
      </header>

      <section className="grid-border bg-white p-6">
        <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em] mb-4">
          Invite Member
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={onAdd}>
          <input
            className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]"
            placeholder="Wallet Address (mock)"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <input
            className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-3">
            <select
              className="grid-border px-4 py-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] flex-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Researcher</option>
              <option>Contributor</option>
              <option>Reviewer</option>
            </select>
            <button className="grid-border bg-black text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Add
            </button>
          </div>
        </form>
      </section>

      <section className="grid-border bg-white overflow-hidden">
        <div className="border-b border-black/10 px-6 py-4 flex items-center justify-between">
          <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
            Members
          </h3>
          <span className="font-mono text-[10px] uppercase opacity-50">
            {rows.length} total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] border-b border-black/10">
              <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Wallet</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Contribution</th>
                <th className="px-6 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.name + m.wallet} className="border-b border-black/5">
                  <td className="px-6 py-4 font-sans text-sm">{m.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{m.wallet}</td>
                  <td className="px-6 py-4 font-mono text-xs uppercase opacity-70">
                    {m.role}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    {m.contributionPercent}%
                  </td>
                  <td className="px-6 py-4 font-mono text-xs opacity-70">
                    {m.joinedAt}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={5}>
                    No members yet.
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

