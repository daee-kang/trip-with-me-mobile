import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

const getTripsDB = async (userid: string) => {
  return await supabase
    .from('trips')
    .select()
    .eq('owner_id', userid)
    .order('created_at', { ascending: false })
    .throwOnError();
};

export const useGetTripsQuery = (userid: string) => {
  return useQuery(['trips'], async () => {
    return getTripsDB(userid).then((res) => res.data);
  });
};

export type GetTripsDBResponse = Awaited<ReturnType<typeof getTripsDB>>;

const methods = {
  get: useGetTripsQuery,
};

export default methods;
