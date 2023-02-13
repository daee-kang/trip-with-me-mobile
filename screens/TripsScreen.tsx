import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Text, Toggle } from '@ui-kitten/components';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GetTripDBResponse, getTripsDB } from '../api/trips';
import { ThemeModeContext } from '../contexts/ThemeModeContext';
import useGetSession from '../hooks/useGetSession';
import { supabase } from '../lib/supabase';
import { CommonStyles } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const TripsScreen = () => {
  const [trips, setTrips] = useState<GetTripDBResponse['data']>(null);
  const [fetchingTrips, setFetchingTrips] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeModeContext);

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
    <View style={CommonStyles.page}>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
          <Text category="h4">trips</Text>
        </View>
        <Button onPress={onAddTripButtonPress}>add trip</Button>
        <Button status="primary" onPress={signOut}>
          logout
        </Button>
      </View>
      {trips &&
        trips.map((trip) => {
          return (
            <Card
              onPress={() => navigation.navigate('Trip', { id: trip.id })}
              key={`trip-${trip.id}`}>
              <Text category="h4">{trip.name}</Text>
            </Card>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

export default TripsScreen;
