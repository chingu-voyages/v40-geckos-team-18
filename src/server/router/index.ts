// src/server/router/index.ts
import { createRouter } from "./context";
import { electricityRouter } from './electricity.router';
import { flightRouter } from "./flight.router";
import { vehicleRouter } from './vehicle.router';
import { fuelRouter } from './fuel.router';
import { preferencesRouter } from "./preferences.router";

export const appRouter = createRouter()
  .merge('electricity.', electricityRouter)
  .merge('flight.', flightRouter)
  .merge('vehicle.', vehicleRouter)
  .merge('fuel.', fuelRouter)
  .merge('preferences.', preferencesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
