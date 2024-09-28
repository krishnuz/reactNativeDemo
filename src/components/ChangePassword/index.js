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
  currentPassword: 'Enter current password',
  newPassword: 'Enter new password',
  clearButton: 'Clear',
  submitButton: 'Submit',
};
const initialFields = {
  currentPassword: '',
  newPassword: '',
};
const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [form, setForm] = useState(createForm(initialFields));
  const [wrongPasswordError, setWrongPasswordError] = useState('');
  const setField = ({name, value}) => {
    setForm({
      ...form,
      [name]: {
        value,
        error: value ? '' : 'Please enter a value.',
      },
    });
  };
  const clearFields = () => {
    setForm(createForm(initialFields));
    setWrongPasswordError('');
  };
  const handleSubmit = async () => {
    const updatedForm = validateForm(form);
    const formValid = isFormValid(updatedForm);
    if (formValid) {
      const data = getFormFields(form);
      let storedUserData = await AsyncStorage.getItem(user.mobileNumber);
      storedUserData = JSON.parse(storedUserData);
      if (data.currentPassword === storedUserData.password) {
        try {
          await AsyncStorage.setItem(
            user.mobileNumber,
            JSON.stringify({...storedUserData, password: data.newPassword}),
          );
        } catch (error) {
          console.log('Error in saving data to AsyncStorage -', error);
        }
        dispatch(updateUser(data));
        navigation.navigate('Dashboard');
      } else {
        setWrongPasswordError(
          'Please enter correct value of current password.',
        );
      }
    } else {
      setForm(updatedForm);
      setWrongPasswordError('');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.currentPassword}
          onChangeText={value => setField({name: 'currentPassword', value})}
          value={form.currentPassword && form.currentPassword.value}
        />
        <Text style={styles.error}>
          {form.currentPassword && form.currentPassword.error}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.newPassword}
          onChangeText={value => setField({name: 'newPassword', value})}
          value={form.newPassword && form.newPassword.value}
        />
        <Text style={styles.error}>
          {form.newPassword && form.newPassword.error}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={labels.clearButton} onPress={clearFields} />
        <Button title={labels.submitButton} onPress={handleSubmit} />
      </View>
      <Text style={styles.wrongPasswordError}>{wrongPasswordError}</Text>
    </View>
  );
};

export default ChangePassword;
