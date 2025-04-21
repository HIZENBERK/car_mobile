import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MainStyle from '../style/MainStyle';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MaintenanceRegistration = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { vehicleId, licensePlateNumber, totalMileage, vehicleType } = route.params;

    const [maintenanceType, setMaintenanceType] = useState(''); // 정비 종류 상태
    const [cost, setCost] = useState(''); // 정비 비용 상태
    const [notes, setNotes] = useState(''); // 정비 노트 상태

    // 정비 등록 함수
    const registerMaintenance = async () => {
        if (!maintenanceType || !cost) {
            Alert.alert('오류', '모든 필수 항목을 입력해주세요.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert('오류', '로그인 토큰이 없습니다. 다시 로그인해 주세요.');
                return;
            }

            // 정비 등록 요청
            const response = await axios.post('https://hizenberk.pythonanywhere.com/api/maintenances/create/', {
                vehicle: vehicleId,
                maintenance_type: maintenanceType,
                maintenance_cost: parseFloat(cost),
                maintenance_description: notes,
                maintenance_date: new Date().toISOString().split('T')[0], // 현재 날짜를 정비 일자로 사용
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                Alert.alert('성공', '정비 등록이 완료되었습니다.');
                navigation.goBack(); // 이전 화면으로 이동
            } else {
                Alert.alert('오류', '정비 등록에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('서버 오류:', error);
            Alert.alert('오류', '서버와의 연결에 실패했습니다.');
        }
    };

    return (
        <View style={MainStyle.container}>
            <Text style={MainStyle.headerText}>정비 등록 - {vehicleType} ({licensePlateNumber})</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>정비 종류</Text>
                <Picker
                    selectedValue={maintenanceType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setMaintenanceType(itemValue)}
                >
                    <Picker.Item label="정비 유형을 선택하세요" value="" />
                    <Picker.Item label="엔진 오일 교체" value="engine_oil_change" />
                    <Picker.Item label="에어컨 필터 교체" value="air_filter_change" />
                    <Picker.Item label="브레이크 패드 교체" value="brake_pad_change" />
                    <Picker.Item label="타이어 교체" value="tire_change" />
                    <Picker.Item label="기타" value="other" />
                </Picker>
                <Text style={styles.label}>정비 비용</Text>
                <TextInput
                    style={styles.input}
                    placeholder="정비 비용을 입력하세요"
                    value={cost}
                    onChangeText={setCost}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>추가 노트 (선택사항)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="정비 관련 노트를 입력하세요"
                    value={notes}
                    onChangeText={setNotes}
                />
            </View>
            <Button title="정비 등록" onPress={registerMaintenance} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
});

export default MaintenanceRegistration;
