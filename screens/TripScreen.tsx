import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';

import { useDeleteTripMutation, useGetTripQuery } from '../api';
import { GoBackTopNavigation } from '../components';
import { CommonStyles, Status } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const TripScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Trip'>>();

  const getTripQuery = useGetTripQuery(route.params.id);
  const deleteTripMutation = useDeleteTripMutation();

  const deleteTrip = useCallback(() => deleteTripMutation.mutate(route.params.id), []);

  useEffect(() => {
    if (deleteTripMutation.isSuccess) navigation.goBack();
  }, [deleteTripMutation.isSuccess]);

  useEffect(() => {
    if (getTripQuery.isSuccess) {
      if (!getTripQuery.data || getTripQuery.data.length === 0) {
        Alert.alert('Error loading trip');
        navigation.goBack();
      }
    }
  }, [getTripQuery.data]);

  return (
    <>
      <GoBackTopNavigation onPress={() => navigation.goBack()} title="go back" />
      <View style={CommonStyles.page}>
        {getTripQuery.isFetching ? (
          <Spinner status={Status.info} />
        ) : (
          <View>
            <Text>this yo trip</Text>
            <Text>{getTripQuery.data?.[0]?.id}</Text>
            <Text>{getTripQuery.data?.[0]?.description ?? ''}</Text>
            <Button onPress={deleteTrip}>delete trip</Button>
          </View>
        )}
      </View>
    </>
  );
};

export default TripScreen;
