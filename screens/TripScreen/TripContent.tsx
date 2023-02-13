import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { TextStyle } from '../../styles';
import { Trip } from '../../types';

type Props = {
  trip?: Trip;
};
const TripContent = ({ trip }: Props) => {
  if (!trip) return <></>;
  return (
    <View>
      <View style={styles.tripSummary}>
        <Text category={TextStyle.h1} style={{ textAlign: 'center' }}>
          {trip.name}
        </Text>
        <Text category={TextStyle.c1} style={{ textAlign: 'center' }}>
          {trip.description ?? ''}
        </Text>
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
