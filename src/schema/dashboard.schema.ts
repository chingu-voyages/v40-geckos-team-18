import z from 'zod';

export const summarySchema = z.array(
  z.object({ type: z.string(), emissions: z.number() })
);