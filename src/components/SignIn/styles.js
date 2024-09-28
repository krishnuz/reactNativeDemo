import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
  },
  linkTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    color: 'blue',
  },
  inputContainer: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  invalidCredentialsError: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default styles;
