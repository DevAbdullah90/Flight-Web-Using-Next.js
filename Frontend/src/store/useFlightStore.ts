import { create } from 'zustand';
import { Flight, FilterState } from '@/lib/types';

interface FlightStore {
  rawFlights: Flight[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  
  setFlights: (flights: Flight[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  startSearch: () => void;
}

const initialFilters: FilterState = {
  minPrice: 0,
  maxPrice: 10000,
  airlines: [],
  stops: [],
  timeRanges: [],
};

export const useFlightStore = create<FlightStore>((set) => ({
  rawFlights: [],
  filters: initialFilters,
  isLoading: false,
  error: null,

  setFlights: (flights) => set({ rawFlights: flights, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  resetFilters: () => set({ filters: initialFilters }),
  startSearch: () => set({ isLoading: true, error: null }),
}));
