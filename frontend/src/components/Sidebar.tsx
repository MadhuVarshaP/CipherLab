"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/dashboard" },
  { name: "Data Vault", href: "/dashboard/vault" },
  { name: "Compute Jobs", href: "/dashboard/compute" },
  { name: "Contribution Graph", href: "/dashboard/graph" },
  { name: "Treasury", href: "/dashboard/treasury" },
  { name: "Activity Logs", href: "/dashboard/logs" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 grid-border-r bg-white z-20 flex flex-col">
      <div className="p-6 grid-border-b h-20 flex items-center">
        <Link href="/" className="font-brand text-xl font-bold tracking-tighter">
          CIPHERLAB
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-8">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black/5"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 grid-border-t">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-mono text-xs">
            M
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-mono text-[10px] uppercase font-bold truncate">Madhu C.</p>
            <p className="font-mono text-[8px] uppercase opacity-50 truncate">madhu@cipherlab.org</p>
          </div>
        </div>
        <button className="w-full grid-border py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
