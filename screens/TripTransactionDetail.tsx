import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { GoBackTopNavigation } from '../components';
import { HomeStackParamList } from './HomeScreen';

const TripTransactionDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'TripTransactionDetail'>>();

  return (
    <View>
      <GoBackTopNavigation onPress={() => navigation.goBack()} title="go back" />
    </View>
  );
};

export default TripTransactionDetail;
