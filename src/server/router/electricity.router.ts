import { createRouter } from './context';
import { unregisteredElectricityRequestSchema } from '../../schema/electricity.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';

export const electricityRouter = createRouter().mutation(
  'unregistered-request-electricity',
  {
    input: unregisteredElectricityRequestSchema,
    async resolve({ input }) {
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'electricity', ...input }))
      );

      return response.json().then((data) => {
        return data.data.attributes;
      });
    },
  }
);
