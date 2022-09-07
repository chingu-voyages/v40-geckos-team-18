import {
  FlightLeg,
  FlightResponse,
  flightRequestSchema,
} from '../../schema/flight.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';
import { createRouter } from './context';

export const flightRouter = createRouter().mutation('calculation-request', {
  input: flightRequestSchema,
  // don't need prisma context
  async resolve({ input, ctx }) {
    const user = ctx.session?.user;
    // call Carbon
    const response = await fetch(
      carbonEstimateRequest(JSON.stringify({ type: 'flight', ...input }))
    );

    // this response is not affected by the transformer attached to tRPC
    let carbonResponse: FlightResponse = await response.json().then((data) => {
      return data.data.attributes;
    });

    if (user) {
      await ctx.prisma.flight.create({
        data: {
          userId: user.id,
          passengers: input.passengers,
          estimated_at: carbonResponse.estimated_at,
          carbon_g: carbonResponse.carbon_g,
          distance_value: carbonResponse.distance_value,
          distance_unit: carbonResponse.distance_unit,
          flightLeg: {
            createMany: {
              data: carbonResponse.legs.map((leg: FlightLeg, index: number) => {
                return {
                  ...leg,
                  legNumber: index + 1,
                };
              }),
            },
          },
        },
      });
    }
    return carbonResponse;
  },
});
