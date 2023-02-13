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
    .throwOnError()
    .then((res) => {
      if (!res.data || res.data.length === 0) throw new Error('Unable to fetch newly created trip');
      return res.data[0];
    });
};

export const useAddTripMutation = () => {
  return useMutation<AddTripDBResponse, unknown, addTripMutationRequestParams>(
    async (trip: addTripMutationRequestParams) => {
      return addTripDB(trip).catch((err) => err);
    }
  );
};

export type AddTripDBResponse = Awaited<ReturnType<typeof addTripDB>>;
