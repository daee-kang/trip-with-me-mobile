import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { View } from 'react-native';

import { supabase } from './lib/supabase';
import Account from './screens/Account';
import Login from './screens/Login';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Login />}
    </View>
  );
}
