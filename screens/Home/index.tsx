import { Button, Text } from '@rneui/base';
import { View } from 'react-native';

import useGetSession from '../../hooks/useGetSession';
import { supabase } from '../../lib/supabase';

const Home = () => {
  const session = useGetSession();

  return (
    <View style={{ marginTop: 40 }}>
      <Text>hello {session.user.email}</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default Home;
