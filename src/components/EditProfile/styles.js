import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
  },
  inputContainer: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default styles;
