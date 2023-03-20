import { useMutation, useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export type addTripMutationRequestParams = {
  name: string;
  description?: string;
};

const addTripDB = async (trip: addTripMutationRequestParams) => {
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

const useAddTripMutation = () => {
  return useMutation<AddTripDBResponse, unknown, addTripMutationRequestParams>(
    async (trip: addTripMutationRequestParams) => {
      return addTripDB(trip)
        .then((res) => res)
        .catch((err) => err);
    }
  );
};

export type AddTripDBResponse = Awaited<ReturnType<typeof addTripDB>>;

export type deleteTripMutationRequestParams = string;

const deleteTripDB = async (tripid: string) => {
  return await supabase.from('trips').delete().eq('id', tripid).throwOnError();
};

export const useDeleteTripMutation = () => {
  return useMutation<DeleteTripDBResponse, unknown, deleteTripMutationRequestParams>(
    async (tripid: deleteTripMutationRequestParams) => {
      return deleteTripDB(tripid)
        .then(() => 'success')
        .catch((err) => err);
    }
  );
};

export type DeleteTripDBResponse = Awaited<ReturnType<typeof deleteTripDB>>;

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

const methods = {
  add: useAddTripMutation,
  get: useGetTripQuery,
  delete: useDeleteTripMutation,
};

export default methods;
