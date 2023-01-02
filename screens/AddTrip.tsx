import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '../lib/supabase';
import { HomeStackParamList } from './Home';

type AddTripScreenProp = NativeStackNavigationProp<HomeStackParamList, 'AddTrip'>;

const AddTrip = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation<AddTripScreenProp>();

  const onNameChange = useCallback((text: string) => setName(text), []);
  const onDescriptionChange = useCallback((text: string) => setDescription(text), []);

  const createTrip = useCallback(async () => {
    const { error } = await supabase.from('trips').insert({
      name,
      description: description === '' ? null : description,
    });
    if (error) {
      return console.log(error);
    }
  }, [name, description]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Button color="secondary" onPress={goBack}>
          go back
        </Button>
      </View>
      <View>
        <Input placeholder="name" value={name} onChangeText={onNameChange} />
        <Input placeholder="description" value={description} onChangeText={onDescriptionChange} />
        <Button disabled={name === ''} onPress={createTrip}>
          create
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
});

export default AddTrip;
