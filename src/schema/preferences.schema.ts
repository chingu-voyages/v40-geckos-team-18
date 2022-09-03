import { z } from 'zod';

export const locationInputSchema = z.object({
  country: z.string(),
  state: z.string().optional(),
});

export type LocationInputType = z.TypeOf<typeof locationInputSchema>;
