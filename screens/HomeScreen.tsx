import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTripScreen from './AddTripScreen';
import TripScreen from './TripScreen';
import TripsScreen from './TripsScreen';

export type HomeStackParamList = {
  Trips: undefined;
  Trip: {
    id: string;
  };
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
      <HomeStack.Screen name="Trips" component={TripsScreen} />
      <HomeStack.Screen name="AddTrip" component={AddTripScreen} />
      <HomeStack.Screen name="Trip" component={TripScreen} />
    </HomeStack.Navigator>
  );
};

export default Home;
