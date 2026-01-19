import axios from 'axios';
import { config } from './config';

let token: string | null = null;
let tokenExpiresAt = 0;

export async function getAmadeusToken() {
  const now = Date.now();
  if (token && now < tokenExpiresAt) {
    return token;
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', config.amadeus.clientId);
    params.append('client_secret', config.amadeus.clientSecret);

    const res = await axios.post(`${config.amadeus.baseUrl}/v1/security/oauth2/token`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    token = res.data.access_token;
    // Expires in 1799 seconds usually
    tokenExpiresAt = now + (res.data.expires_in * 1000) - 10000; 
    return token;
  } catch (error) {
    console.error('Amadeus Auth Failed', error);
    throw new Error('Failed to authenticate with Amadeus');
  }
}
