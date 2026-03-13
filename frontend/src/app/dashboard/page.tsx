export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Datasets", value: "24", change: "+2 this week" },
          { label: "Compute Jobs", value: "182", change: "99.9% uptime" },
          { label: "Contributors", value: "12", change: "4 pending" },
          { label: "Trust Score", value: "0.98", change: "Verifiable" }
        ].map((stat, i) => (
          <div key={i} className="grid-border bg-white p-6 justify-between flex flex-col aspect-video">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50">{stat.label}</span>
            <div>
              <div className="text-4xl font-brand font-bold italic">{stat.value}</div>
              <div className="font-mono text-[8px] uppercase tracking-widest mt-2">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contribution Graph Preview */}
        <div className="lg:col-span-2 grid-border bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-brand text-xl font-bold uppercase italic">Contribution Map</h3>
            <button className="font-mono text-[10px] uppercase hover:underline">View Full →</button>
          </div>
          <div className="h-[400px] w-full bg-[#fdfdfd] grid-border flex items-center justify-center font-mono text-[10px] opacity-20 italic">
            [ Interactive ZK-Graph Visualization ]
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="grid-border bg-white p-8">
          <h3 className="font-brand text-xl font-bold uppercase italic mb-8">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { type: "COMPUTE", msg: "Job #442 completed in enclave alpha-1", time: "2m ago" },
              { type: "VAULT", msg: "New dataset-v2.encrypted added by madhu.eth", time: "45m ago" },
              { type: "TREASURY", msg: "Reward distribution of 5.4 ETH finalized", time: "2h ago" },
              { type: "TEAM", msg: "New collaborator sarah.res joined workspace", time: "5h ago" },
              { type: "COMPUTE", msg: "Started enclave execution for Genomic-Model-V1", time: "1d ago" }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-mono text-[8px] uppercase font-bold text-black/40 mb-1">{activity.type} • {activity.time}</p>
                  <p className="font-sans text-xs font-medium leading-normal">{activity.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="grid-border p-8 bg-black text-white hover:bg-white hover:text-black transition-all group flex flex-col justify-between aspect-video text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100">Action 01</span>
          <span className="font-brand text-2xl font-bold uppercase italic">Upload Dataset</span>
        </button>
        <button className="grid-border p-8 bg-black text-white hover:bg-white hover:text-black transition-all group flex flex-col justify-between aspect-video text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100">Action 02</span>
          <span className="font-brand text-2xl font-bold uppercase italic">Start Compute Job</span>
        </button>
        <button className="grid-border p-8 bg-black text-white hover:bg-white hover:text-black transition-all group flex flex-col justify-between aspect-video text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100">Action 03</span>
          <span className="font-brand text-2xl font-bold uppercase italic">Invite Team</span>
        </button>
      </div>
    </div>
  );
}
