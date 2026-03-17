"use client";

import { useRouter } from "next/navigation";
import { useWorkspaceContext } from "@/context/workspace";
import { useEffect } from "react";

const wallets = [
  { id: "metamask", label: "MetaMask" },
  { id: "walletconnect", label: "WalletConnect" },
  { id: "coinbase", label: "Coinbase Wallet" },
] as const;

export default function ConnectWalletPage() {
  const router = useRouter();
  const { walletAddress, connectWallet, workspace } = useWorkspaceContext();

  const handleConnect = (id: (typeof wallets)[number]["id"]) => {
    connectWallet(id);
    if (workspace) {
      router.push("/workspace/dashboard");
    } else {
      router.push("/workspace/create");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      router.replace(workspace ? "/workspace/dashboard" : "/workspace/create");
    }
  }, [router, walletAddress, workspace]);

  if (walletAddress) return null;

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
      <div className="max-w-xl w-full border border-black grid-border bg-white p-10 space-y-8">
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
            Authentication
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
          >
            Connect your wallet
          </h1>
          <p className="font-sans text-sm opacity-70">
            Authenticate with a crypto wallet to access your CipherLab
            workspace. This demo uses a simulated connection with mock
            addresses.
          </p>
        </div>

        <div className="grid gap-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              className="w-full grid-border px-6 py-4 text-left flex items-center justify-between hover:bg-black hover:text-white transition-all"
              onClick={() => handleConnect(wallet.id)}
            >
              <span className="font-brand text-lg font-bold uppercase tracking-widest">
                {wallet.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                Simulated
              </span>
            </button>
          ))}
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50">
          No transactions will be sent. This is a mock frontend flow.
        </p>
      </div>
    </main>
  );
}

