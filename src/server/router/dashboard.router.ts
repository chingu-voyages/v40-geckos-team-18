import { summarySchema, SummaryResponseType } from '../../schema/dashboard.schema';
import { createRouter } from './context';

export const dashboardRouter = createRouter().query('summary', {
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
});
