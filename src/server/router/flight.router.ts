import { unregisteredFlightRequestSchema } from '../../schema/flight.schema';
import { carbonEstimateRequest } from '../../utils/carbonAPI';
import { createRouter } from './context';

export const flightRouter = createRouter().mutation(
  'unregistered-request-flight',
  {
    input: unregisteredFlightRequestSchema,
    // don't need prisma context
    async resolve({ input }) {
      // call Carbon
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'flight', ...input }))
      );

      // this response is not affected by the transformer attached to tRPC
      return response.json().then((data) => {
        return data.data.attributes;
      });
    },
  }
);
