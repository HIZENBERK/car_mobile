import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import LoginStyles from '../style/LoginStyle'; // 스타일 파일 import
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import 추가

const Login = ({ onLogin, navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // 이전 에러 메시지 초기화
    console.log('로그인 정보 확인:', 'email_or_phone:', emailOrPhone, '\n', 'password:', password);

    try {
      const response = await axios.post('https://hizenberk.pythonanywhere.com/api/login/', {
        'email_or_phone': emailOrPhone,
        'password': password,
      });

      console.log('로그인 성공:', response.data);

      const { access } = response.data;
      const { email, id, department, name, position } = response.data.user_info;

      if (!access) {
        throw new Error('서버로부터 유효한 토큰을 받지 못했습니다.');
      }

      await AsyncStorage.setItem('access', access);
      await AsyncStorage.setItem('email', email || '');
      await AsyncStorage.setItem('userId', id?.toString() || '');
      await AsyncStorage.setItem('name', name || '');
      await AsyncStorage.setItem('department', department || '');
      await AsyncStorage.setItem('position', position || '');

      if (onLogin) {
        onLogin(); // 로그인 성공 후 상태 변경
      }
      navigation.navigate('Main'); // Main 화면으로 이동
    } catch (err) {
      console.error('로그인 실패:', err.response?.data || err.message);
      setError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>로그인</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="전화번호 또는 이메일"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
      {error ? <Text style={LoginStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default Login;
