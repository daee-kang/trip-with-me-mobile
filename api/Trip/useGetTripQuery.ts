import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

const getTripDB = async (tripid: string) => {
  return await supabase.from('trips').select().eq('id', tripid).throwOnError();
};

export const useGetTripQuery = (tripid: string) => {
  const key = ['trip', tripid];

  return useQuery(key, async () => {
    return getTripDB(tripid).then((res) => res.data);
  });
};
export type GetTripDBResponse = Awaited<ReturnType<typeof getTripDB>>;
