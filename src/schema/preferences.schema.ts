import { z } from 'zod';

export const updateUserLocationSchema = z.object({
  country: z.string(),
  state: z.string().optional(),
});

export const updateUserUnitPreferenceSchema = z.object({
  unitPref: z.enum(['metric', 'imperial']),
});

export const updateUserPrimaryVehicleSchema = z.object({
  primaryVehicleId: z.string(),
});

export type UserLocation = z.TypeOf<typeof updateUserLocationSchema>;

export type UserUnitPreference = z.TypeOf<typeof updateUserUnitPreferenceSchema>

export type UserPrimaryVehicle = z.TypeOf<typeof updateUserPrimaryVehicleSchema>
