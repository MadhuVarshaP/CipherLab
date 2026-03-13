"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Link from "next/link";

/* ─── Scroll-reveal hook ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target); // animate only once
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Stagger helper ─────────────────────────────────────────────────────── */
function staggerStyle(i: number): React.CSSProperties {
  return { transitionDelay: `${i * 80}ms` };
}

export default function Home() {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative w-full min-h-[92vh] flex flex-col justify-end border-b border-black overflow-hidden">
        <video
          ref={videoRef}
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center px-6 gap-4">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] text-white/70"
          >
            Privacy · First · Research
          </p>
          <h1
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            className="text-[clamp(3rem,9vw,8rem)] font-extrabold uppercase tracking-tighter leading-none text-white drop-shadow-2xl"
          >
            Cipher<span className="italic">Lab</span>
          </h1>
          <p
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            className="text-base md:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            Compute on secrets. Share nothing but results.
          </p>
          <div className="mt-4 flex gap-4">
            <Link
              href="/workspace/create"
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
              className="px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-white"
            >
              Start Building
            </Link>
            <Link
              href="#features"
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
              className="px-8 py-3 bg-transparent text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/50"
            >
              Learn More ↓
            </Link>
          </div>
        </div>

        {/* ── Bottom scroll hint ── */}
        <div className="relative z-20 flex justify-center pb-8">
          {/* <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white">
              Scroll
            </span>
            <div className="w-px h-10 bg-white animate-pulse" />
          </div> */}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════════════════════ */}
      <div className="reveal">
        <Marquee />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto border-x border-b border-black grid grid-cols-2 md:grid-cols-4 bg-white reveal">
        {[
          { label: "Active Jobs", val: "2,142" },
          { label: "Data Secured", val: "14.2 TB" },
          { label: "Network nodes", val: "84" },
          { label: "Verifications", val: "0.98ms" },
        ].map((stat, i) => (
          <div
            key={i}
            style={staggerStyle(i)}
            className={`p-4 font-mono text-[9px] uppercase tracking-widest flex justify-between items-center reveal ${i !== 3 ? "border-r border-black" : ""
              }`}
          >
            <span className="opacity-50">{stat.label}:</span>
            <span className="font-bold">{stat.val}</span>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="max-w-[1440px] mx-auto border-x border-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
          {[
            {
              title: "Private Data Vault",
              desc: "Military-grade encryption for your research datasets at rest and in transit. No raw data leaks.",
            },
            {
              title: "Secure Compute",
              desc: "Run arbitrary code inside hardware-encrypted TEE enclaves without exposing sensitive logic.",
            },
            {
              title: "Contribution Graph",
              desc: "Automatically map how datasets and models evolve through multi-party collaboration.",
            },
            {
              title: "Verifiable Result",
              desc: "Cryptographic proofs of execution for every compute job. Trust, but verify everything.",
            },
            {
              title: "ZK Attribution",
              desc: "Algorithmic proof-of-contribution for fair and transparent research reward distribution.",
            },
            {
              title: "Modular Treasury",
              desc: "Integrated multi-party treasury for automated project funding and payout management.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={staggerStyle(i)}
              className={`reveal p-12 min-h-[350px] flex flex-col justify-between hover:bg-black hover:text-white transition-all group border-b border-black lg:border-b ${(i + 1) % 3 !== 0 ? "lg:border-r lg:border-black" : ""
                }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className="font-brand text-4xl font-bold italic opacity-10 group-hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-8 h-8 border border-black group-hover:border-white flex items-center justify-center font-mono text-xs transition-colors">
                  +
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className="text-3xl font-bold tracking-tighter uppercase leading-none"
                  style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed opacity-60 group-hover:opacity-90">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-8 font-mono text-[9px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Read Abstract →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto border-x border-b border-black py-32 bg-white relative overflow-hidden reveal">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url('/images/analysis.svg')",
            backgroundSize: "700px",
          }}
        />
        <div className="relative px-12 text-center space-y-12">
          <h2
            className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none reveal"
            style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
          >
            THE FUTURE OF
            <br />
            SCIENTIFIC
            <br />
            <span className="italic">CONSENSUS</span>
          </h2>
          <div className="max-w-xl mx-auto space-y-8 reveal" style={staggerStyle(1)}>
            <p className="font-sans text-lg md:text-xl leading-relaxed">
              CipherLab removes the barriers to sharing sensitive research.
              Collaborate without compromise using our hardware-secured
              computation fabric.
            </p>
            <Link
              href="/workspace/create"
              className="inline-block border border-black px-12 py-5 font-brand text-xl font-bold uppercase bg-black text-white hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: "var(--font-neue-machina), sans-serif" }}
            >
              Join the Network
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
