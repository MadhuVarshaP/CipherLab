export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <section className="space-y-6">
        <h3 className="font-brand text-xl font-bold uppercase italic border-b border-black/10 pb-4">Profile Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase font-bold">Display Name</label>
            <input type="text" className="w-full grid-border p-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]" defaultValue="Madhu C." />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase font-bold">Organization</label>
            <input type="text" className="w-full grid-border p-3 font-mono text-xs focus:outline-none focus:bg-[#fafafa]" defaultValue="CipherLab Org" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="font-mono text-[10px] uppercase font-bold">Connected Wallet / ZK-ID</label>
            <div className="w-full grid-border p-3 font-mono text-xs bg-[#f5f5f5] flex justify-between items-center">
              <span>0x71C765...d897 &bull; [ VERIFIED ]</span>
              <button className="underline hover:no-underline">Change</button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="font-brand text-xl font-bold uppercase italic border-b border-black/10 pb-4">Privacy & Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Encrypted Backups", desc: "Automatically back up encrypted vault metadata to IPFS." },
            { label: "TEE Compute Alerts", desc: "Get notified when enclave execution starts or finishes." },
            { label: "Contribution Updates", desc: "Weekly report on your contribution score and attribution." },
            { label: "Direct Messages", desc: "Allow other workspace members to send you peer-to-peer messages." }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 grid-border bg-white">
              <div>
                <p className="font-mono text-xs font-bold uppercase">{item.label}</p>
                <p className="font-sans text-[10px] opacity-50">{item.desc}</p>
              </div>
              <div className="w-12 h-6 grid-border bg-black flex items-center px-1">
                <div className="w-4 h-4 bg-white translate-x-6"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="font-brand text-xl font-bold uppercase italic border-b border-black/10 pb-4">Security Keys</h3>
        <div className="grid-border bg-[#fff5f5] p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase text-red-600 font-bold">DANGER ZONE</p>
          <p className="font-sans text-xs">
            Exporting your encryption master key will expose all your private data if compromised. 
            Store it in a hardware security module (HSM).
          </p>
          <button className="grid-border border-red-600 text-red-600 px-6 py-2 font-mono text-[10px] uppercase font-bold hover:bg-red-600 hover:text-white transition-all">
            Export Master Key
          </button>
        </div>
      </section>

      <div className="pt-8 flex gap-4">
        <button className="grid-border bg-black text-white px-8 py-4 font-brand text-sm font-bold uppercase hover:opacity-80 transition-all">
          Save All Changes
        </button>
        <button className="px-8 py-4 font-brand text-sm font-bold uppercase opacity-50 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
