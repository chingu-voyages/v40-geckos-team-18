import z from 'zod';

const cabinClassSchema = z.enum(['economy', 'premium']);

const flightLegAirportSchema = z
  .string()
  .length(3, 'Must enter IATA code (airport code)');

const flightLegSchema = z.object({
  departure_airport: flightLegAirportSchema,
  destination_airport: flightLegAirportSchema,
  cabin_class: cabinClassSchema,
});

const distanceUnitSchema = z.enum(['km', 'mi']);

export const flightRequestSchema = z.object({
  passengers: z.number(),
  distance_unit: distanceUnitSchema,
  legs: z.array(flightLegSchema),
});

export type CabinClass = z.TypeOf<typeof cabinClassSchema>;
export type FlightLeg = z.TypeOf<typeof flightLegSchema>;

export type DistanceUnit = z.TypeOf<typeof distanceUnitSchema>;

export type FlightRequest = z.TypeOf<typeof flightRequestSchema>;

const flightResponseUnqiue = z.object({
  distance_value: z.number(),
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
});

const flightResponseSchema = flightRequestSchema.merge(flightResponseUnqiue);

export type FlightResponse = z.TypeOf<typeof flightResponseSchema>;
