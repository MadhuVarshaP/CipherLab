"use client";

import { useMemo } from "react";
import RequireWorkspace from "@/components/RequireWorkspace";
import { useWorkspaceContext } from "@/context/workspace";

export default function TreasuryPage() {
  const { treasuryBalanceEth, contributors, payouts } = useWorkspaceContext();

  const distribution = useMemo(() => {
    const total = contributors.reduce((sum, c) => sum + c.contributionPercent, 0) || 100;
    return contributors.map((c) => ({
      name: c.name,
      percent: c.contributionPercent,
      allocationEth: (treasuryBalanceEth * (c.contributionPercent / total)),
    }));
  }, [contributors, treasuryBalanceEth]);

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
            Treasury
          </h2>
          <p  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                  className=" text-sm opacity-60 max-w-2xl">
            Reward distribution based on contributions (mock).
          </p>
          <span className="font-mono text-[10px] uppercase opacity-50">
            Balance: {treasuryBalanceEth.toFixed(1)} ETH
          </span>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="grid-border bg-white p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-60">
              Treasury Balance
            </p>
            <p className="font-brand text-4xl font-bold italic mt-4">
              {treasuryBalanceEth.toFixed(1)} ETH
            </p>
          </div>
          <div className="lg:col-span-2 grid-border bg-white overflow-hidden">
            <div className="border-b border-black/10 px-6 py-4">
              <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
                Contribution Distribution
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#fafafa] border-b border-black/10">
                  <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                    <th className="px-6 py-3">Contributor</th>
                    <th className="px-6 py-3">Contribution %</th>
                    <th className="px-6 py-3">Reward Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {distribution.map((d) => (
                    <tr key={d.name} className="border-b border-black/5">
                      <td className="px-6 py-4 font-sans text-sm">{d.name}</td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {d.percent}%
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {d.allocationEth.toFixed(2)} ETH
                      </td>
                    </tr>
                  ))}
                  {distribution.length === 0 && (
                    <tr>
                      <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={3}>
                        No contributors yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid-border bg-white overflow-hidden">
          <div className="border-b border-black/10 px-6 py-4">
            <h3 className="font-brand text-sm font-bold uppercase tracking-[0.3em]">
              Payout History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fafafa] border-b border-black/10">
                <tr className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                  <th className="px-6 py-3">Transaction</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Recipient</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b border-black/5">
                    <td className="px-6 py-4 font-mono text-xs">{p.txHash}</td>
                    <td className="px-6 py-4 font-mono text-xs">{p.amountEth} ETH</td>
                    <td className="px-6 py-4 font-sans text-sm">{p.recipient}</td>
                    <td className="px-6 py-4 font-mono text-xs opacity-70">{p.date}</td>
                  </tr>
                ))}
                {payouts.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 font-sans text-sm opacity-60" colSpan={4}>
                      No payouts yet.
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

