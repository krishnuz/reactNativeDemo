import React, {useState} from 'react';
import {View, TextInput, Button, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {
  createForm,
  getFormFields,
  validateForm,
  isFormValid,
} from '../../utils/formUtils';
import {useDispatch} from 'react-redux';
import {setUser} from '../../actions/user';

const labels = {
  mobileNumberPlaceholder: 'Enter mobile number',
  passwordPlaceholder: 'Enter password',
  clearButton: 'Clear',
  submitButton: 'Submit',
  signUpMessage: 'Do not have an account, ',
  signUpLink: 'sign up',
};
const initialFields = {
  mobileNumber: '',
  password: '',
};
const SignIn = ({navigation, setScreen}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(createForm(initialFields));
  const [error, setError] = useState('');
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
    setError('');
  };
  const handleSubmit = async () => {
    const updatedForm = validateForm(form);
    const formValid = isFormValid(updatedForm);
    if (formValid) {
      const formData = getFormFields(form);
      const user = await AsyncStorage.getItem(formData.mobileNumber);
      if (user) {
        const parsedUserData = JSON.parse(user);
        if (parsedUserData.password === formData.password) {
          delete parsedUserData.password;
          dispatch(setUser(parsedUserData));
          navigation.navigate('Dashboard');
        } else {
          setError('Please enter valid mobile number and password.');
        }
      } else {
        setError('Please enter valid mobile number and password.');
      }
    } else {
      setForm(updatedForm);
      setError('');
    }
  };
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.mobileNumberPlaceholder}
          keyboardType="numeric"
          onChangeText={value => setField({name: 'mobileNumber', value})}
          value={form.mobileNumber && form.mobileNumber.value}
        />
        <Text style={styles.error}>
          {form.mobileNumber && form.mobileNumber.error}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.passwordPlaceholder}
          onChangeText={value => setField({name: 'password', value})}
          value={form.password && form.password.value}
        />
        <Text style={styles.error}>{form.password && form.password.error}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={labels.clearButton} onPress={clearFields} />
        <Button title={labels.submitButton} onPress={handleSubmit} />
      </View>
      <Text style={styles.invalidCredentialsError}>{error}</Text>
      <View style={styles.linkTextContainer}>
        <Text style={styles.text}>{labels.signUpMessage}</Text>
        <TouchableOpacity onPress={() => setScreen('signUp')}>
          <Text style={styles.link}>{labels.signUpLink}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
