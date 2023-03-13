import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, List, Spinner, Text } from '@ui-kitten/components';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGetTripTransactions } from '../../api';
import { TextStyle } from '../../styles';
import { Trip } from '../../types';
import { HomeStackParamList } from '../HomeScreen';

type Props = {
  trip: Trip;
};
const TripContent = ({ trip }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();
  const transactionQuery = useGetTripTransactions(trip.id);
  // const addTransactionMutation = useAddTripTransaction(trip.id);

  const tripTotal = useMemo(
    () =>
      transactionQuery.data?.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0),
    [transactionQuery.data]
  );

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

        <Button onPress={() => navigation.navigate('AddTransaction', { trip })}>
          Add Transaction
        </Button>

        <List
          data={transactionQuery.data ?? []}
          renderItem={({ item }) => (
            <View style={styles.transactionRow}>
              <Text style={{ flex: 1 }}>{item.description ?? 'no description'}</Text>
              <Text style={{ flex: 1 }}>{formatter.format(item.amount)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripSummary: {
    alignContent: 'center',
  },
  transactionRow: {
    flexDirection: 'row',
  },
});

export default TripContent;
