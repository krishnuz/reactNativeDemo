import React, {useState} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {
  createForm,
  getFormFields,
  isFormValid,
  validateForm,
} from '../../utils/formUtils';

const labels = {
  mobileNumberPlaceholder: 'Enter mobile number',
  passwordPlaceholder: 'Enter password',
  confirmPasswordPlaceholder: 'Re-enter password',
  name: 'Enter name',
  city: 'Enter city',
  clearButton: 'Clear',
  submitButton: 'Submit',
  signInMessage: 'Aready have an account, ',
  signInLink: 'sign in',
};

const initialFields = {
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  name: '',
  city: '',
};
const SignUp = ({setScreen}) => {
  const [form, setForm] = useState(createForm(initialFields));
  const setField = ({name, value}) => {
    setForm({
      ...form,
      [name]: {
        value,
        error: value ? '' : 'Please enter a value.',
      },
    });
  };
  const clearForm = () => {
    setForm(createForm(initialFields));
  };
  const handleSubmit = async () => {
    const updatedForm = validateForm(form);
    const formValid = isFormValid(updatedForm);
    if (formValid) {
      const data = getFormFields(form);
      delete data.confirmPassword;
      try {
        await AsyncStorage.setItem(data.mobileNumber, JSON.stringify(data));
        setScreen('signIn');
      } catch (error) {
        console.log('Error in saving data to AsyncStorage -', error);
      }
    } else {
      setForm(updatedForm);
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.confirmPasswordPlaceholder}
          onChangeText={value => setField({name: 'confirmPassword', value})}
          value={form.confirmPassword && form.confirmPassword.value}
        />
        <Text style={styles.error}>
          {form.confirmPassword && form.confirmPassword.error}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.name}
          onChangeText={value => setField({name: 'name', value})}
          value={form.name && form.name.value}
        />
        <Text style={styles.error}>{form.name && form.name.error}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={labels.city}
          onChangeText={value => setField({name: 'city', value})}
          value={form.city && form.city.value}
        />
        <Text style={styles.error}>{form.city && form.city.error}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={labels.clearButton} onPress={clearForm} />
        <Button title={labels.submitButton} onPress={handleSubmit} />
      </View>
      <View style={styles.linkTextContainer}>
        <Text style={styles.text}>{labels.signInMessage}</Text>
        <TouchableOpacity onPress={() => setScreen('signIn')}>
          <Text style={styles.link}>{labels.signInLink}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
