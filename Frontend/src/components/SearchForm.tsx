'use client';

import { useState } from 'react';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { AIRPORTS } from '@/lib/airports';

interface SearchFormProps {
  onSearch: (params: { origin: string; destination: string; date: string; passengers: number }) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LHR');
  const [date, setDate] = useState('2026-03-01');
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ origin, destination, date, passengers });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col lg:flex-row gap-4 p-6 bg-white shadow-2xl shadow-emerald-900/20 rounded-3xl border border-white/50 relative overflow-hidden"
    >
      <datalist id="airports">
        {AIRPORTS.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.name} ({airport.city})
          </option>
        ))}
      </datalist>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Origin */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-emerald-800/60 ml-11 mb-1 uppercase tracking-wider">From</label>
            <input 
              list="airports"
              type="text" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className="pl-11 block w-full rounded-2xl border-emerald-100/50 bg-emerald-50/30 border focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:text-sm py-3 transition-all font-medium text-gray-800 placeholder:text-gray-400"
              placeholder="Origin"
              maxLength={3}
              required
            />
          </div>
        </div>

        {/* Destination */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-emerald-800/60 ml-11 mb-1 uppercase tracking-wider">To</label>
            <input 
              list="airports"
              type="text" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="pl-11 block w-full rounded-2xl border-emerald-100/50 bg-emerald-50/30 border focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:text-sm py-3 transition-all font-medium text-gray-800 placeholder:text-gray-400"
              placeholder="Destination"
              maxLength={3}
              required
            />
          </div>
        </div>

        {/* Date */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-emerald-800/60 ml-11 mb-1 uppercase tracking-wider">Depart</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="pl-11 block w-full rounded-2xl border-emerald-100/50 bg-emerald-50/30 border focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:text-sm py-3 transition-all font-medium text-gray-800"
              required
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-emerald-800/60 ml-11 mb-1 uppercase tracking-wider">Travelers</label>
            <input 
              type="number" 
              value={passengers} 
              onChange={(e) => setPassengers(Number(e.target.value))}
              min={1} max={9}
              className="pl-11 block w-full rounded-2xl border-emerald-100/50 bg-emerald-50/30 border focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:text-sm py-3 transition-all font-medium text-gray-800"
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 lg:mt-0 w-full lg:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 transition-all font-bold flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>Search</span>
          </>
        )}
      </button>
    </form>
  );
}
