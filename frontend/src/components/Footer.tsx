import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="min-w-full mx-auto grid-border-x border-b border-black bg-white">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-10 grid-border-r border-b lg:border-b-0 border-black space-y-8">
          <Link href="/" className="font-brand text-3xl font-bold tracking-tighter block hover:italic transition-all">
            CIPHERLAB
          </Link>
          <p className="font-sans text-xs leading-relaxed opacity-60">
            Open-source privacy infrastructure for collaborative research.
            Built on TEEs and zero-knowledge proofs.
          </p>
        </div>

        {[
          {
            title: "Protocol",
            links: ["Whitepaper", "Security", "TEEs", "ZK-Attribution"]
          },
          {
            title: "Resources",
            links: ["Documentation", "API Reference", "Architecture", "Github"]
          },
          {
            title: "Network",
            links: ["Grants", "Governance", "Privacy Policy", "Terms"]
          }
        ].map((section, idx) => (
          <div key={section.title} className={`p-10 border-b lg:border-b-0 border-black ${idx !== 2 ? 'lg:grid-border-r' : ''}`}>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-8 opacity-40">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map(link => (
                <li key={link}>
                  <Link href="#" className="font-brand text-sm font-bold uppercase hover:italic hover:translate-x-1 transition-all block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      {/* Bottom Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black h-16 divide-x divide-black max-w-full">
        <div className="px-10 h-full flex items-center font-mono text-[9px] uppercase tracking-widest opacity-40">
          © {currentYear} CIPHERLAB PROJECT •
        </div>
        <div className="px-10 h-full flex items-center justify-end font-mono text-[9px] uppercase tracking-widest opacity-40">
          {/* ENCRYPTION: AES-256-GCM */}
        </div>
      </div>
    </footer>
  );
}
