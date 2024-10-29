import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity, Alert,
  Button, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { useNavigation, useRoute } from '@react-navigation/native';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userImage, setUserImage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<{ email: string; password: string; poster_path?: string } | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setLoggedInUser(parsedUser);
        setUserImage(parsedUser.poster_path || '');
      }
    };
    checkLoginStatus();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/users');
      return await response.json();
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      return [];
    }
  };

  const handleLogin = async () => {
    const users = await fetchUsers();
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      setLoggedInUser(user);
      setUserImage(user.poster_path || '');
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } else {
      Alert.alert('Thất bại', 'Email hoặc mật khẩu không đúng!');
    }
  };

  const handleLogout = async () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
    setUserImage('');
    await AsyncStorage.removeItem('userData');
  };

  const updateUserImage = async () => {
    if (!loggedInUser) return;

    try {
      const response = await fetch(`http://10.0.2.2:5000/users/${loggedInUser.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ poster_path: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi khi cập nhật:', errorData);
        Alert.alert('Thất bại', 'Cập nhật ảnh không thành công.');
        return;
      }

      Alert.alert('Thành công', 'Cập nhật ảnh thành công!');
      setUserImage(imageUrl);
      const updatedUser = { ...loggedInUser, poster_path: imageUrl };
      setLoggedInUser(updatedUser);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Lỗi khi kết nối:', error);
      Alert.alert('Thất bại', 'Không thể kết nối đến server.');
    }
  };

  const toggleVisibility = () => setIsHidden(!isHidden);

  return (
    <View style={styles.container}>
      {!loggedInUser ? (
        <>
          <Text style={styles.title}>LOGIN</Text>
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
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
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
        </>
      ) : (
        <View style={styles.loggedInContainer}>
          <View style={styles.iconPersonContainer}>
          <TouchableOpacity onPress={toggleVisibility}>
            <Image
              source={userImage ? { uri: userImage } : require('../assets/images/iconPerson.png')}
              style={styles.iconPerson}
              onError={() => Alert.alert('Lỗi', 'Không thể tải ảnh')}
            />
          </TouchableOpacity>
          </View>
          <Text style={styles.loggedInText}>Email: {loggedInUser.email}</Text>
          <View style={styles.back}>
            <Button
              title="Back"
              color="black"
              onPress={() => navigation.navigate('Popular', { userImage })}
            />
          </View>
          {!isHidden && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nhập đường link ảnh"
                placeholderTextColor="#AAAAAA"
                value={imageUrl}
                onChangeText={setImageUrl}
              />
              <TouchableOpacity onPress={updateUserImage} style={styles.button}>
                <Text style={styles.buttonText}>Cập nhật ảnh</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: 'black',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loggedInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  loggedInText:{
    color: 'white',
    paddingVertical: 10,
    fontSize: 20
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconPerson: {
    height: 125,
    width: 125,
    borderRadius: 62.5,
  },
  back: {
    width: 100,
    position: 'absolute',
    top: 20,
    left: 0,
    marginTop: 20,
  },
  registerText: {
    color: 'yellow',
    fontSize: 16,
    marginTop: 10,
  },
  iconPersonContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default Login;
