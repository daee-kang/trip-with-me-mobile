import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './App';
import { SessionProvider } from './contexts/SessionContext';

const Index = () => {
  return (
    <NavigationContainer>
      <SessionProvider>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </SessionProvider>
    </NavigationContainer>
  );
};

export default registerRootComponent(Index);
