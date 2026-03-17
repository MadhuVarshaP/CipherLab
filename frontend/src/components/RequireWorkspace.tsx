"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceContext } from "@/context/workspace";

export default function RequireWorkspace({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { walletAddress, workspace } = useWorkspaceContext();

  useEffect(() => {
    if (!walletAddress) router.replace("/auth/connect");
    else if (!workspace) router.replace("/workspace/create");
  }, [router, walletAddress, workspace]);

  if (!walletAddress || !workspace) return null;
  return <>{children}</>;
}

