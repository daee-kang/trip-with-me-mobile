import 'react-native-url-polyfill/auto';

import { useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SessionContext } from './contexts/SessionContext';
import { supabase } from './lib/supabase';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';

export default function App() {
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {session && session.user ? <HomeScreen /> : <Login />}
    </SafeAreaView>
  );
}
