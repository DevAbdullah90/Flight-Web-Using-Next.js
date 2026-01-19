import { Flight, TIME_RANGES, TimeRange } from './types';

export interface PriceBucket {
  name: string;
  minPrice: number | null;
  count: number;
}

export function aggregatePriceBuckets(flights: Flight[]): PriceBucket[] {
  // Initialize buckets
  const buckets: Record<TimeRange, { min: number; count: number }> = {
    'Early Morning': { min: Infinity, count: 0 },
    'Morning': { min: Infinity, count: 0 },
    'Afternoon': { min: Infinity, count: 0 },
    'Evening': { min: Infinity, count: 0 },
  };

  flights.forEach((flight) => {
    const hour = new Date(flight.departureAt).getHours();
    
    // Find bucket
    const rangeName = Object.entries(TIME_RANGES).find(
      ([_, range]) => hour >= range.start && hour < range.end
    )?.[0] as TimeRange;

    if (rangeName) {
      buckets[rangeName].count++;
      buckets[rangeName].min = Math.min(buckets[rangeName].min, flight.price);
    }
  });

  return Object.entries(buckets).map(([name, data]) => ({
    name,
    minPrice: data.count > 0 ? data.min : null,
    count: data.count,
  }));
}
