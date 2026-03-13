"use client";

export default function Marquee() {
  const items = [
    "Trusted Execution",
    "Encrypted Datasets",
    "Verifiable Compute",
    "ZK Attribution",
    "Proof-of-Contribution",
    "Research Treasury",
  ];

  const separator = (
    <span
      style={{
        display: "inline-block",
        margin: "0 2rem",
        color: "rgba(255,255,255,0.45)",
        fontSize: "2rem",
        lineHeight: 1,
      }}
    >
      ✦
    </span>
  );

  const content = items.map((item, i) => (
    <span
      key={i}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <span
        style={{
          fontFamily: "var(--font-neue-machina), sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {item}
      </span>
      {separator}
    </span>
  ));

  return (
    <div
      style={{
        borderTop: "1px solid #000",
        borderBottom: "1px solid #000",
        background: "#000",
        overflow: "hidden",
        padding: "1.25rem 0",
      }}
    >
      {/* Track: two copies side by side → translateX(-50%) = seamless loop */}
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 5s linear infinite",
          willChange: "transform",
        }}
      >
        {/* TWO copies so -50% translate always lands on the second-copy start */}
        <span style={{ display: "inline-flex", alignItems: "center", paddingRight: "2rem" }}>
          {content}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", paddingRight: "2rem" }}>
          {content}
        </span>
      </div>
    </div>
  );
}
