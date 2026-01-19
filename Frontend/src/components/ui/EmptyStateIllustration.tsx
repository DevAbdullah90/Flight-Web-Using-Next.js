import { CloudOff } from 'lucide-react';

export function EmptyStateIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
      <div className="bg-slate-50 p-4 rounded-full mb-4">
        <CloudOff size={40} className="text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No flights found</h3>
      <p className="text-slate-500 text-sm max-w-xs mx-auto">
        We couldn't find any flights matching your criteria. Try changing your dates or filters.
      </p>
    </div>
  );
}
