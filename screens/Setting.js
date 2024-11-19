import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RadioButtonGroup from '../component/RadioButtonGroup';
import SettingStyle from '../style/SettingStyle'; // 스타일 파일 가져오기
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  const navigation = useNavigation();
  const [isScreenAlwaysOn, setIsScreenAlwaysOn] = useState(false);
  const [selectedTimeFormat, setSelectedTimeFormat] = useState('system');
  const [selectedScreenOrientation, setSelectedScreenOrientation] = useState('system');

  useEffect(() => {
    // 화면 방향 초기화
    if (selectedScreenOrientation === 'landscape') {
      Orientation.lockToLandscape();
    } else if (selectedScreenOrientation === 'portrait') {
      Orientation.lockToPortrait();
    } else {
      Orientation.unlockAllOrientations();
    }
  }, [selectedScreenOrientation]);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      // AsyncStorage에서 모든 로그인 정보 삭제
      await AsyncStorage.removeItem('access');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('department');
      await AsyncStorage.removeItem('position');

      Alert.alert('로그아웃', '로그아웃이 완료되었습니다.');
      navigation.navigate('Login'); // 로그인 화면으로 이동
    } catch (error) {
      Alert.alert('로그아웃 실패', '네트워크 오류가 발생했습니다.');
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <View style={SettingStyle.container}>
      {/* 운행 중 항상 화면 켜짐 */}
      <View style={SettingStyle.optionRow}>
        <Text style={SettingStyle.label}>운행중 항상 화면 켜짐</Text>
        <Switch
          value={isScreenAlwaysOn}
          onValueChange={setIsScreenAlwaysOn}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isScreenAlwaysOn ? '#007aff' : '#f4f3f4'}
        />
      </View>

      {/* 시간 설정 */}
      <Text style={SettingStyle.sectionTitle}>시간</Text>
      <View style={SettingStyle.optionRow}>
        <RadioButtonGroup
          options={[
            { label: '시스템', value: 'system' },
            { label: '12시', value: '12-hour' },
            { label: '24시', value: '24-hour' },
          ]}
          selectedValue={selectedTimeFormat}
          onValueChange={setSelectedTimeFormat}
        />
      </View>
      <View style={SettingStyle.separator} />

      {/* 화면 고정 */}
      <Text style={SettingStyle.sectionTitle}>화면 고정</Text>
      <View style={SettingStyle.optionRow}>
        <RadioButtonGroup
          options={[
            { label: '시스템', value: 'system' },
            { label: '가로', value: 'landscape' },
            { label: '세로', value: 'portrait' },
          ]}
          selectedValue={selectedScreenOrientation}
          onValueChange={setSelectedScreenOrientation}
        />
      </View>
      <View style={SettingStyle.separator} />

      {/* 비밀번호 변경 버튼 */}
      <TouchableOpacity
        style={SettingStyle.fullWidthButton}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={SettingStyle.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>

      {/* 공지사항 버튼 */}
      <TouchableOpacity
        style={SettingStyle.fullWidthButton}
        onPress={() => navigation.navigate('Notice')}>
        <Text style={SettingStyle.buttonText}>공지사항</Text>
      </TouchableOpacity>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={[SettingStyle.fullWidthButton, SettingStyle.logoutButton]}
        onPress={handleLogout}>
        <Text style={SettingStyle.buttonText}>로그아웃</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Setting;
