import 'react-native-url-polyfill/auto';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@ui-kitten/components';
import { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SessionContext } from './contexts/SessionContext';
import { supabase } from './lib/supabase';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const theme = useTheme();

  const { session, setSession } = useContext(SessionContext);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme['background-basic-color-2'],
    },
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <NavigationContainer theme={navTheme}>
      <View style={[styles.app, { backgroundColor: theme['background-basic-color-2'] }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {session && session.user ? <HomeScreen /> : <Login />}
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  app: {
    height: '100%',
    width: '100%',
  },
});
