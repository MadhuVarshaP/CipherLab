"use client";

import { WorkspaceProvider } from "@/context/workspace";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WorkspaceProvider>{children}</WorkspaceProvider>;
}

