import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import SettingStyle from '../style/SettingStyle'; // 스타일 가져오기


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 비밀번호 변경 처리 로직 (API 호출 등)
    Alert.alert('비밀번호 변경 완료', '비밀번호가 성공적으로 변경되었습니다.');
  };

  const handleConfirm = () => {
    Alert.alert('확인', '변경된 비밀번호가 확인되었습니다.');
  };

  return (
    <View style={SettingStyle.container}>
      {/* 현재 비밀번호 */}
      <Text style={SettingStyle.sectionTitle}>현재 비밀번호</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="현재 비밀번호 입력"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* 새로운 비밀번호 */}
      <Text style={SettingStyle.sectionTitle}>새로운 비밀번호</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="새로운 비밀번호 입력"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* 비밀번호 확인 */}
      <Text style={SettingStyle.sectionTitle}>새로운 비밀번호 확인</Text>
      <TextInput
        style={SettingStyle.inputField}
        placeholder="새로운 비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* 확인 버튼 */}
      <TouchableOpacity style={SettingStyle.confirmButton} onPress={handleConfirm}>
        <Text style={{ fontSize: 16, color: '#007aff' }}>확인</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ChangePassword;
