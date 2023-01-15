import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Text } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GetTripDBResponse, getTripsDB } from '../api/trips';
import useGetSession from '../hooks/useGetSession';
import { supabase } from '../lib/supabase';
import { HomeStackParamList } from './HomeScreen';

const TripsScreen = () => {
  const [trips, setTrips] = useState<GetTripDBResponse['data']>(null);
  const [fetchingTrips, setFetchingTrips] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trips'>>();
  const { user } = useGetSession();

  const tripFetch = useCallback(async () => {
    if (fetchingTrips) return;

    setFetchingTrips(true);
    const { data, error } = await getTripsDB(user.id);
    if (error) {
      return console.log(error);
    }
    setTrips(
      data.sort((a, b) => {
        return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();
      })
    );
    setFetchingTrips(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      tripFetch();
    }, [])
  );

  const onAddTripButtonPress = useCallback(() => {
    navigation.navigate('AddTrip');
  }, []);

  const signOut = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text h4 style={{ flex: 1 }}>
          trips
        </Text>
        <Button onPress={onAddTripButtonPress}>add trip</Button>
        <Button color="secondary" onPress={signOut}>
          logout
        </Button>
      </View>
      {trips &&
        trips.map((trip) => {
          return (
            <TouchableOpacity
              key={`trip-${trip.id}`}
              onPress={() => {
                navigation.navigate('Trip', { id: trip.id });
              }}>
              <Card>
                <Text h4>{trip.name}</Text>
              </Card>
            </TouchableOpacity>
          );
        })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
  },
});

export default TripsScreen;
