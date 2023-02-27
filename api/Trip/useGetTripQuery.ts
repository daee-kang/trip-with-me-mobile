import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

const getTripDB = async (tripId: string) => {
  return await supabase.from('trips').select().eq('id', tripId).throwOnError();
};

export const useGetTripQuery = (tripId: string) => {
  const key = ['trip', tripId];

  return useQuery(key, async () => {
    return getTripDB(tripId)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => err);
  });
};
export type GetTripDBResponse = Awaited<ReturnType<typeof getTripDB>>;
