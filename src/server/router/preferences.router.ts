import { TRPCError } from '@trpc/server';
import {
  updateUserLocationSchema,
  updateUserPrimaryVehicleSchema,
  updateUserUnitPreferenceSchema,
} from '../../schema/preferences.schema';
import { createRouter } from './context';

export const preferencesRouter = createRouter()
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
  });
