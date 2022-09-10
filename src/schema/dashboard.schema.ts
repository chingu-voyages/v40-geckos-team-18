import { Prisma } from '@prisma/client';
import z from 'zod';

export const summarySchema = z.array(
  z.object({ type: z.string(), emissions: z.number() })
);

export type EmissionsSummaryData = {
  type: string;
  emissions: number;
};

export type ElectricityData = {
  electricity_value: Prisma.Decimal;
  electricity_unit: string;
  carbon_g: number;
  estimated_at: Date;
  id: string;
};

export type FlightData = {
  id: string;
  carbon_g: number;
  estimated_at: Date;
  passengers: number;
  distance_unit: string;
  distance_value: Prisma.Decimal;
  flightLeg: {
    id: string;
    departure_airport: string;
    destination_airport: string;
    cabin_class: string;
    legNumber: number;
  }[];
};

export type FuelData = {
  id: string;
  carbon_g: number;
  estimated_at: Date;
  fuel_source_type: string;
  fuel_source_unit: string;
  fuel_source_value: Prisma.Decimal;
};

export type TripData = {
  carbon_g: number;
  estimated_at: Date;
  distance_unit: string;
  distance_value: Prisma.Decimal;
  id: string;
};
