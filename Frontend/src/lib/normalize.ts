import { Flight } from './types';

// Amadeus Types (Partial)
interface AmadeusResponse {
  data: AmadeusOffer[];
  dictionaries: {
    carriers: Record<string, string>;
    currencies: Record<string, string>;
  };
}

interface AmadeusOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: {
    duration: string;
    segments: {
      departure: { iataCode: string; at: string };
      arrival: { iataCode: string; at: string };
      carrierCode: string;
      number: string;
      numberOfStops: number;
    }[];
  }[];
}

function parseDuration(ptDuration: string): string {
  // ISO 8601 PnYnMnDTnHnMnS -> readable
  // Simple parser for PTXHXM
  const matches = ptDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!matches) return ptDuration;
  const hours = matches[1] ? `${matches[1]}h` : '';
  const minutes = matches[2] ? `${matches[2]}m` : '';
  return `${hours} ${minutes}`.trim();
}

export function normalizeFlightData(response: any): Flight[] {
  const { data, dictionaries } = response as AmadeusResponse;
  
  if (!data || !Array.isArray(data)) return [];

  return data.map((offer) => {
    const itinerary = offer.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    
    // Resolve Airline Name
    const carrierCode = firstSegment.carrierCode;
    const airlineName = dictionaries?.carriers?.[carrierCode] || carrierCode;

    // Calculate total stops (segments - 1)
    const stops = itinerary.segments.length - 1;

    return {
      id: offer.id,
      airline: airlineName,
      flightNumber: `${carrierCode} ${firstSegment.number}`,
      departureAt: firstSegment.departure.at,
      arrivalAt: lastSegment.arrival.at,
      duration: parseDuration(itinerary.duration),
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      stops: stops,
    };
  });
}
