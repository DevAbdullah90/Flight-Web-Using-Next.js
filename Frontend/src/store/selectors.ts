import { Flight, FilterState, TIME_RANGES, TimeRange } from '@/lib/types';

export const selectFilteredFlights = (flights: Flight[], filters: FilterState): Flight[] => {
  return flights.filter((flight) => {
    // 1. Price
    if (flight.price < filters.minPrice || flight.price > filters.maxPrice) return false;

    // 2. Airline
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;

    // 3. Stops
    if (filters.stops.length > 0 && !filters.stops.includes(flight.stops)) return false;

    // 4. Time Ranges
    if (filters.timeRanges.length > 0) {
      const depHour = new Date(flight.departureAt).getHours();
      const inRange = filters.timeRanges.some((rangeName) => {
        const range = TIME_RANGES[rangeName as TimeRange];
        return depHour >= range.start && depHour < range.end;
      });
      if (!inRange) return false;
    }

    return true;
  });
};
