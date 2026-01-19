export const config = {
  amadeus: {
    clientId: process.env.AMADEUS_CLIENT_ID || '',
    clientSecret: process.env.AMADEUS_CLIENT_SECRET || '',
    env: process.env.AMADEUS_ENV || 'test',
    baseUrl: process.env.AMADEUS_ENV === 'production' 
      ? 'https://api.amadeus.com' 
      : 'https://test.api.amadeus.com',
  },
};
