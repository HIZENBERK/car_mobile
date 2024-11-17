import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation
import RadioButtonGroup from '../component/RadioButtonGroup'; // 라디오 버튼 컴포넌트 가져오기
import SettingStyle from '../style/SettingStyle'; // 스타일 파일 가져오기
import Orientation from 'react-native-orientation-locker'; // react-native-orientation-locker 임포트

const Setting = () => {
  const navigation = useNavigation(); // 내비게이션을 사용하여 페이지 간 이동
  const [isScreenAlwaysOn, setIsScreenAlwaysOn] = useState(false);
  const [selectedTimeFormat, setSelectedTimeFormat] = useState('system');
  const [selectedScreenOrientation, setSelectedScreenOrientation] = useState('system');

  useEffect(() => {
    // 화면 방향을 초기화합니다.
    if (selectedScreenOrientation === 'landscape') {
      Orientation.lockToLandscape();
    } else if (selectedScreenOrientation === 'portrait') {
      Orientation.lockToPortrait();
    } else {
      // 시스템 기본 설정
      Orientation.unlockAllOrientations();
    }
  }, [selectedScreenOrientation]);

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
        onPress={() => Alert.alert('로그아웃', '로그아웃이 완료되었습니다.')}>
        <Text style={SettingStyle.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
