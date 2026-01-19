import axios from 'axios';
import { Flight } from './types';

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers?: number;
}

export async function fetchFlights(params: SearchParams): Promise<Flight[]> {
  const { data } = await axios.get('/api/search', { params });
  return data;
}

export async function sendChatQuery(query: string): Promise<string> {
  try {
    const { data } = await axios.post('https://abdullah9873-flight-backend-mcp.hf.space/query', { query });
    
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      return data.response || data.answer || data.message || data.result || JSON.stringify(data);
    }
    return "I'm sorry, I couldn't understand the response.";
  } catch (error) {
    console.error('Chat API Error:', error);
    throw new Error('Failed to fetch chat response');
  }
}
