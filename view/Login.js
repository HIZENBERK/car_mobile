import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import LoginStyles from '../style/LoginStyle'; // 스타일 파일 import
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import 추가

const Login = ({ onLogin }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError(''); // 이전 에러 메시지 초기화
        console.log('로그인 정보 확인:', 'email_or_phone:', emailOrPhone, '\n', 'password:', password);

        try {
            // 서버에 로그인 요청 보내기
            const response = await axios.post('https://hizenberk.pythonanywhere.com/api/login/', {
                'email_or_phone': emailOrPhone,  // 이메일 또는 전화번호
                'password': password,  // 비밀번호
            });

            // 로그인 성공시 콘솔에 데이터 출력
            console.log('로그인 성공:', response.data);

            // 서버로부터 받은 accessToken과 email, userId를 추출하여 AsyncStorage에 저장
            const { access } = response.data;
            const { email, id } = response.data.user_info;  // user_info에서 email, id 추출

            if (!access) {
                throw new Error('서버로부터 유효한 토큰을 받지 못했습니다.');
            }

            // 토큰 저장 (비동기 작업에 대해 await 사용)
            await AsyncStorage.setItem('access', access);
            console.log('토큰 저장 완료:', access);

            // 이메일 값이 있을 경우 AsyncStorage에 이메일 저장
            if (email) {
                await AsyncStorage.setItem('email', email);
                console.log('이메일 저장 완료:', email);
            } else {
                console.warn('서버에서 이메일 값을 받지 못했습니다.');
            }

            // userId 값이 있을 경우 AsyncStorage에 userId 저장
            if (id) {
                await AsyncStorage.setItem('userId', id.toString());
                console.log('userId 저장 완료:', id);
            } else {
                console.warn('서버에서 userId 값을 받지 못했습니다.');
            }

            // onLogin 콜백 호출하여 로그인 후의 작업 진행
            onLogin();
        } catch (err) {
            // 오류 처리: 로그인 실패 또는 네트워크 오류
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
