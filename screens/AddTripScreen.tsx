import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '@ui-kitten/components';
import { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import { useAddTripMutation } from '../api';
import { GoBackTopNavigation } from '../components';
import { CommonStyles } from '../styles';
import { HomeStackParamList } from './HomeScreen';

const AddTripScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AddTrip'>>();

  const addTripMutation = useAddTripMutation();

  const onNameChange = useCallback((text: string) => setName(text), []);
  const onDescriptionChange = useCallback((text: string) => setDescription(text), []);

  const createTrip = useCallback(() => {
    addTripMutation.mutate({
      name,
      description: description === '' ? undefined : description,
    });
  }, [name, description]);

  useEffect(() => {
    if (addTripMutation.isSuccess) {
      if (addTripMutation.data?.data?.[0] == null) return Alert.alert('Error creating trip');

      navigation.replace('Trip', { id: addTripMutation.data?.data?.[0].id });
    }
    if (addTripMutation.isError) {
      return Alert.alert('Error creating trip');
    }
  }, [addTripMutation.isSuccess, addTripMutation.isError]);

  return (
    <>
      <GoBackTopNavigation onPress={() => navigation.goBack()} title="go back" />
      <View style={CommonStyles.page}>
        <View>
          <Input placeholder="name" value={name} onChangeText={onNameChange} />
          <Input placeholder="description" value={description} onChangeText={onDescriptionChange} />
          <Button disabled={name === ''} onPress={createTrip}>
            create
          </Button>
        </View>
      </View>
    </>
  );
};

export default AddTripScreen;
