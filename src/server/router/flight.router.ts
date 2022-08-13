import { unregisteredFlightRequestSchema } from '../../schema/flight.schema';
import { carbonFlightRequest } from '../../utils/carbonAPI';
import { createRouter } from './context';

export const flightRouter = createRouter().mutation(
  'unregistered-request-flight',
  {
    input: unregisteredFlightRequestSchema,
    // don't need prisma context
    async resolve({ input }) {
      // call Carbon
      const response = await fetch(
        carbonFlightRequest(JSON.stringify({ type: 'flight', ...input }))
      );

      return response.json().then((data) => {
        return data.data.attributes;
      });
    },
  }
);
