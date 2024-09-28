import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../../actions/user';

const labels = {
  welcomeUser: 'Welcome, ',
  logoutButton: 'Logout',
  editProfileButton: 'Edit profile',
  changePasswordButton: 'Change password',
  viewProductsButton: 'View products',
};
const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(resetUser());
    navigation.push('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {labels.welcomeUser}
          {user.data && user.data.name}
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutLink}>{labels.logoutButton}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={labels.editProfileButton}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          color="black"
        />
        <Button
          title={labels.changePasswordButton}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
          color="black"
        />
        <Button
          title={labels.viewProductsButton}
          onPress={() => {
            navigation.navigate('Products');
          }}
          color="black"
        />
      </View>
    </View>
  );
};

export default Dashboard;
