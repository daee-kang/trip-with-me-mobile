import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Trips from '../Trips';

type HomeStackParamList = {
  Trips: undefined;
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
    </HomeStack.Navigator>
  );
};

export default Home;
