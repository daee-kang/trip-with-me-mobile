import { Button, List, Spinner, Text } from '@ui-kitten/components';
import { useCallback, useEffect, useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useAddTripTransaction, useGetTripTransactions } from '../../api';
import { TextStyle } from '../../styles';
import { Trip } from '../../types';

type Props = {
  trip: Trip;
};
const TripContent = ({ trip }: Props) => {
  const transactionQuery = useGetTripTransactions(trip.id);
  const addTransactionMutation = useAddTripTransaction(trip.id);

  const tripTotal = useMemo(
    () =>
      transactionQuery.data?.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0),
    [transactionQuery.data]
  );

  const addTransaction = useCallback(() => {
    addTransactionMutation.mutate({
      amount: 100,
      description: 'test',
      trip_id: trip.id,
    });
  }, [addTransactionMutation, trip.id]);

  useEffect(() => {
    if (addTransactionMutation.isSuccess) {
      console.log('success');
    }

    if (addTransactionMutation.isError) {
      Alert.alert('Error adding transaction', addTransactionMutation.error?.message ?? '');
    }
  }, [
    addTransactionMutation.error?.message,
    addTransactionMutation.isError,
    addTransactionMutation.isSuccess,
  ]);

  // TODO: move to intl helper
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View>
      <View style={styles.tripSummary}>
        <Text category={TextStyle.h3}>{trip.name}</Text>
        <Text category={TextStyle.c1}>{trip.description ?? ''}</Text>

        <View style={{ alignItems: 'center' }}>
          {tripTotal !== undefined ? (
            <Text category={TextStyle.h4} style={{ textAlign: 'center' }}>
              {formatter.format(tripTotal)}
            </Text>
          ) : (
            <Spinner />
          )}
        </View>

        <Button onPress={addTransaction}>Add Transaction</Button>

        <List
          data={transactionQuery.data ?? []}
          renderItem={({ item }) => <Text>{formatter.format(item.amount)}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripSummary: {
    alignContent: 'center',
  },
});

export default TripContent;
