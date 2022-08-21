import z from 'zod';

/* Current fuel source types covered in schema along with corresponding units for each type:
> Home Heating and Diesel Fuel (Distillate) ~ type_api_name: dfo, units: gallon, btu
> Natural Gas ~ type_api_name: ng, units: thousand_cubic_feet, btu
> Propane Gas ~ type_api_name: pg, units: gallon, btu
> Kerosene ~ type_api_name: ker, units: gallon, btu
*/

const fuelSourceUnitSchema = z.enum(['gallon', 'btu', 'thousand_cubic_feet']);
const fuelSourceTypeSchema = z.enum(['dfo', 'ng', 'pg', 'ker']);

export const unregisteredFuelRequestSchema = z.object({
  fuel_source_type: fuelSourceTypeSchema,
  fuel_source_unit: fuelSourceUnitSchema,
  fuel_source_value: z.number(),
});

export type fuelSourceUnit = z.TypeOf<typeof fuelSourceUnitSchema>;
export type fuelSourceType = z.TypeOf<typeof fuelSourceTypeSchema>;

export type UnregisteredFuelRequest = z.TypeOf<
  typeof unregisteredFuelRequestSchema
>;

const fuelResponseUnique = z.object({
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
});

const fuelResponseSchema =
  unregisteredFuelRequestSchema.merge(fuelResponseUnique);

export type FuelResponse = z.TypeOf<typeof fuelResponseSchema>;
