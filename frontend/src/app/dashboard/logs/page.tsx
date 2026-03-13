export default function ActivityLogs() {
  const events = [
    { time: "2024-03-13 14:22:10", user: "madhu.eth", action: "ENCLAVE_EXECUTION_START", detail: "Job ID: JOB-442", status: "VERIFIED" },
    { time: "2024-03-13 13:05:45", user: "system", action: "VAULT_OBJECT_ENCRYPTION", detail: "dataset_v01.enc finalized", status: "SUCCESS" },
    { time: "2024-03-13 11:15:20", user: "alice.res", action: "TEAM_INVITE_SEND", detail: "Invited bob.xyz as Model-Admin", status: "PENDING" },
    { time: "2024-03-12 18:30:00", user: "system", action: "TREASURY_DISTRIBUTION", detail: "Payout #PAY-99 triggered", status: "SUCCESS" },
    { time: "2024-03-12 09:12:33", user: "sarah.eth", action: "VAULT_UPLOAD", detail: "Uploaded metadata_v2.json", status: "ENCRYPTED" },
    { time: "2024-03-11 22:45:12", user: "madhu.eth", action: "COMPUTE_LOG_READ", detail: "Accessed JOB-439 telemetry", status: "AUDITED" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-brand text-2xl font-bold uppercase italic">Audit Timeline</h3>
          <p className="font-sans text-xs opacity-50 mt-2">Cryptographically immutable logs of all workspace operations.</p>
        </div>
        <div className="flex gap-2">
          {["All", "Vault", "Compute", "Treasury"].map(filter => (
            <button key={filter} className={`px-4 py-2 grid-border font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all
              ${filter === "All" ? "bg-black text-white" : "bg-white"}
            `}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-border bg-white overflow-hidden">
        <div className="bg-[#f5f5f5] grid-border-b p-4 flex font-mono text-[10px] uppercase font-bold text-black/40">
          <div className="w-[15%]">Timestamp</div>
          <div className="w-[15%]">Actor</div>
          <div className="w-[25%]">Action</div>
          <div className="w-[30%]">Parameters</div>
          <div className="w-[15%] text-right">Audit Status</div>
        </div>
        <div className="divide-y divide-black/5">
          {events.map((e, i) => (
            <div key={i} className="p-4 flex items-center font-mono text-[10px] hover:bg-[#fcfcfc] transition-all">
              <div className="w-[15%] opacity-40">{e.time}</div>
              <div className="w-[15%] font-bold">{e.user}</div>
              <div className="w-[25%]">
                <span className="px-1.5 py-0.5 grid-border bg-[#fafafa]">{e.action}</span>
              </div>
              <div className="w-[30%] italic opacity-60 px-2">{e.detail}</div>
              <div className="w-[15%] text-right font-bold tracking-tighter text-green-600">
                [ {e.status} ]
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center pt-8">
        <button className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 hover:tracking-[0.5em] transition-all">
          Load Historical Data
        </button>
      </div>
    </div>
  );
}
