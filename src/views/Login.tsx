import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSetProfile} from '../storage';
import {NavigationProps} from '../type';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000000',
  },
  loginLogo: {
    width: 250,
    height: 100,
    objectFit: 'contain',
    marginBottom: 25,
  },
  inputField: {
    width: 280,
    color: '#000000',
    borderColor: 'white',
    marginTop: 5,
  },
  buttonLogin: {
    width: 280,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    marginTop: 25,
    backgroundColor: '#00d1b2',
  },
  textButtonLogin: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  mainErrorWrap: {
    width: 280,
  },
  errorMessage: {
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
  },
});

const Login = ({navigation}: NavigationProps) => {
  const setProfile = useSetProfile();
  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');

  const onLoggin = () => {
    if (username && password) {
      setProfile({
        username,
        password,
        address:
          'Jl. Pasir No.19, Pd. Karya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15412',
        phone: ' 0821-3825-6345',
        about: `${username} adalah platform penyediaan bahan baku untuk manufaktur yang melakukan Just- In - Time supply chain agar mencapai efisiensi biaya tertinggi, melakukan agregasi permintaan untuk mendapatkan harga terbaik dan memberikan fleksibilitas pembayaran tempo untuk solusi cashflow perusahaan manufaktur`,
      });
      Toast.show({
        type: 'success',
        text1: 'You have successfully logged in',
      });
      setTimeout(() => {
        navigation.navigate('Products');
      }, 2000);
    } else {
      if (!username) {
        setErrorUsername('You must fill in the username');
      }
      if (!password) {
        setErrorPassword('You must fill in the password');
      }
    }
  };

  return (
    <View style={styles.Wrapper}>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.loginLogo}
      />
      <TextInput
        placeholder="Username"
        underlineColorAndroid="#000000"
        placeholderTextColor="#000000"
        style={styles.inputField}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          setErrorUsername('');
          setUsername(e.nativeEvent.text);
        }}
      />
      <View style={styles.mainErrorWrap}>
        <Text style={styles.errorMessage}>{errorUsername}</Text>
      </View>
      <TextInput
        placeholder="Password"
        underlineColorAndroid="#000000"
        placeholderTextColor="#000000"
        secureTextEntry={true}
        style={styles.inputField}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          setErrorPassword('');
          setPassword(e.nativeEvent.text);
        }}
      />
      <View style={styles.mainErrorWrap}>
        <Text style={styles.errorMessage}>{errorPassword}</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={onLoggin}>
        <Text style={styles.textButtonLogin}>Login</Text>
      </TouchableOpacity>
      <Toast position="top" topOffset={20} />
    </View>
  );
};

export default Login;
