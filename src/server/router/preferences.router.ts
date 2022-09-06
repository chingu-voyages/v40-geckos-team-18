import { TRPCError } from '@trpc/server';
import {
  addNewVehicleSchema,
  updateUserLocationSchema,
  updateUserPrimaryVehicleSchema,
  updateUserUnitPreferenceSchema,
} from '../../schema/preferences.schema';
import { createRouter } from './context';

export const preferencesRouter = createRouter()
  .query('get-preferences', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const preferences = await ctx.prisma.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            unitPref: true,
            country: true,
            state: true,
          },
        });

        return preferences;
      }
    },
  })
  .query('get-vehicles', {
    async resolve({ ctx }) {
      const user = ctx.session?.user;

      if (user) {
        const vehicles = await ctx.prisma.vehicle
          .findMany({
            select: {
              id: true,
              vehicle_make: true,
              vehicle_model: true,
              vehicle_model_id: true,
              vehicle_year: true,
            },
            where: {
              userId: user.id,
            },
          })
          .then((response) => response)
          .catch((e) => console.error(e));

          return vehicles;
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not signed in and valid credentials are required.',
      });
    },
  })
  .mutation('update-user-location', {
    input: updateUserLocationSchema,
    async resolve({ ctx, input }) {
      const user = ctx.session?.user;

      if (user) {
        await ctx.prisma.user
          .update({
            data: {
              ...input,
            },
            where: {
              id: user.id,
            },
          })
          .then((prismaResponse) => {
            return prismaResponse;
          })
          .catch((e) => {
            console.error(e);
          });

        return;
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not signed in and valid credentials are required.',
      });
    },
  })
  .mutation('update-user-unit-preference', {
    input: updateUserUnitPreferenceSchema,
    async resolve({ ctx, input }) {
      const user = ctx.session?.user;
      console.log(`unitPref input: ${input}`);
      if (user) {
        ctx.prisma.user
          .update({
            data: {
              unitPref: input,
            },
            where: {
              id: user.id,
            },
          })
          .then((response) => response)
          .catch((e) => console.error(e));

        return;
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not signed in and valid credentials are required.',
      });
    },
  })
  .mutation('update-user-primary-vehicle', {
    input: updateUserPrimaryVehicleSchema,
    async resolve({ ctx, input }) {
      const user = ctx.session?.user;

      if (user) {
        ctx.prisma.user.update({
          data: {
            ...input,
          },
          where: {
            id: user.id,
          },
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not signed in and valid credentials are required.',
      });
    },
  }).mutation('add-new-vehicle', {
    input: addNewVehicleSchema,
    async resolve({ctx, input}) {
      const user = ctx.session?.user

      if (user) {
        ctx.prisma.vehicle.create({
          data: {
            ...input,
            userId: user.id
          }, 
        }).then(response => response)
      }
    }
  });
