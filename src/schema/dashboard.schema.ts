import z from 'zod';

export const summarySchema = z.array(
  z.object({ type: z.string(), emissions: z.number() })
);

export type SummaryResponseType = z.TypeOf<typeof summarySchema>;

export interface SummaryQueryResponse {
  data: SummaryResponseType;
  isLoading: boolean;
}
