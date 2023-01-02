import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';

import { HomeStackParamList } from './HomeScreen';

const TripScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Trip'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Trip'>>();

  return (
    <View>
      <Button onPress={() => navigation.goBack()}>go back</Button>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default TripScreen;
