import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTrip from '../AddTrip';
import Trips from '../Trips';

export type HomeStackParamList = {
  Trips: undefined;
  AddTrip: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const Home = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Trips"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Trips" component={Trips} />
      <HomeStack.Screen name="AddTrip" component={AddTrip} />
    </HomeStack.Navigator>
  );
};

export default Home;
