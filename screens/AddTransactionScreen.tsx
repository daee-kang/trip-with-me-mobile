import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ButtonGroup, Icon, Input, Spinner } from '@ui-kitten/components';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Text, View, StyleSheet, Image } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';

import { useAddTripTransaction } from '../api';
import { GoBackTopNavigation } from '../components';
import { supabase } from '../lib/supabase';
import { CommonStyles, Spacing, Status, Size } from '../styles';
import { HomeStackParamList } from './HomeScreen';

type TransactionFormData = {
  description: string;
  amount: string;
  image: ImagePicker.ImagePickerAsset;
};

const AddTransactionScreen = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    setValue,
    watch,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<TransactionFormData>();
  const image = watch('image');

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AddTransaction'>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'AddTransaction'>>();
  const { trip } = route.params;

  const addTransactionMutation = useAddTripTransaction(trip.id);

  const uploadImageAsync = useCallback(async (base64_image: string, path: string) => {
    const { error } = await supabase.storage
      .from('transaction-images')
      .upload(path, decode(base64_image), {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;
  }, []);

  const onSubmit = handleSubmit(
    async (data) => {
      setSubmitting(true);

      const { amount, description } = data;
      let imageUploadSuccess = false;

      const photoUri = `trip-${trip.id}-${uuid.v4()}.png`;

      if (image?.base64) {
        try {
          await uploadImageAsync(image.base64, photoUri);
          imageUploadSuccess = true;
        } catch (e) {
          Alert.alert('Error', 'Unable to upload image. Please try again.');
          console.error(e);
          imageUploadSuccess = false;
        }
      }

      if (image && !imageUploadSuccess) {
        return;
      }

      addTransactionMutation.mutate({
        amount: Number(amount),
        description,
        trip_id: trip.id,
        photo: image ? photoUri : undefined,
      });
    },
    (errors) => {
      console.log(errors);
    }
  );
  const takeImage = useCallback(async () => {
    const hasPermissions = await ImagePicker.getCameraPermissionsAsync();
    if (hasPermissions.status !== 'granted') {
      const res = await ImagePicker.requestCameraPermissionsAsync();
      if (res.status !== 'granted') {
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setValue('image', result.assets[0]);
    }
  }, [setValue]);

  const uploadImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('image', result.assets[0]);
    }
  }, [setValue]);

  useEffect(() => {
    if (addTransactionMutation.isSuccess) {
      setSubmitting(false);
      navigation.goBack();
      return;
    }

    if (addTransactionMutation.isError) {
      setSubmitting(false);
      Alert.alert('Error adding transaction', addTransactionMutation.error?.message ?? '');
    }
  }, [
    addTransactionMutation.error?.message,
    addTransactionMutation.isError,
    addTransactionMutation.isSuccess,
    navigation,
  ]);

  return (
    <>
      <GoBackTopNavigation onPress={() => navigation.goBack()} title="cancel" />
      <View style={CommonStyles.page}>
        <Controller
          name="description"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Input
              onChangeText={field.onChange}
              placeholder="description"
              disabled={submitting}
              {...field}
            />
          )}
        />
        <Controller
          name="amount"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            const { value, onChange, ...props } = field;
            return (
              <CurrencyInput
                value={Number(value) ?? 0}
                placeholder="$0.00"
                prefix="$"
                delimiter=","
                separator="."
                onChangeValue={(value) => onChange(value?.toString())}
                {...props}
                renderTextInput={(textInputProps) => (
                  <Input disabled={submitting} {...textInputProps} />
                )}
              />
            );
          }}
        />
        <View style={styles.imageUploadContainer}>
          <ButtonGroup status={Status.info} style={styles.imageButtonGroup}>
            <Button
              onPress={uploadImage}
              style={{ flex: 1 }}
              accessoryLeft={<Icon name="image-outline" />}
              disabled={submitting}>
              Upload image
            </Button>
            <Button
              onPress={takeImage}
              style={{ flex: 1 }}
              accessoryLeft={<Icon name="camera-outline" />}
              disabled={submitting}>
              Take Image
            </Button>
          </ButtonGroup>
          {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
          <Spinner status={Status.control} />
        </View>
        {submitting ? (
          <View style={{ alignItems: 'center' }}>
            <Spinner />
          </View>
        ) : (
          <Button onPress={onSubmit}>
            {submitting ? <Spinner status={Status.control} /> : <Text>add transaction</Text>}
          </Button>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageUploadContainer: {
    width: '100%',
    marginTop: Spacing.default,
  },
  imageButtonGroup: {},
});

export default AddTransactionScreen;
