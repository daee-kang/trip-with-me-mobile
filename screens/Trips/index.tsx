import { Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useGetSession from '../../hooks/useGetSession';

const Trips = () => {
  const session = useGetSession();
  return (
    <SafeAreaView>
      <Text h4>{session.user.email} trips</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Trips;
