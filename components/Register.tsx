import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hàm lưu tài khoản vào AsyncStorage
  const saveAccount = async () => {
    try {
      const account = { email, password };

      // Lưu thông tin tài khoản vào AsyncStorage
      await AsyncStorage.setItem(email, JSON.stringify(account));
      Alert.alert('Thành công', 'Tài khoản đã được đăng ký!');

      // Điều hướng về màn hình Login sau khi đăng ký
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi lưu tài khoản.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG KÝ</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={saveAccount} style={styles.button}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
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
    backgroundColor: '#3b5998',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: 'yellow',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Register;
