import { createRouter } from './context';
import { unregisteredVehicleRequestSchema } from '../../schema/vehicle.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';

export const vehicleRouter = createRouter().mutation(
  'unregistered-request-vehicle',
  {
    input: unregisteredVehicleRequestSchema,
    async resolve({ input }) {
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'vehicle', ...input }))
      );

      return response.json().then((data) => {
        return data.data.attributes;
      });
    },
  }
);
