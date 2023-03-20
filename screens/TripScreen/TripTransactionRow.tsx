import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Icon, Spinner, Text, useTheme } from '@ui-kitten/components';
import { memo, useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { SignedImageApi } from '../../api';
import { Spacing, TextStyle } from '../../styles';
import { TripTransaction } from '../../types';
import { HomeStackParamList } from '../HomeScreen';

type Props = {
  transaction: TripTransaction;
};
const TripTransactionRow = ({ transaction }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();

  const getSignedImageQuery = SignedImageApi.get(
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
      <View style={{ flexDirection: 'row', height: 80 }}>
        <View style={{ flex: 1 }}>
          <Text category={TextStyle.h6} style={{ flex: 1, marginBottom: Spacing.default }}>
            {transaction.description ?? 'no description'}
          </Text>
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
                    style={{ width: 80, height: 80, borderWidth: 1 }}
                  />
                )}
              </View>
            )}
          </View>
        )}
        <View style={{ justifyContent: 'center', paddingLeft: Spacing.small }}>
          <Icon
            name="chevron-right-outline"
            fill={theme['color-info-800']}
            style={{ width: 24, height: 24 }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  transactionRow: {
    padding: Spacing.default,
  },
});
export default memo(TripTransactionRow);
