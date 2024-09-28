import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {
  createForm,
  getFormFields,
  isFormValid,
  validateForm,
} from '../../utils/formUtils';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../actions/user';

const labels = {
  mobileNumberFieldLabel: 'Mobile number:',
  mobileNumber: 'Enter mobile number',
  nameFieldLabel: 'Name:',
  name: 'Enter name',
  cityFieldLabel: 'City:',
  city: 'Enter city',
  resetButton: 'Reset',
  submitButton: 'Submit',
};
const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [form, setForm] = useState(createForm(user));
  const setField = ({name, value}) => {
    setForm({
      ...form,
      [name]: {
        value,
        error: value ? '' : 'Please enter a value.',
      },
    });
  };
  const resetFields = () => {
    setForm(createForm(user));
  };
  const handleSubmit = async () => {
    const updatedForm = validateForm(form);
    const formValid = isFormValid(updatedForm);
    if (formValid) {
      const data = getFormFields(form);
      let storedUserData = await AsyncStorage.getItem(user.mobileNumber);
      storedUserData = JSON.parse(storedUserData);
      try {
        await AsyncStorage.setItem(
          data.mobileNumber,
          JSON.stringify({...storedUserData, ...data}),
        );
      } catch (error) {
        console.log('Error in saving data to AsyncStorage -', error);
      }
      dispatch(updateUser(data));
      navigation.navigate('Dashboard');
    } else {
      setForm(updatedForm);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>{labels.mobileNumberFieldLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder={labels.mobileNumber}
          onChangeText={value => setField({name: 'mobileNumber', value})}
          value={form.mobileNumber && form.mobileNumber.value}
        />
        <Text style={styles.error}>
          {form.mobileNumber && form.mobileNumber.error}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>{labels.nameFieldLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder={labels.name}
          onChangeText={value => setField({name: 'name', value})}
          value={form.name && form.name.value}
        />
        <Text style={styles.error}>{form.name && form.name.error}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>{labels.cityFieldLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder={labels.city}
          onChangeText={value => setField({name: 'city', value})}
          value={form.city && form.city.value}
        />
        <Text style={styles.error}>{form.city && form.city.error}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={labels.resetButton} onPress={resetFields} />
        <Button title={labels.submitButton} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditProfile;
