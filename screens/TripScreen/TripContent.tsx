import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useGetTripTransactions } from '../../api';
import { TextStyle } from '../../styles';
import { Trip } from '../../types';
import { HomeStackParamList } from '../HomeScreen';
import TripTransactionRow from './TripTransactionRow';

type Props = {
  trip: Trip;
};
const TripContent = ({ trip }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();

  const transactionQuery = useGetTripTransactions(trip.id);

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

        <View style={{ alignItems: 'center' }}>
          {tripTotal !== undefined ? (
            <Text category={TextStyle.h4} style={{ textAlign: 'center' }}>
              {formatter.format(tripTotal)}
            </Text>
          ) : (
            <Spinner />
          )}
        </View>

        <Button onPress={() => navigation.navigate('AddTransaction', { trip })}>
          Add Transaction
        </Button>

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
