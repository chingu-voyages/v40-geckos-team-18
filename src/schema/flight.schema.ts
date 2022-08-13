import z from 'zod';

const FlightLegSchema = z.object({
  departure_airport: z
    .string()
    .length(3, 'Must enter IATA code (airport code)'),
  destination_airport: z
    .string()
    .length(3, 'Must enter IATA code (airport code)'),
  cabin_class: z.string(),
});

const distanceUnitSchema = z.enum(['km', 'mi'])

export const unregisteredFlightRequestSchema = z.object({
  passengers: z.number(),
  distance_unit: distanceUnitSchema,
  legs: z.array(
    FlightLegSchema
  ),
});

export type FlightLeg = z.TypeOf<typeof FlightLegSchema>

export type DistanceUnit = z.TypeOf<typeof distanceUnitSchema>
