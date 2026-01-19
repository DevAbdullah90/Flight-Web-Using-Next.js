'use client';

import { Flight } from '@/lib/types';
import { aggregatePriceBuckets } from '@/lib/analytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';

interface PriceGraphProps {
  flights: Flight[];
}

export function PriceGraph({ flights }: PriceGraphProps) {
  const data = aggregatePriceBuckets(flights);

  if (flights.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 h-72">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-flight-primary rounded-full" />
        Price Trends
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickFormatter={(val) => `$${val}`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number | undefined) => [value !== undefined ? `$${value.toFixed(2)}` : 'N/A', 'Lowest Price']}
            labelStyle={{ color: '#1e293b', fontWeight: 600, marginBottom: '4px' }}
          />
          <Line
            type="monotone"
            dataKey="minPrice"
            stroke="var(--flight-primary)"
            strokeWidth={3}
            dot={{ r: 4, fill: 'var(--flight-primary)', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
