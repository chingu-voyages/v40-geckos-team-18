import z from 'zod';

const electricityUnitSchema = z.enum(['mwh', 'kwh']);
// Temporary schema while application is limited to just USA and Canada
const countryCodeSchema = z.enum(['us', 'ca']);

export const unregisteredElectricityRequestSchema = z.object({
  electricity_value: z.number(),
  electricity_unit: electricityUnitSchema,
  country: z.string().length(2, 'Must enter country code (ISO 3166 code)'),
  state: z.string().length(2, 'Must enter state code (ISO state code)'),
});

export type ElectricityUnit = z.TypeOf<typeof electricityUnitSchema>;
export type CountryCode = z.TypeOf<typeof countryCodeSchema>;

export type UnregisteredElectricityRequest = z.TypeOf<
  typeof unregisteredElectricityRequestSchema
>;

const electricityResponseUnique = z.object({
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
});

const electricityResponseSchema = unregisteredElectricityRequestSchema.merge(
  electricityResponseUnique
);

export type ElectricityResponse = z.TypeOf<typeof electricityResponseSchema>;
