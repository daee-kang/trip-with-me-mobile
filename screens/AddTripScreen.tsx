import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useAddTripMutation } from '../api';
import { CommonStyles } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const AddTripScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AddTrip'>>();

  const addTripMutation = useAddTripMutation();

  const onNameChange = useCallback((text: string) => setName(text), []);
  const onDescriptionChange = useCallback((text: string) => setDescription(text), []);

  const createTrip = useCallback(async () => {
    await addTripMutation.mutateAsync({
      name,
      description: description === '' ? undefined : description,
    });

    if (addTripMutation.error || !addTripMutation.data) {
      return Alert.alert('Error creating trip');
    }

    navigation.replace('Trip', { id: addTripMutation.data.id });
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
