export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Cheapest</p>
        <p className="text-2xl font-black text-emerald-500">$450</p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Fastest</p>
        <p className="text-2xl font-black text-sky-500">6h 20m</p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Best Value</p>
        <p className="text-2xl font-black text-flight-primary">Recommended</p>
      </div>
    </div>
  );
}
