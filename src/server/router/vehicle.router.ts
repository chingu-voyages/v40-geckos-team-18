import { createRouter } from './context';
import z from 'zod';
import { unregisteredVehicleRequestSchema, VehicleMakeDataResponse, VehicleMakeSearch, VehicleModelDataResponse, VehicleModelSearch } from '../../schema/vehicle.schema';
import { carbonEstimateRequest, carbonVehicleMakeRequest, carbonVehicleModelsRequest } from '../../utils/apiHelpers';


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
)
.query(
  'request-vehicle-make',
  {
    async resolve() {
      const response = await fetch(
        carbonVehicleMakeRequest()
      );
      let vehicleOptions: VehicleMakeSearch[] = []

      return response.json().then((data) => {
        const vehicles = data as VehicleMakeDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleMakeDataResponse) => {
          return {name: vehicle.data.attributes.name, value: vehicle.data.id}
        })
        return vehicleOptions;
      }
      )
    }
  }
)
.query(
  'request-vehicle-model',
  {
    input: z.string(),
    async resolve({input}) {
      const response = await fetch(
        // Query keeps firing on component load so added a fallback value to keep from getting invalid input errors
        carbonVehicleModelsRequest(input ? input : '4c1e16e1-7967-4394-b3cb-15f4577dffa1')
      );
      let vehicleOptions: VehicleModelSearch[] = []

      return response.json().then((data) => {
        const vehicles = data as VehicleModelDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleModelDataResponse) => {
          const vehicleYearAndName = [vehicle.data.attributes.year, vehicle.data.attributes.name].join(' ');
          return {name: vehicleYearAndName, value: vehicle.data.id}
        })
        return vehicleOptions;
      }
      )
    }
  }
)
