// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import LoginStyles from '../style/LoginStyle'; // 스타일 파일 import
import axios from 'axios';
const Login = ({ onLogin }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault(); // 기본 폼 제출 이벤트 방지
        setError(''); // 이전 에러 메시지 초기화
        console.log('로그인 정보 확인:', 'email_or_phone:' ,emailOrPhone,'\n', 'password:', password);
        try {
            const response = await axios.post('https://hizenberk.pythonanywhere.com/api/login/', {
                'email_or_phone': emailOrPhone,
                'password': password,
            });
            // setLogoutSuccess('');
            // // 로그인 성공 시 처리 (예: 토큰 저장, 리다이렉트 등)
            // console.log('데이터 체크:', response.data.refresh, "\n",
            //     response.data.access,"\n",
            //     response.data.user_info.company.name,"\n",
            //     response.data.user_info.department,"\n",
            //     response.data.user_info.name);
            // login(
            //     response.data.refresh,
            //     response.data.access,
            //     response.data.user_info.company.name,
            //     response.data.user_info.department,
            //     response.data.user_info.name,
            // )
            console.log('로그인 성공:', response.data);
            onLogin();
        } catch (err) {
            console.error('로그인 실패:', err.response?.data);
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
        </View>
    );
};

export default Login;
