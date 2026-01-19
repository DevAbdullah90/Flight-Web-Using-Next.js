import { Flight } from '@/lib/types';
import { ArrowRight, Plane, Clock, Briefcase } from 'lucide-react';
import { Button } from './ui/Button';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const depTime = new Date(flight.departureAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const arrTime = new Date(flight.arrivalAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const airlineCode = flight.airline.substring(0, 2).toUpperCase();
  const depCityCode = "DAC"; // Ideally this comes from flight data
  const arrCityCode = "CXB"; // Ideally this comes from flight data

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-flight-primary/10 hover:border-flight-primary/20 transition-all duration-300 overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row gap-6 items-center">

        {/* Airline Info */}
        <div className="flex items-center gap-4 w-full md:w-[25%]">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-flight-primary font-black text-sm border border-slate-100">
            {/* Fallback logo logic */}
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{flight.airline}</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wide">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Flight Timeline */}
        <div className="flex-1 flex flex-col items-center justify-center w-full md:w-[45%] px-2">
          <div className="flex items-center justify-between w-full text-slate-900 mb-2">
            <div>
              <span className="text-xl font-bold block leading-none">{depTime}</span>
              <span className="text-xs text-slate-400 font-medium">{depCityCode}</span>
            </div>

            <div className="flex flex-col items-center gap-1 flex-1 px-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{flight.duration}</span>
              <div className="w-full h-[2px] bg-slate-100 relative rounded-full">
                <div className="absolute inset-y-0 left-0 right-0 bg-slate-200 w-full" />
                {/* Plane icon moving across? For now static center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-300 p-0.5 rounded-full border border-slate-200">
                  <Plane className="w-3 h-3 rotate-90" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-500">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xl font-bold block leading-none">{arrTime}</span>
              <span className="text-xs text-slate-400 font-medium">{arrCityCode}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="w-full md:w-[30%] flex flex-row md:flex-col justify-between items-center md:items-end gap-3 pl-4 md:border-l border-slate-50">
          <div className="text-right">
            <span className="text-xs font-medium text-slate-400 block mb-0.5">Price</span>
            <span className="text-2xl font-black text-flight-primary tracking-tight">
              {flight.currency} {flight.price.toFixed(0)}
            </span>
          </div>
          <Button className="w-full md:w-auto font-bold rounded-xl shadow-md shadow-flight-primary/20">
            Select Flight
          </Button>
        </div>

      </div>

      {/* Collapsible details footer (optional, keeping clean for now) */}
      <div className="bg-slate-50/50 border-t border-slate-100 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Baggage: 20kg</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Check-in: 24h before</span>
        </div>
        <button className="font-semibold text-flight-primary hover:underline">Flight Details</button>
      </div>
    </div>
  );
}
