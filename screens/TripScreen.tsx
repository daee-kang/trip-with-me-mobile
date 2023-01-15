import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { deleteTripDB, getTripDB, GetTripDBResponse } from '../api/trips';
import { HomeStackParamList } from './HomeScreen';

const TripScreen = () => {
  const [trip, setTrip] = useState<GetTripDBResponse['data']>(null);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Trip'>>();

  useEffect(() => {
    const getTrip = async () => {
      const { data, error } = await getTripDB(route.params.id);
      if (error || data.length === 0) {
        return console.log(error);
      }
      setTrip(data);
    };

    getTrip();
  }, [route.params]);

  const deleteTrip = useCallback(async () => {
    const { error } = await deleteTripDB(route.params.id);
    if (error) {
      return console.log(error);
    }
    navigation.goBack();
  }, []);

  return (
    <View>
      <Button onPress={() => navigation.goBack()}>go back</Button>
      {trip === null || trip.length === 0 ? (
        <Text>loading</Text>
      ) : (
        <View>
          <Text>this yo trip</Text>
          <Text>{trip[0].name}</Text>
          <Text>{trip[0].description}</Text>
          <Button onPress={deleteTrip}>delete trip</Button>
        </View>
      )}
    </View>
  );
};

export default TripScreen;
