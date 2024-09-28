import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export default styles;
