import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export type addTripTransactionRequestParams = {
  trip_id: string; // UUID to trip
  to_user?: string; // UUID to other member for shared, if null, transaction is self
  amount: number;
  description?: string;
  photo?: string; // TODO:
};

export const addTripTransactionDB = async (tripTransaction: addTripTransactionRequestParams) => {
  return await supabase
    .from('transactions')
    .insert(tripTransaction)
    .throwOnError()
    .select()
    .limit(1)
    .throwOnError();
};

export const useAddTripTransaction = (tripId?: string) => {
  const queryClient = useQueryClient();

  const getTransactionsKey = tripId ? ['tripTransactions', tripId] : ['tripTransactions'];

  return useMutation<
    AddTripTransactionDBResponse,
    AddTripTransactionDBResponse['error'],
    addTripTransactionRequestParams,
    { previousTransactions: any }
  >({
    mutationFn: (tripTransaction) => {
      return addTripTransactionDB(tripTransaction);
    },
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries({ queryKey: getTransactionsKey });

      const previousTransactions = queryClient.getQueryData(getTransactionsKey);

      queryClient.setQueryData(getTransactionsKey, (old: any) => {
        return [...old, newTransaction];
      });

      return { previousTransactions };
    },
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(getTransactionsKey, context?.previousTransactions);
      } else {
        queryClient.invalidateQueries({ queryKey: getTransactionsKey });
      }
      throw new Error(err?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getTransactionsKey });
    },
  });
};

export type AddTripTransactionDBResponse = Awaited<ReturnType<typeof addTripTransactionDB>>;
