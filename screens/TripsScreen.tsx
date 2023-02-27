import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Spinner, Text, Toggle } from '@ui-kitten/components';
import { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGetTripsQuery, useRefreshOnFocus } from '../api';
import { ThemeModeContext } from '../contexts/ThemeModeContext';
import useGetSession from '../hooks/useGetSession';
import { supabase } from '../lib/supabase';
import { CommonStyles, Spacing, Status, TextStyle } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const TripsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeModeContext);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trips'>>();
  const { user } = useGetSession();

  const tripsQuery = useGetTripsQuery(user.id);

  useRefreshOnFocus(tripsQuery.refetch);

  const onAddTripButtonPress = useCallback(() => {
    navigation.navigate('AddTrip');
  }, [navigation]);

  const signOut = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  return (
    <View style={CommonStyles.page}>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Toggle
            checked={theme === 'dark'}
            onChange={toggleTheme}
            style={{ paddingRight: Spacing.default }}
          />
          <Text category={TextStyle.h4} style={{ paddingRight: Spacing.default }}>
            trips
          </Text>
          {tripsQuery.isFetching && <Spinner status={Status.info} />}
        </View>
        <Button onPress={onAddTripButtonPress} style={{ marginRight: Spacing.default }}>
          add trip
        </Button>
        <Button status={Status.danger} onPress={signOut}>
          logout
        </Button>
      </View>

      {!tripsQuery.isFetching &&
        tripsQuery.data &&
        tripsQuery.data.map((trip) => {
          return (
            <Card
              onPress={() => navigation.navigate('Trip', { id: trip.id })}
              key={`trip-${trip.id}`}>
              <Text category={TextStyle.h4}>{trip.name}</Text>
            </Card>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: Spacing.default,
  },
});

export default TripsScreen;
