import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';

import App from './App';
import { SessionProvider } from './contexts/SessionContext';

const Index = () => {
  return (
    <NavigationContainer>
      <SessionProvider>
        <App />
      </SessionProvider>
    </NavigationContainer>
  );
};

export default registerRootComponent(Index);
