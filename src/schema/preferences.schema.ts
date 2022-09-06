import { z } from 'zod';

export const updateUserLocationSchema = z.object({
  country: z.string(),
  state: z.string().optional(),
});

export const updateUserUnitPreferenceSchema = z.enum(['metric', 'imperial']);

export const updateUserPrimaryVehicleSchema = z.object({
  primaryVehicleId: z.string(),
});

export const addNewVehicleSchema = z.object({
  vehicle_make: z.string(),
  vehicle_model: z.string(),
  vehicle_year: z.number(),
  vehicle_model_id: z.string(),
});

export const vehicleSchema = addNewVehicleSchema.merge(
  z.object({
    id: z.string(),
  })
);

export type Vehicle = z.TypeOf<typeof vehicleSchema>;

export const removeVehicleSchema = z.string();

export type UserLocation = z.TypeOf<typeof updateUserLocationSchema>;

export type UserUnitPreference = z.TypeOf<
  typeof updateUserUnitPreferenceSchema
>;

export type UserPrimaryVehicle = z.TypeOf<
  typeof updateUserPrimaryVehicleSchema
>;
