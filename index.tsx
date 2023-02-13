import * as eva from '@eva-design/eva';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { registerRootComponent } from 'expo';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './App';
import { SessionProvider } from './contexts/SessionContext';
import { ThemeModeContext } from './contexts/ThemeModeContext';
import { myTheme } from './styles';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <IconRegistry icons={EvaIconsPack} />
          <ThemeModeContext.Provider value={{ theme, toggleTheme }}>
            <ApplicationProvider {...eva} theme={{ ...eva[theme], ...myTheme }}>
              <App />
            </ApplicationProvider>
          </ThemeModeContext.Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </SessionProvider>
  );
};

export default registerRootComponent(Index);
