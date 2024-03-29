import { Spinner, Text } from '@ui-kitten/components';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { TripTransactionsApi } from '../../api';
import { Spacing, TextStyle } from '../../styles';
import { Trip } from '../../types';
import TripTransactionRow from './TripTransactionRow';

type Props = {
  trip: Trip;
};
const TripContent = ({ trip }: Props) => {
  const transactionQuery = TripTransactionsApi.get(trip.id);

  const tripTotal = useMemo(
    () =>
      transactionQuery.data?.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0),
    [transactionQuery.data]
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tripSummary}>
        <Text category={TextStyle.h3}>{trip.name}</Text>
        <Text category={TextStyle.c1}>{trip.description ?? ''}</Text>

        <View style={{ alignItems: 'center', marginBottom: Spacing.larger }}>
          {tripTotal !== undefined ? (
            <Text category={TextStyle.h4} style={{ textAlign: 'center' }}>
              {formatter.format(tripTotal)}
            </Text>
          ) : (
            <Spinner />
          )}
        </View>

        <FlatList
          data={transactionQuery.data ?? []}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          windowSize={3}
          renderItem={({ item: transaction }) => <TripTransactionRow transaction={transaction} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripSummary: {
    alignContent: 'center',
    flex: 1,
  },
});

export default TripContent;
