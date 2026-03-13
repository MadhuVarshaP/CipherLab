export default function TreasuryPage() {
  const payouts = [
    { id: "PAY-99", date: "2024-03-01", amount: "12.5 ETH", recipient: "Workspace-Collective", type: "AUTOMATED" },
    { id: "PAY-98", date: "2024-02-15", amount: "4.2 ETH", recipient: "madhu.eth", type: "CONTRIBUTION" },
    { id: "PAY-97", date: "2024-02-01", amount: "1.2 ETH", recipient: "alice.res", type: "CONTRIBUTION" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="md:col-span-2 grid-border bg-black text-white p-12 flex flex-col justify-between aspect-video">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Total Workspace Treasury Balance</span>
            <div className="text-7xl font-brand font-bold italic mt-4">84.52 ETH</div>
          </div>
          <div className="flex gap-4">
            <button className="grid-border border-white hover:bg-white hover:text-black px-6 py-2 font-mono text-[10px] uppercase transition-all">
              Add Funds
            </button>
            <button className="grid-border border-white hover:bg-white hover:text-black px-6 py-2 font-mono text-[10px] uppercase transition-all">
              Initialize Distribution
            </button>
          </div>
        </div>

        {/* Small Stats */}
        <div className="space-y-6">
          <div className="grid-border bg-white p-6 flex flex-col justify-between h-[calc(50%-12px)]">
            <span className="font-mono text-[9px] uppercase opacity-50">Pending Rewards</span>
            <span className="font-brand text-3xl font-bold italic">4.2 ETH</span>
          </div>
          <div className="grid-border bg-white p-6 flex flex-col justify-between h-[calc(50%-12px)]">
            <span className="font-mono text-[9px] uppercase opacity-50">Next Payout</span>
            <span className="font-brand text-3xl font-bold italic">2024-04-01</span>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="space-y-6">
        <h3 className="font-brand text-xl font-bold uppercase italic">Payout History</h3>
        <div className="grid-border bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f5f5f5] grid-border-b">
              <tr className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                <th className="p-6">Transaction ID</th>
                <th className="p-6">Date</th>
                <th className="p-6">Amount</th>
                <th className="p-6">Recipient</th>
                <th className="p-6 text-right">Reason</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-[#fcfcfc] transition-all">
                  <td className="p-6 font-mono text-xs font-bold">{p.id}</td>
                  <td className="p-6 font-mono text-xs">{p.date}</td>
                  <td className="p-6 font-mono text-xs font-bold">{p.amount}</td>
                  <td className="p-6 font-mono text-xs">{p.recipient}</td>
                  <td className="p-6 text-right">
                    <span className="px-2 py-1 bg-black/5 font-mono text-[8px] uppercase tracking-widest">
                      {p.type}
                    </span>
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
