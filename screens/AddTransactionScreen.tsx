import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@ui-kitten/components';
import { useCallback, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

import { useAddTripTransaction } from '../api';
import { GoBackTopNavigation } from '../components';
import { CommonStyles } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const AddTransactionScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AddTransaction'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'AddTransaction'>>();

  const { trip } = route.params;

  const addTransactionMutation = useAddTripTransaction(trip.id);

  const addTransaction = useCallback(() => {
    addTransactionMutation.mutate({
      amount: 100,
      description: 'test',
      trip_id: trip.id,
    });
  }, [addTransactionMutation, trip.id]);

  useEffect(() => {
    if (addTransactionMutation.isSuccess) {
      console.log('success');
      navigation.goBack();
    }

    if (addTransactionMutation.isError) {
      Alert.alert('Error adding transaction', addTransactionMutation.error?.message ?? '');
    }
  }, [
    addTransactionMutation.error?.message,
    addTransactionMutation.isError,
    addTransactionMutation.isSuccess,
    navigation,
  ]);

  return (
    <>
      <GoBackTopNavigation onPress={() => navigation.goBack()} title="cancel" />
      <View style={CommonStyles.page}>
        <Button onPress={addTransaction}>
          <Text>add transaction</Text>
        </Button>
      </View>
    </>
  );
};

export default AddTransactionScreen;
