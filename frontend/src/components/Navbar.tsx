"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useWorkspaceContext } from "@/context/workspace";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { walletAddress } = useWorkspaceContext();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/workspace/dashboard" },
    { name: "Team", href: "/workspace/team" },
    { name: "Data Vault", href: "/workspace/data-vault" },
    { name: "Jobs", href: "/workspace/compute-jobs" },
    { name: "Graph", href: "/workspace/contribution-graph" },
    { name: "Results", href: "/workspace/results" },
    { name: "Treasury", href: "/workspace/treasury" },
    { name: "Activity", href: "/workspace/activity" },
    { name: "Settings", href: "/workspace/settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white grid-border-b">
      <div className="flex h-16 items-center">
        <div className="px-6 h-full flex items-center border-r border-black min-w-[200px]">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter "
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
          >
            CIPHERLAB<span className="text-[15px] align-top ml-0.5">®</span>
          </Link>
        </div>

        {/* Center nav (workspace) - Hidden on Mobile */}
        <div className="hidden lg:flex flex-1 h-full items-center">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 h-full flex items-center text-[13px] tracking-widest transition-all ${
                  active ? "bg-black text-white" : "hover:bg-black hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
   

        {/* Right Section / Wallet + Menu */}
        <div className="h-full flex items-center ml-auto">
          <div className="hidden lg:flex h-full items-center">
            <Link
              href="/auth/connect"
              className="px-6 h-full flex items-center text-[13px] tracking-widest bg-black text-white hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            >
              {walletAddress
                ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile / Full Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black border-t border-black">
          <div className="flex-1 p-12 space-y-8">
            <h4 className="font-mono text-[10px] uppercase opacity-40">Navigation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {[
                { name: "Home", href: "/" },
                ...navLinks,
                { name: "Settings", href: "/workspace/settings" },
                { name: walletAddress ? "Wallet" : "Connect Wallet", href: "/auth/connect" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-brand text-4xl font-bold uppercase hover:italic transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block w-1/3 p-12 bg-secondary">
            <h4 className="font-mono text-[10px] uppercase opacity-40 mb-8">CipherLab Project</h4>
            <p className="font-sans text-sm leading-relaxed mb-12">
              A privacy-preserving research collaboration platform. Securely share datasets,
              run computations inside trusted execution environments.
            </p>
            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase border-b border-black pb-2">Status: Active</div>
              <div className="font-mono text-[10px] uppercase border-b border-black pb-2">Location: Global/Network</div>
              <div className="font-mono text-[10px] uppercase border-b border-black pb-2">Type: Experimental Research</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
