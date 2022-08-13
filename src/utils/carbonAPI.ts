import { env } from '../env/server.mjs';

const carbonHeader = new Headers({
  'Content-type': 'application/json',
  'Authorization': `Bearer ${env.CARBON_API_KEY}`
});

const carbonFlightUrl = 'https://www.carboninterface.com/api/v1/estimates';

export const carbonFlightRequest = (body: BodyInit): RequestInfo =>
  new Request(carbonFlightUrl, {
    method: 'POST',
    headers: carbonHeader,
    body: body,
    mode: 'no-cors',
    cache: 'no-cache',
  });
