import { locationInputSchema } from '../../schema/preferences.schema';
import { createRouter } from './context';

export const preferencesRouter = createRouter().mutation('update-location', {
  input: locationInputSchema,
  async resolve({}) {},
});
