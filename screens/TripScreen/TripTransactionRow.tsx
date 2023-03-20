import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Spinner } from '@ui-kitten/components';
import { memo, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useGetSignedImage } from '../../api/Trip/useGetSignedImage';
import { Spacing } from '../../styles';
import { TripTransaction } from '../../types';
import { HomeStackParamList } from '../HomeScreen';

type Props = {
  transaction: TripTransaction;
};
const TripTransactionRow = ({ transaction }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();

  const getSignedImageQuery = useGetSignedImage(
    {
      path: transaction.photo,
    },
    {
      enabled: !!transaction.photo,
    }
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const navigateToTripTransactionDetail = useCallback(() => {
    navigation.navigate('TripTransactionDetail', {
      tripId: transaction.trip_id,
      transactionId: transaction.id,
    });
  }, [navigation, transaction.id, transaction.trip_id]);
  return (
    <Card style={styles.transactionRow} onPress={navigateToTripTransactionDetail}>
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 1 }}>{transaction.description ?? 'no description'}</Text>
        <Text style={{ flex: 1 }}>{formatter.format(transaction.amount)}</Text>
      </View>
      {!!transaction.photo && (
        <View>
          {getSignedImageQuery.isLoading ? (
            <Spinner />
          ) : (
            <View>
              {getSignedImageQuery.data != null && (
                <Image
                  source={{ uri: getSignedImageQuery.data }}
                  style={{ width: 80, height: 80 }}
                />
              )}
            </View>
          )}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    padding: Spacing.default,
  },
});
export default memo(TripTransactionRow);
