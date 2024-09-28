import React, {useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import SignIn from '../SignIn';
import styles from './styles';
import SignUp from '../SignUp';

const labels = {
  heading: 'Welcome to the app',
  description: 'You can use the application to view list of products.',
  signInButton: 'Sign In',
  signUpButton: 'Sign Up',
};
const HomePage = ({navigation}) => {
  const [screen, setScreen] = useState('signIn');
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>{labels.heading}</Text>
        <Text>{labels.description}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            title={labels.signInButton}
            onPress={() => setScreen('signIn')}
          />
          <Button
            title={labels.signUpButton}
            onPress={() => setScreen('signUp')}
          />
        </View>
        {screen === 'signIn' && (
          <SignIn navigation={navigation} setScreen={setScreen} />
        )}
        {screen === 'signUp' && <SignUp setScreen={setScreen} />}
      </View>
    </ScrollView>
  );
};

export default HomePage;
