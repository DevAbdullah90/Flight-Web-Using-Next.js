'use client';

import { useFlightStore } from '@/store/useFlightStore';
import { TIME_RANGES } from '@/lib/types';
import { Check, User, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';

export function FilterSidebar() {
  const { filters, setFilter, rawFlights } = useFlightStore();
  const availableAirlines = Array.from(new Set(rawFlights.map((f) => f.airline))).sort();

  const toggleAirline = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    setFilter('airlines', newAirlines);
  };

  const toggleTime = (time: string) => {
    const newTimes = filters.timeRanges.includes(time)
      ? filters.timeRanges.filter((t) => t !== time)
      : [...filters.timeRanges, time];
    setFilter('timeRanges', newTimes);
  };

  const toggleStop = (stop: number) => {
    const newStops = filters.stops.includes(stop)
      ? filters.stops.filter((s) => s !== stop)
      : [...filters.stops, stop];
    setFilter('stops', newStops);
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-white/60 space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-flight-primary/10 rounded-lg text-flight-primary">
            <Filter className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-slate-800 text-lg">Filters</h2>
        </div>
        <button
          onClick={() => {
            setFilter('maxPrice', 10000);
            setFilter('stops', []);
            setFilter('airlines', []);
            setFilter('timeRanges', []);
          }}
          className="text-xs font-bold text-flight-primary hover:text-flight-primary/80 hover:underline uppercase tracking-wide"
        >
          Reset
        </button>
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
          <span className="text-xl font-bold text-slate-900">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-flight-primary hover:accent-blue-600 transition-all"
        />
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Stops Filter */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stops</label>
        <div className="space-y-2">
          {[0, 1, 2].map((stop) => {
            const isChecked = filters.stops.includes(stop);
            return (
              <label key={stop} className="flex items-center group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors -mx-2">
                <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all", isChecked ? 'bg-flight-primary border-flight-primary' : 'bg-white border-slate-200 group-hover:border-flight-primary/50')}>
                  {isChecked && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => toggleStop(stop)}
                />
                <span className={cn("ml-3 text-sm font-medium transition-colors", isChecked ? 'text-slate-900' : 'text-slate-600')}>
                  {stop === 0 ? 'Direct only' : stop === 1 ? '1 Stop' : '2+ Stops'}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Time Filter */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Departure Time</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(TIME_RANGES).map((time) => (
            <button
              key={time}
              onClick={() => toggleTime(time)}
              className={cn("px-3 py-2.5 text-xs font-bold rounded-xl border transition-all",
                filters.timeRanges.includes(time)
                  ? 'bg-flight-primary/10 border-flight-primary/20 text-flight-primary'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-flight-primary/30 hover:text-flight-primary'
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Airlines Filter */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Airlines</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {availableAirlines.map((airline) => {
            const isChecked = filters.airlines.includes(airline);
            return (
              <label key={airline} className="flex items-center group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors -mx-2">
                <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0", isChecked ? 'bg-flight-primary border-flight-primary' : 'bg-white border-slate-200 group-hover:border-flight-primary/50')}>
                  {isChecked && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => toggleAirline(airline)}
                />
                <span className={cn("ml-3 text-sm font-medium truncate transition-colors", isChecked ? 'text-slate-900' : 'text-slate-600')}>
                  {airline}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
