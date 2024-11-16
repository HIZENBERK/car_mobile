import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import UseCarStyle from '../style/UseCarStyle';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UseCar = () => {
    const [isDriving, setIsDriving] = useState(false);
    const [drivingTime, setDrivingTime] = useState(0); // 운행 시간을 초 단위로 관리
    const [intervalId, setIntervalId] = useState(null); // setInterval을 관리하기 위한 상태
    const [startTime, setStartTime] = useState(null); // 운행 시작 시간
    const [endTime, setEndTime] = useState(null); // 운행 종료 시간
    const [departureLocation, setDepartureLocation] = useState(''); // 출발지
    const [arrivalLocation, setArrivalLocation] = useState(''); // 도착지
    const [fuelCost, setFuelCost] = useState(''); // 유류비
    const [tollFee, setTollFee] = useState(''); // 통행료
    const [otherCosts, setOtherCosts] = useState(''); // 기타 비용
    const route = useRoute();
    const { vehicleId, licensePlateNumber, totalMileage } = route.params; // 차량 ID를 가져옴

    const toggleDrivingStatus = async () => {
        if (isDriving) {
            // 운행 종료
            clearInterval(intervalId); // 기존 타이머 정리
            setIntervalId(null); // 타이머 ID 초기화
            setEndTime(new Date()); // 종료 시간을 현재 시간으로 설정
            await saveDrivingRecord(); // 운행 기록 저장
        } else {
            // 운행 시작
            setStartTime(new Date()); // 시작 시간을 현재 시간으로 설정
            setEndTime(null); // 종료 시간을 초기화
            setDrivingTime(0); // 운행 시간을 초기화
            const id = setInterval(() => {
                setDrivingTime((prevTime) => prevTime + 1);
            }, 1000); // 매 초마다 drivingTime을 1씩 증가
            setIntervalId(id); // 타이머 ID 저장
        }
        setIsDriving(!isDriving);
    };

    const saveDrivingRecord = async () => {
        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const recordData = {
                vehicle: vehicleId,
                departure_location: departureLocation,
                arrival_location: arrivalLocation,
                departure_mileage: parseFloat(totalMileage) || 0, // 예시 값, 실제 값으로 대체 필요
                arrival_mileage: parseFloat(totalMileage) + 300, // 누적 주행거리값 + 500으로 설정 사실상 더미. 좌표 찍는걸 기반으로 운행된 km를 받아야함
                departure_time: startTime,
                arrival_time: new Date(),
                driving_purpose: 'commuting', // 예시 값, 실제 값으로 대체 필요
                fuel_cost: fuelCost ? parseFloat(fuelCost) : null,
                toll_fee: tollFee ? parseFloat(tollFee) : null,
                other_costs: otherCosts ? parseFloat(otherCosts) : null,
                coordinates: [{ latitude: 37.7749, longitude: -122.4194 }], // 더미 좌표 데이터
            };

            const response = await axios.post('https://hizenberk.pythonanywhere.com/api/driving-records/create/', recordData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                Alert.alert('성공', '운행 기록이 성공적으로 저장되었습니다.');
            } else {
                Alert.alert('오류', '운행 기록 저장에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                console.error('운행 기록 저장 오류:', error.response.data);
            } else {
                console.error('운행 기록 저장 오류:', error.message);
            }
            Alert.alert('오류', '운행 기록 저장 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        // 컴포넌트가 언마운트되거나 운행 종료 시 타이머 정리
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    // 시간 포맷팅 함수 (Date 객체를 시간:분 형식으로 변환)
    const formatDate = (date) => {
        if (!date) return '-';
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // 운행 시간 포맷팅 함수 (초 단위를 시간:분:초 형식으로 변환)
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={UseCarStyle.container}>
            {/* 상단 차량 정보 및 주행거리 */}
            <View style={UseCarStyle.header}>
                <Text style={UseCarStyle.carInfo}>차량 번호판: {licensePlateNumber}</Text>
                <Text style={UseCarStyle.distance}>누적 주행거리: {totalMileage}km</Text>
            </View>

            {/* 운행시간, 목적지, 출발지 입력 */}
            <View style={UseCarStyle.inputContainer}>
                <Text>운행 날짜: {new Date().toLocaleDateString()}</Text>
                <Text>운행 시간</Text>
                <View style={UseCarStyle.timeInputContainer}>
                    <Text style={UseCarStyle.timeInput}>시작 시간: {formatDate(startTime)}</Text>
                    <Text> ~ </Text>
                    <Text style={UseCarStyle.timeInput}>종료 시간: {formatDate(endTime)}</Text>
                </View>
                <TextInput
                    style={UseCarStyle.textInput}
                    placeholder="출발지"
                    value={departureLocation}
                    onChangeText={setDepartureLocation}
                />
                <TextInput
                    style={UseCarStyle.textInput}
                    placeholder="도착지"
                    value={arrivalLocation}
                    onChangeText={setArrivalLocation}
                />
                <TextInput
                    style={UseCarStyle.textInput}
                    placeholder="유류비"
                    value={fuelCost}
                    onChangeText={setFuelCost}
                    keyboardType="numeric"
                />
                <TextInput
                    style={UseCarStyle.textInput}
                    placeholder="통행료"
                    value={tollFee}
                    onChangeText={setTollFee}
                    keyboardType="numeric"
                />
                <TextInput
                    style={UseCarStyle.textInput}
                    placeholder="기타 비용"
                    value={otherCosts}
                    onChangeText={setOtherCosts}
                    keyboardType="numeric"
                />
            </View>

            {/* 운행기록 시작/종료 버튼 */}
            <View style={UseCarStyle.recordContainer}>
                <Text style={UseCarStyle.recordTitle}>운행기록</Text>
                <View style={UseCarStyle.fullWidthButtonContainer}>
                    <TouchableOpacity
                        style={UseCarStyle.fullWidthButton}
                        onPress={toggleDrivingStatus}
                    >
                        <Text style={UseCarStyle.buttonText}>
                            {isDriving ? '종료' : '시작'}
                        </Text>
                        <Text style={UseCarStyle.buttonText}>
                            운행 시간: {formatTime(drivingTime)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default UseCar;
