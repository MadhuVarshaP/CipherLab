export default function ComputeJobs() {
  const jobs = [
    { id: "JOB-442", name: "Genomic-Model-V1", dataset: "genomic_sequencing_v01.enc", status: "RUNNING", progress: 65, startTime: "2m ago" },
    { id: "JOB-441", name: "Particle-Filter-Main", dataset: "particle_collision_data_final.enc", status: "COMPLETED", progress: 100, startTime: "2h ago" },
    { id: "JOB-440", name: "Neural-Sync-Test", dataset: "neural_network_weights.enc", status: "FAILED", progress: 12, startTime: "5h ago" },
    { id: "JOB-439", name: "Climate-Trend-2024", dataset: "weather_patterns_central.enc", status: "COMPLETED", progress: 100, startTime: "1d ago" },
  ];

  return (
    <div className="space-y-12">
      {/* Create Job Form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-brand text-2xl font-bold uppercase italic">Initialize Compute</h3>
          <p className="font-sans text-xs opacity-50">
            Define your computation parameters. Code will be executed inside a hardened TEE enclave 
            with no external network access unless specified.
          </p>
        </div>
        <div className="lg:col-span-3 grid-border bg-white p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase font-bold">Job Name</label>
              <input type="text" className="w-full grid-border p-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]" placeholder="Enter job name..." />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase font-bold">Dataset Selection</label>
              <select className="w-full grid-border p-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa] appearance-none">
                <option>Select dataset...</option>
                <option>genomic_sequencing_v01.enc</option>
                <option>particle_collision_data_final.enc</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-mono text-[10px] uppercase font-bold">Compute Operation (Python/Rust/Wasm)</label>
              <textarea className="w-full grid-border p-4 font-mono text-xs h-32 focus:outline-none focus:bg-[#fafafa]" placeholder="Paste computation script or upload file..." />
            </div>
            <button className="grid-border bg-black text-white px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all md:col-span-2">
              Launch Secure Enclave
            </button>
          </form>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        <h3 className="font-brand text-xl font-bold uppercase italic border-b border-black/10 pb-4">
          Active Enclave Execution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <div key={i} className="grid-border bg-white p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[8px] uppercase font-bold opacity-40">{job.id}</span>
                  <h4 className="font-mono text-[14px] font-bold uppercase">{job.name}</h4>
                </div>
                <span className={`px-2 py-1 font-mono text-[8px] uppercase tracking-tighter ${
                  job.status === "RUNNING" ? "bg-black text-white" : 
                  job.status === "FAILED" ? "bg-red-500 text-white" : "grid-border"
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[8px] uppercase">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>
                <div className="w-full h-1 bg-black/5 overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500" 
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-[8px] font-mono uppercase opacity-50">
                <span>Dataset: {job.dataset}</span>
                <span>Started: {job.startTime}</span>
              </div>
              <button className="w-full grid-border-t pt-4 font-mono text-[10px] uppercase tracking-widest hover:underline text-left">
                View Logs & Meta-Proofs →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
