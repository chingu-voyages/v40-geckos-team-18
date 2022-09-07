import z from 'zod';

export const summarySchema = z.array(
  z.object({ type: z.string(), emissions: z.number() })
);

const electricityDataSchema = z.object({
  electricity_value: z.number(),
  electricity_unit: z.string(),
  carbon_g: z.number(),
  estimated_at: z.date(),
  id: z.string(),
});

export const electricityDataArraySchema = z.array(electricityDataSchema);

export type ElectricityData = z.TypeOf<typeof electricityDataSchema>;
