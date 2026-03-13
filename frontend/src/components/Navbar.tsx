"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Experiments", href: "/features" },
    { name: "Vault", href: "/workspace" },
    { name: "Compute", href: "/security" },
    { name: "Graph", href: "/docs" },
    { name: "Grants", href: "/treasury" },
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

        {/* Links Section - Hidden on Mobile */}
        <div className="hidden lg:flex flex-1 h-full items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-6 h-full flex items-center text-[15px] tracking-widest hover:bg-black hover:text-white transition-all "
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section / Menu Trigger */}
        <div className="h-full flex items-center ml-auto">
          <div className="hidden lg:flex h-full items-center px-6 border-r border-black bg-black text-white">
            <Link
              href="/workspace/create"
              className="text-[15px] tracking-widest whitespace-nowrap"
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            >
              CREATE WORKSPACE
            </Link>
          </div>
          <button
            className="px-8 h-full flex items-center text-sm font-bold uppercase tracking-widest hover:bg-[#f5f5f5] transition-colors"
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "[ Close ]" : "[ Menu ]"}
          </button>
        </div>
      </div>

      {/* Mobile / Full Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black border-t border-black">
          <div className="flex-1 p-12 space-y-8">
            <h4 className="font-mono text-[10px] uppercase opacity-40">Navigation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {navLinks.map((link) => (
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
            <div className="pt-12 flex flex-col space-y-4">
              <Link href="/signin" className="font-brand text-2xl font-bold uppercase hover:underline">Sign In</Link>
              <Link href="/workspace/create" className="font-brand text-2xl font-bold uppercase hover:underline">Create Workspace</Link>
            </div>
          </div>
          <div className="hidden md:block w-1/3 p-12 bg-[#f5f5f5]">
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
