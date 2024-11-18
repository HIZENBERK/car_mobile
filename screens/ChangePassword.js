import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SettingStyle from '../style/SettingStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState(''); // 이메일/전화번호 입력 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (!accessToken) {
          setError('인증 토큰이 없습니다. 다시 로그인해 주세요.');
          navigation.navigate('Login');
          return;
        }

        const response = await axios.get('https://hizenberk.pythonanywhere.com/api/users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setUserId(response.data.id);
        } else {
          setError('사용자 정보를 가져오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('사용자 정보 조회 오류:', err.message);
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('비밀번호 확인', '새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (!accessToken) {
        setError('액세스 토큰이 없습니다. 다시 로그인 해주세요.');
        navigation.navigate('Login');
        setLoading(false);
        return;
      }

      // 현재 비밀번호 확인
      const loginResponse = await axios.post(
        'https://hizenberk.pythonanywhere.com/api/login/',
        {
          email_or_phone: emailOrPhone, // 사용자가 입력한 이메일/전화번호
          password: currentPassword,
        }
      );

      if (loginResponse.status !== 200 || !loginResponse.data.access) {
        Alert.alert('현재 비밀번호 확인 실패', '현재 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }

      // 새로운 비밀번호 설정
      const response = await axios.patch(
        `https://hizenberk.pythonanywhere.com/api/users/${userId}/`,
        {
          password: newPassword,
          password2: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('비밀번호 변경 성공', '비밀번호가 성공적으로 변경되었습니다.');
        navigation.goBack();
      } else {
        setError('비밀번호 변경 실패. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error('비밀번호 변경 오류:', err.message);
      setError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={SettingStyle.container}>
      <Text style={SettingStyle.sectionTitle}>이메일 또는 전화번호</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="이메일 또는 전화번호 입력"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />

      <Text style={SettingStyle.sectionTitle}>현재 비밀번호</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="현재 비밀번호 입력"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={SettingStyle.sectionTitle}>새로운 비밀번호</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="새로운 비밀번호 입력"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={SettingStyle.sectionTitle}>새로운 비밀번호 확인</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="새로운 비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

      <TouchableOpacity
        style={[SettingStyle.confirmButton, loading ? { opacity: 0.5 } : {}]}
        onPress={loading ? null : handleSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ fontSize: 16, color: '#007aff' }}>비밀번호 변경</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
