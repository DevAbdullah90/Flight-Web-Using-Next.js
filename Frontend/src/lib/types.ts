export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureAt: string; // ISO
  arrivalAt: string; // ISO
  duration: string; // Formatted
  price: number;
  currency: string;
  stops: number;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  airlines: string[]; // Selected airline names
  stops: number[]; // 0, 1, 2+
  timeRanges: string[]; // Morning, Afternoon, Evening, Early Morning
}

export type TimeRange = 'Early Morning' | 'Morning' | 'Afternoon' | 'Evening';

export const TIME_RANGES: Record<TimeRange, { start: number; end: number }> = {
  'Early Morning': { start: 0, end: 6 },
  'Morning': { start: 6, end: 12 },
  'Afternoon': { start: 12, end: 18 },
  'Evening': { start: 18, end: 24 },
};

export type ChatRole = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: number;
}
