import { useMutation } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export type deleteTripMutationRequestParams = string;

const deleteTripDB = async (tripid: string) => {
  return await supabase
    .from('trips')
    .delete()
    .eq('id', tripid)
    .throwOnError()
    .then(() => 'success');
};

export const useDeleteTripMutation = () => {
  return useMutation<DeleteTripDBResponse, unknown, deleteTripMutationRequestParams>(
    async (tripid: deleteTripMutationRequestParams) => {
      return deleteTripDB(tripid).catch((err) => err);
    }
  );
};

export type DeleteTripDBResponse = Awaited<ReturnType<typeof deleteTripDB>>;
