import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { supabase } from '../lib/supabase';
import { CommonStyles } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const AddTripScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AddTrip'>>();

  const onNameChange = useCallback((text: string) => setName(text), []);
  const onDescriptionChange = useCallback((text: string) => setDescription(text), []);

  const createTrip = useCallback(async () => {
    const { error, data } = await supabase
      .from('trips')
      .insert({
        name,
        description: description === '' ? null : description,
      })
      .select();
    if (error || data.length === 0) {
      return Alert.alert('Error creating table', error?.message ?? 'data length === 0');
    }
    navigation.replace('Trip', { id: data[0].id });
  }, [name, description]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={CommonStyles.page}>
      <View style={styles.header}>
        <Button status="primary" onPress={goBack}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

export default AddTripScreen;
