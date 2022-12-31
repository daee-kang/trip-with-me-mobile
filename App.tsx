import 'react-native-url-polyfill/auto';

import { useEffect, useContext } from 'react';
import { View } from 'react-native';

import { SessionContext } from './contexts/SessionContext';
import { supabase } from './lib/supabase';
import Home from './screens/Home';
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

  return <View>{session && session.user ? <Home /> : <Login />}</View>;
}
