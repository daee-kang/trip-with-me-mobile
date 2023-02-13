import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useCallback } from 'react';
import { View } from 'react-native';

import { useDeleteTripMutation, useGetTripQuery } from '../api';
import { CommonStyles, Status } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const TripScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Trip'>>();

  const getTripQuery = useGetTripQuery(route.params.id);
  const deleteTripMutation = useDeleteTripMutation();

  const deleteTrip = useCallback(async () => {
    await deleteTripMutation.mutateAsync(route.params.id);
    navigation.goBack();
  }, []);

  return (
    <View style={CommonStyles.page}>
      <Button onPress={() => navigation.goBack()}>go back</Button>
      {getTripQuery.isFetching ? (
        <Spinner status={Status.info} />
      ) : (
        <View>
          <Text>this yo trip</Text>
          <Text>{getTripQuery.data?.[0].id}</Text>
          <Text>{getTripQuery.data?.[0].description ?? ''}</Text>
          <Button onPress={deleteTrip}>delete trip</Button>
        </View>
      )}
    </View>
  );
};

export default TripScreen;
