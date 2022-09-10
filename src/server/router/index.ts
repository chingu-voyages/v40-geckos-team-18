// src/server/router/index.ts
import { createRouter } from "./context";

import { exampleRouter } from './example';
import { protectedExampleRouter } from './protected-example-router';
import { electricityRouter } from './electricity.router';
import { flightRouter } from "./flight.router";
import { vehicleRouter } from './vehicle.router';
import { fuelRouter } from './fuel.router';
import { preferencesRouter } from "./preferences.router";
import { dashboardRouter } from "./dashboard.router";

export const appRouter = createRouter()
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('electricity.', electricityRouter)
  .merge('flight.', flightRouter)
  .merge('vehicle.', vehicleRouter)
  .merge('fuel.', fuelRouter)
  .merge('dashboard.', dashboardRouter)
  .merge('preferences.', preferencesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
