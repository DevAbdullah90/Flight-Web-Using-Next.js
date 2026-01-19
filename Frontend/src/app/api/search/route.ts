import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAmadeusToken } from '@/lib/amadeus';
import { normalizeFlightData } from '@/lib/normalize';
import { config } from '@/lib/config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || '1';

  if (!origin || !destination || !date) {
    return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
  }

  try {
    const token = await getAmadeusToken();
    
    const response = await axios.get(`${config.amadeus.baseUrl}/v2/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: passengers,
        max: 50 // Limit for performance
      }
    });

    const normalized = normalizeFlightData(response.data);
    return NextResponse.json(normalized);

  } catch (error: any) {
    console.error('Search API Error', error?.response?.data || error.message);
    return NextResponse.json(
      { error: error?.response?.data?.errors?.[0]?.detail || 'Failed to fetch flights' },
      { status: 500 }
    );
  }
}
