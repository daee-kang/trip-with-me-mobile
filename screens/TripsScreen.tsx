import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '../lib/supabase';
import { HomeStackParamList } from './HomeScreen';

const TripsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trips'>>();

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
