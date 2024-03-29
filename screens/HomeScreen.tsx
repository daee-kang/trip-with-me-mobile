import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Trip } from '../types';
import AddTransactionScreen from './AddTransactionScreen';
import AddTripScreen from './AddTripScreen';
import TripScreen from './TripScreen';
import TripTransactionDetail from './TripTransactionDetail';
import TripsScreen from './TripsScreen';

export type HomeStackParamList = {
  Trips: undefined;
  Trip: {
    id: string;
  };
  TripTransactionDetail: {
    tripId: string;
    transactionId: string;
  };
  AddTrip: undefined;
  AddTransaction: {
    trip: Trip;
  };
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
      <HomeStack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <HomeStack.Screen name="TripTransactionDetail" component={TripTransactionDetail} />
    </HomeStack.Navigator>
  );
};

export default Home;
