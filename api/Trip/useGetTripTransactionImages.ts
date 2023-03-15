import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

const getTripTransactionImagesDB = async (urls: string[]) => {
  return await supabase.storage.from('images').list();
};

const useGetTripTransactionImages = (urls: string[], tripId: string) => {
  const key = ['tripTransactionsImages', tripId];

  return useQuery(key, async () => {});
};
