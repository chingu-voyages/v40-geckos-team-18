import { summarySchema } from '../../schema/dashboard.schema';
import { createRouter } from './context';

export const dashboardRouter = createRouter()
  .query('summary', {
    output: summarySchema,
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const electricityCarbon = await ctx.prisma.electricityUse
          .aggregate({
            _sum: {
              carbon_g: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response._sum.carbon_g);

        const vehicleCarbon = await ctx.prisma.vehicle
          .findMany({
            select: {
              trips: {
                select: {
                  carbon_g: true,
                },
              },
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) =>
            response.reduce((previous, current) => {
              return (
                previous +
                current.trips.reduce((previous, current) => {
                  return previous + current.carbon_g;
                }, 0)
              );
            }, 0)
          );

        const fuelCarbon = await ctx.prisma.fuelUsed
          .aggregate({
            _sum: {
              carbon_g: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response._sum.carbon_g);

        const flightCarbon = await ctx.prisma.flight
          .aggregate({
            _sum: {
              carbon_g: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response._sum.carbon_g);

        return [
          { type: 'Electricity', emissions: electricityCarbon ?? 0 },
          { type: 'Driving', emissions: vehicleCarbon ?? 0 },
          { type: 'Fuel', emissions: fuelCarbon ?? 0 },
          { type: 'Flight', emissions: flightCarbon ?? 0 },
        ];
      }

      return [];
    },
  })
  .query('get-fuel-data', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const fuelRecords = await ctx.prisma.fuelUsed
          .findMany({
            select: {
              id: true,
              fuel_source_type: true,
              fuel_source_unit: true,
              fuel_source_value: true,
              carbon_g: true,
              estimated_at: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response);

        return fuelRecords;
      }
    },
  })
  .query('get-electicity-data', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const electricityRecords = await ctx.prisma.electricityUse
          .findMany({
            select: {
              id: true,
              electricity_unit: true,
              electricity_value: true,
              carbon_g: true,
              estimated_at: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response);

        return electricityRecords;
      }
    },
  })
  .query('get-flight-data', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const flightRecords = await ctx.prisma.flight
          .findMany({
            select: {
              id: true,
              passengers: true,
              distance_value: true,
              distance_unit: true,
              carbon_g: true,
              estimated_at: true,
              flightLeg: {
                select: {
                  id: true,
                  departure_airport: true,
                  destination_airport: true,
                  cabin_class: true,
                  legNumber: true,
                },
              },
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response);

        return flightRecords;
      }
    },
  })
  .query('get-vehicle-trip-data', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const vehicleTripRecords = await ctx.prisma.vehicle
          .findMany({
            select: {
              id: true,
              vehicle_make: true,
              vehicle_model: true,
              vehicle_year: true,
              trips: {
                select: {
                  id: true,
                  distance_value: true,
                  distance_unit: true,
                  carbon_g: true,
                  estimated_at: true,
                },
              },
            },
          })
          .then((response) => response);

        return vehicleTripRecords;
      }
    },
  });
