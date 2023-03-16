import { Card, Spinner } from '@ui-kitten/components';
import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useGetSignedImage } from '../../api/Trip/useGetSignedImage';
import { Spacing } from '../../styles';
import { TripTransaction } from '../../types';

type Props = {
  transaction: TripTransaction;
};
const TripTransactionRow = ({ transaction }: Props) => {
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

  return (
    <Card style={styles.transactionRow}>
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
