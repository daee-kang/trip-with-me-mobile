import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

const getTripTransactionsDB = async (tripId: string) => {
  return await supabase.from('transactions').select().eq('trip_id', tripId).throwOnError();
};

export const useGetTripTransactions = (tripId: string) => {
  const key = ['tripTransactions', tripId];

  return useQuery<GetTripTransactionsDBResponse['data']>(key, async () => {
    return getTripTransactionsDB(tripId)
      .then((res) => res.data?.sort((a, b) => b.created_at.localeCompare(a.created_at)))
      .catch((err) => err);
  });
};
export type GetTripTransactionsDBResponse = Awaited<ReturnType<typeof getTripTransactionsDB>>;

const methods = {
  get: useGetTripTransactions,
};

export default methods;
