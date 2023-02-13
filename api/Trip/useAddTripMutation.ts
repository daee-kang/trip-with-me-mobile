import { useMutation } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export type addTripMutationRequestParams = {
  name: string;
  description?: string;
};

export const addTripDB = async (trip: addTripMutationRequestParams) => {
  return await supabase
    .from('trips')
    .insert({
      name: trip.name,
      description: trip.description === '' ? null : trip.description,
    })
    .throwOnError()
    .select()
    .limit(1)
    .throwOnError();
};

export const useAddTripMutation = () => {
  return useMutation<AddTripDBResponse, unknown, addTripMutationRequestParams>(
    async (trip: addTripMutationRequestParams) => {
      return addTripDB(trip)
        .then((res) => res)
        .catch((err) => err);
    }
  );
};

export type AddTripDBResponse = Awaited<ReturnType<typeof addTripDB>>;
