import { createRouter } from './context';
import {
  FuelResponse,
  unregisteredFuelRequestSchema,
} from '../../schema/fuel.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';

export const fuelRouter = createRouter().mutation('unregistered-request-fuel', {
  input: unregisteredFuelRequestSchema,
  async resolve({ input, ctx }) {
    const user = ctx.session?.user;
    const response = await fetch(
      carbonEstimateRequest(
        JSON.stringify({ type: 'fuel_combustion', ...input })
      )
    );

    let carbonResponse: FuelResponse = await response.json().then((data) => {
      return data.data.attributes;
    });

    if (user) {
      await ctx.prisma.fuelUsed.create({
        data: {
          userId: user.id,
          fuel_source_type: carbonResponse.fuel_source_type,
          fuel_source_unit: carbonResponse.fuel_source_unit,
          fuel_source_value: carbonResponse.fuel_source_value,
          carbon_g: carbonResponse.carbon_g,
          estimated_at: carbonResponse.estimated_at,
        },
      });
    }
    return carbonResponse;
  },
});
