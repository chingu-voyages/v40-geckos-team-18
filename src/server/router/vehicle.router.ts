import { createRouter } from './context';
import z from 'zod';
import {
  vehicleRequestSchema,
  VehicleMakeDataResponse,
  VehicleMakeSearch,
  VehicleModelDataResponse,
  VehicleModelSearch,
  VehicleResponse,
} from '../../schema/vehicle.schema';
import {
  carbonEstimateRequest,
  carbonVehicleMakeRequest,
  carbonVehicleModelsRequest,
} from '../../utils/apiHelpers';

export const vehicleRouter = createRouter()
  .mutation('calculation-request', {
    input: vehicleRequestSchema,
    async resolve({ input, ctx }) {
      const user = ctx.session?.user;
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'vehicle', ...input }))
      );

      let carbonResponse: VehicleResponse = await response
        .json()
        .then((data) => {
          return data.data.attributes;
        });

      if (user) {
        const getSelectedVehicle = await ctx.prisma.vehicle
          .findFirst({
            where: {
              userId: user.id,
              AND: [{ vehicle_model_id: input.vehicle_model_id }],
            },
            select: { id: true },
          })
          .then((response) => response);

        if (getSelectedVehicle) {
          await ctx.prisma.trip.create({
            data: {
              vehicleId: getSelectedVehicle.id,
              distance_value: carbonResponse.distance_value,
              distance_unit: carbonResponse.distance_unit,
              estimated_at: carbonResponse.estimated_at,
              carbon_g: carbonResponse.carbon_g,
            },
          });
        } else {
          await ctx.prisma.vehicle
            .create({
              data: {
                userId: user.id,
                vehicle_make: carbonResponse.vehicle_make,
                vehicle_model: carbonResponse.vehicle_model,
                vehicle_year: carbonResponse.vehicle_year,
                vehicle_model_id: input.vehicle_model_id,
                trips: {
                  create: {
                    distance_value: carbonResponse.distance_value,
                    distance_unit: carbonResponse.distance_unit,
                    estimated_at: carbonResponse.estimated_at,
                    carbon_g: carbonResponse.carbon_g,
                  },
                },
              },
              include: { trips: true },
            })
            .catch((e) => console.error(e));
        }
      }
      return carbonResponse;
    },
  })
  .query('get-vehicle-makes', {
    async resolve() {
      const response = await fetch(carbonVehicleMakeRequest());
      let vehicleOptions: VehicleMakeSearch[] = [];

      return response.json().then((data) => {
        const vehicles = data as VehicleMakeDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleMakeDataResponse) => {
          return { name: vehicle.data.attributes.name, value: vehicle.data.id };
        });
        return vehicleOptions;
      });
    },
  })
  .query('get-vehicle-models', {
    input: z.string(),
    async resolve({ input }) {
      const response = await fetch(
        // Query keeps firing on component load so added a fallback value to keep from getting invalid input errors
        carbonVehicleModelsRequest(
          input ? input : '4c1e16e1-7967-4394-b3cb-15f4577dffa1'
        )
      );
      let vehicleOptions: VehicleModelSearch[] = [];

      return response.json().then((data) => {
        const vehicles = data as VehicleModelDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleModelDataResponse) => {
          const vehicleYearAndName = [
            vehicle.data.attributes.year,
            vehicle.data.attributes.name,
          ].join(' ');
          return { name: vehicleYearAndName, value: vehicle.data.id };
        });
        return vehicleOptions;
      });
    },
  });
