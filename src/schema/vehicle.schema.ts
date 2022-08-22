import z from 'zod';

const distanceUnitSchema = z.enum(['mi', 'km']);

export const unregisteredVehicleRequestSchema = z.object({
  distance_unit: distanceUnitSchema,
  distance_value: z.number(),
  vehicle_model_id: z.string(),
});

export type DistanceUnit = z.TypeOf<typeof distanceUnitSchema>;

export type UnregisteredVehicleRequest = z.TypeOf<
  typeof unregisteredVehicleRequestSchema
>;

const vehicleResponseUnique = z.object({
  vehicle_make: z.string(),
  vehicle_model: z.string(),
  vehicle_year: z.number(),
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
});

const vehicleResponseSchema = unregisteredVehicleRequestSchema.merge(
  vehicleResponseUnique
);

export type VehicleResponse = z.TypeOf<typeof vehicleResponseSchema>;
