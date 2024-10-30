import React, { useState } from 'react';
import {
  View, TextInput, Alert, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { API_BASE_URL } from './API';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      return data; // Trả về danh sách người dùng
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      return [];
    }
  };

  // Hàm kiểm tra xem email đã được đăng ký hay chưa
  const checkEmailExists = async (email: string) => {
    const users = await fetchUsers();
    return users.some((user: { email: string; }) => user.email === email); // Kiểm tra xem email có trong danh sách không
  };

  // Hàm đăng ký tài khoản bằng API
  const registerAccount = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ email và mật khẩu.');
      return;
    }

    // Kiểm tra xem email đã tồn tại chưa
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Lỗi', 'Email này đã được đăng ký.');
      return;
    }

    try {
      setLoading(true); // Hiển thị trạng thái loading
      const response = await fetch('http://10.0.2.2:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Thành công', 'Tài khoản đã được đăng ký!');
        navigation.goBack(); // Quay lại màn hình login
      } else {
        Alert.alert('Lỗi', data.message || 'Đăng ký không thành công.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng ký.');
    } finally {
      setLoading(false); // Tắt trạng thái loading
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

      <TouchableOpacity
        onPress={registerAccount}
        style={[styles.button, loading && { backgroundColor: 'black' }]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</Text>
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
    backgroundColor: 'black',
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
