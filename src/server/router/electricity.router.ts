import { createRouter } from './context';
import {
  electricityRequestSchema,
  ElectricityResponse,
} from '../../schema/electricity.schema';
import { carbonEstimateRequest } from '../../utils/apiHelpers';

export const electricityRouter = createRouter().mutation(
  'calculation-request',
  {
    input: electricityRequestSchema,

    async resolve({ input, ctx }) {
      const user = ctx.session?.user;
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'electricity', ...input }))
      );

      let carbonResponse: ElectricityResponse = await response
        .json()
        .then((data) => {
          return data.data.attributes;
        });

      if (user) {
        await ctx.prisma.electricityUse.create({
          data: {
            userId: user.id,
            electricity_value: carbonResponse.electricity_value,
            electricity_unit: carbonResponse.electricity_unit,
            estimated_at: carbonResponse.estimated_at,
            carbon_g: carbonResponse.carbon_g,
          },
        });
      }
      return carbonResponse;
    },
  }
);
