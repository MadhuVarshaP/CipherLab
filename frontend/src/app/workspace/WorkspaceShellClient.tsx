"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWorkspaceContext } from "@/context/workspace";

export default function WorkspaceShellClient({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { walletAddress, workspace } = useWorkspaceContext();

  const redirectTarget = useMemo(() => {
    if (!walletAddress) return "/auth/connect";
    if (!workspace) return "/workspace/create";
    return null;
  }, [walletAddress, workspace]);

  useEffect(() => {
    if (redirectTarget) router.replace(redirectTarget);
  }, [pathname, redirectTarget, router, walletAddress, workspace]);

  if (redirectTarget) return null;

  return (
    <div className="bg-[#fafafa] min-h-[calc(100vh-4rem)]">
      <header className="border-b border-black/10 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-50">
              Workspace
            </p>
            <h1 className="font-brand text-xl md:text-2xl font-bold uppercase tracking-tighter">
              {workspace?.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                Connected Wallet
              </span>
              <span className="font-mono text-[10px]">
                {walletAddress
                  ? `${walletAddress.slice(0, 8)}…${walletAddress.slice(-6)}`
                  : "Not connected"}
              </span>
            </div>
            <div className="w-8 h-8 grid-border rounded-full flex items-center justify-center">
              <span className="font-mono text-[9px]">!</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-10">{children}</main>
    </div>
  );
}

