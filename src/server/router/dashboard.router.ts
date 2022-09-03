import { createRouter } from './context';

export const dashboardRouter = createRouter().query('summary', {
  async resolve({ ctx }) {
    const user = ctx.session?.user;

    if (user) {
      const electricityCarbon = ctx.prisma.electricityUse.findMany({
        select: {
          carbon_g: true,
          estimatedAt: true,
        },
        where: {
          userId: user.id,
        },
      });

      const vehicleCarbon = ctx.prisma.vehicle.findMany({
        select: {
          trips: {
            select: {
              carbon_g: true,
              estimatedAt: true,
            },
          },
        },
        where: {
          userId: user.id,
        },
      });

      const fuelCarbon = ctx.prisma.fuelUsed.findMany({
        select: {
          carbon_g: true,
          estimatedAt: true,
        },
      });

      const flightCarbon = ctx.prisma.flight.findMany({
        select: {
          carbon_g: true,
          estimatedAt: true,
        },
      });

      return { electricityCarbon, vehicleCarbon, fuelCarbon, flightCarbon };
    }

    return {};
  },
});
