import z from 'zod';

export const unregisteredFlightRequestSchema = z.object({
  passengers: z.number(),
  distance_unit: z.enum(['km', 'mi']),
  legs: z.array(
    z.object({
      departure_airport: z.string().max(3, 'Must enter IATA code (airport code)'),
      destination_airport: z.string().max(3, 'Must enter IATA code (airport code)'),
      cabin_class: z.string()
    })
  ),
});

export type unregisteredFlightRequest = z.TypeOf<typeof unregisteredFlightRequestSchema>
