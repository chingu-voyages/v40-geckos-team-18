import { createRouter } from './context';
import { unregisteredFuelRequestSchema } from '../../schema/fuel.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';

export const fuelRouter = createRouter().mutation('unregistered-request-fuel', {
  input: unregisteredFuelRequestSchema,
  async resolve({ input }) {
    const response = await fetch(
      carbonEstimateRequest(
        JSON.stringify({ type: 'fuel_combustion', ...input })
      )
    );

    return response.json().then((data) => {
      return data.data.attributes;
    });
  },
});
