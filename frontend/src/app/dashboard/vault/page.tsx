export default function DataVault() {
  const datasets = [
    { name: "genomic_sequencing_v01.enc", contributor: "madhu.eth", date: "2024-03-12", status: "ENCRYPTED", jobs: 4 },
    { name: "particle_collision_data_final.enc", contributor: "alice.eth", date: "2024-03-10", status: "TEE-LOCKED", jobs: 12 },
    { name: "demographic_dataset_mask.enc", contributor: "bob.eth", date: "2024-03-08", status: "ENCRYPTED", jobs: 1 },
    { name: "weather_patterns_central.enc", contributor: "charlie.eth", date: "2024-03-05", status: "TEE-LOCKED", jobs: 8 },
    { name: "neural_network_weights.enc", contributor: "sarah.eth", date: "2024-03-01", status: "ENCRYPTED", jobs: 24 },
  ];

  return (
    <div className="space-y-12">
      {/* Upload Panel */}
      <div className="grid-border bg-white p-12 flex flex-col items-center justify-center text-center border-dashed border-2">
        <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6">
          <span className="text-2xl">↑</span>
        </div>
        <h3 className="font-brand text-2xl font-bold uppercase italic mb-2">Upload Encrypted Dataset</h3>
        <p className="font-sans text-sm opacity-50 mb-8 max-w-sm">
          Files are automatically encrypted client-side before being pushed to the secure vault. 
          Maximum file size: 10GB.
        </p>
        <button className="grid-border bg-black text-white px-8 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Select Files
        </button>
      </div>

      {/* Dataset List */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="font-brand text-xl font-bold uppercase italic">Secure Vault Inventory</h3>
          <div className="font-mono text-[10px] uppercase opacity-50">{datasets.length} Objects Total</div>
        </div>

        <div className="grid-border bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f5f5f5] grid-border-b">
              <tr className="font-mono text-[10px] uppercase tracking-widest">
                <th className="p-6 font-bold">Object Name</th>
                <th className="p-6 font-bold">Contributor</th>
                <th className="p-6 font-bold">Upload Date</th>
                <th className="p-6 font-bold">Security Status</th>
                <th className="p-6 font-bold text-right">Linked Jobs</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-[#fcfcfc] transition-all group">
                  <td className="p-6 font-mono text-xs font-bold">{dataset.name}</td>
                  <td className="p-6 font-mono text-xs">{dataset.contributor}</td>
                  <td className="p-6 font-mono text-xs">{dataset.date}</td>
                  <td className="p-6">
                    <span className={`px-2 py-1 font-mono text-[8px] uppercase tracking-tighter ${
                      dataset.status === "TEE-LOCKED" ? "bg-black text-white" : "grid-border"
                    }`}>
                      {dataset.status}
                    </span>
                  </td>
                  <td className="p-6 text-right font-mono text-xs group-hover:translate-x-1 transition-transform">
                    {dataset.jobs} jobs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
