import z from 'zod';

const cabinClassSchema = z.enum(['economy', 'premium'])
const flightLegSchema = z.object({
  departure_airport: z
    .string()
    .length(3, 'Must enter IATA code (airport code)'),
  destination_airport: z
    .string()
    .length(3, 'Must enter IATA code (airport code)'),
  cabin_class: cabinClassSchema,
});

const distanceUnitSchema = z.enum(['km', 'mi'])

export const unregisteredFlightRequestSchema = z.object({
  passengers: z.number(),
  distance_unit: distanceUnitSchema,
  legs: z.array(
    flightLegSchema
  ),
});

export type CabinClass = z.TypeOf<typeof cabinClassSchema>
export type FlightLeg = z.TypeOf<typeof flightLegSchema>

export type DistanceUnit = z.TypeOf<typeof distanceUnitSchema>

export type UnregisteredFlightRequest = z.TypeOf<typeof unregisteredFlightRequestSchema>

const flightResponseUnqiue = z.object({
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
})

const flightResponseSchema = unregisteredFlightRequestSchema.merge(flightResponseUnqiue)

export type FlightResponse = z.TypeOf<typeof flightResponseSchema>