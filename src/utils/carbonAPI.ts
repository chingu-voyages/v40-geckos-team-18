import { env } from '../env/server.mjs';

const carbonHeader = new Headers({
  'Content-type': 'application/json',
  Authorization: `Bearer ${env.CARBON_API_KEY}`,
});

// const carbonFlightUrl = 'https://www.carboninterface.com/api/v1/estimates';

const carbonEstimateUrl =
  env.NODE_ENV === 'development'
    ? 'http://localhost:3456/estimates'
    : `${env.CARBON_BASE_URL}/estimates`;

const carbonVehicleMakeUrl = `${env.CARBON_BASE_URL}/vehicle_makes`;

const carbonVehicleModelUrl = (id: string): string => {
  return `${env.CARBON_BASE_URL}/vehicle_makes/${id}/vehicle_models`;
};

export const carbonEstimateRequest = (body: BodyInit): RequestInfo =>
  new Request(carbonEstimateUrl, {
    method: 'POST',
    headers: carbonHeader,
    body: body,
    mode: 'no-cors',
    cache: 'no-cache',
  });

export const carbonVehicleMakeRequest = (): RequestInfo =>
  new Request(carbonVehicleMakeUrl, {
    method: 'GET',
    headers: carbonHeader,
    mode: 'no-cors',
    cache: 'no-cache',
  });

export const carbonVehicleModelsRequest = (id: string): RequestInfo =>
  new Request(carbonVehicleModelUrl(id), {
    method: 'GET',
    headers: carbonHeader,
    mode: 'no-cors',
    cache: 'no-cache',
  });
