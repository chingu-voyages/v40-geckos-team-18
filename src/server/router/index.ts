// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from './example';
import { protectedExampleRouter } from './protected-example-router';
import { electricityRouter } from './electricity.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('electricity.', electricityRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
