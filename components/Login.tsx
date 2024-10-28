import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  View, TextInput, Button, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Đăng ký tài khoản</Text>
      </TouchableOpacity>

      <View style={styles.back}>
        <Button
          title="Back"
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: 200,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'black',
  },
  registerText: {
    color: 'yellow',
    fontSize: 16,
    marginTop: 10,
  },
  back: {
    width: 100,
    position: 'absolute',
    top: 20,
    left: 0,
    marginTop: 20,
  },
});

export default Login;
