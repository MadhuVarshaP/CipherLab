export default function ContributionGraph() {
  const contributors = [
    { name: "madhu.eth", score: 42.5, items: ["Dataset V01", "Compute Script A"] },
    { name: "alice.res", score: 28.1, items: ["Model Weights B"] },
    { name: "bob.xyz", score: 15.4, items: ["Verification Task #12"] },
    { name: "sarah.eth", score: 10.0, items: ["Data Cleaning V2"] },
    { name: "others", score: 4.0, items: ["Bug reports", "Documentation"] },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-brand text-2xl font-bold uppercase italic">Contribution Score</h3>
          <p className="font-sans text-xs opacity-50 mb-8">
            Scores are recalculated after every verified compute job using the automated attribution 
            algorithm (Proof-of-Contribution).
          </p>
          <div className="space-y-4">
            {contributors.map((c, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] uppercase font-bold">
                  <span>{c.name}</span>
                  <span>{c.score}%</span>
                </div>
                <div className="w-full h-1 bg-black/5 overflow-hidden">
                  <div className="h-full bg-black" style={{ width: `${c.score}%` }} />
                </div>
                <p className="font-mono text-[8px] uppercase opacity-40">{c.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 grid-border bg-white relative p-12 overflow-hidden min-h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
          />
          <div className="relative text-center space-y-8">
            {/* Simple visual representation of a graph node system */}
            <div className="flex justify-center flex-wrap gap-12 max-w-lg mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full grid-border bg-white flex items-center justify-center font-mono text-[10px] relative
                  ${i % 3 === 0 ? "scale-150 z-10 bg-black text-white" : ""}
                `}>
                  {i}
                  {/* Decorative lines to simulate graph edges */}
                  {i === 1 && <div className="absolute w-40 h-[1px] bg-black/10 origin-left rotate-[35deg] -z-10" />}
                  {i === 3 && <div className="absolute w-40 h-[1px] bg-black/10 origin-right rotate-[15deg] -z-10" />}
                </div>
              ))}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              Autonomous Contribution Discovery Enabled
            </div>
            <p className="font-sans text-xs opacity-50 max-w-md mx-auto">
              This visualization represents the cryptographic linkage between datasets, 
              models, and verified results within the CipherLab secure enclaves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
