import { Flight } from '@/lib/types';
import { FlightCard } from './FlightCard';
import { FlightCardSkeleton } from './ui/Skeleton';

interface ResultsListProps {
  flights: Flight[];
  isLoading: boolean;
}

export function ResultsList({ flights, isLoading }: ResultsListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <FlightCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Note: Parent component handles "No flights" empty state now via EmptyStateIllustration

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center pb-4 px-1">
        <h2 className="text-slate-600 font-medium">
          Found <span className="font-bold text-slate-900">{flights.length}</span> results
        </h2>
        <div className="text-sm text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          Sorted by: <span className="font-bold text-flight-primary">Recommended</span>
        </div>
      </div>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}