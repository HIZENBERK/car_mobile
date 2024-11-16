import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UseCarStyle from '../style/UseCarStyle';

const UseCar = () => {
    const [isDriving, setIsDriving] = useState(false);
    const [drivingTime, setDrivingTime] = useState(0); // 운행 시간을 초 단위로 관리
    const [intervalId, setIntervalId] = useState(null); // setInterval을 관리하기 위한 상태
    const [startTime, setStartTime] = useState(null); // 운행 시작 시간
    const [endTime, setEndTime] = useState(null); // 운행 종료 시간

    const toggleDrivingStatus = () => {
        if (isDriving) {
            // 운행 종료
            clearInterval(intervalId); // 기존 타이머 정리
            setIntervalId(null); // 타이머 ID 초기화
            setEndTime(new Date()); // 종료 시간을 현재 시간으로 설정
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
                <Text style={UseCarStyle.carInfo}>[현대] 123가 1234 12334</Text>
                <Text style={UseCarStyle.distance}>누적 주행거리: 123.456km</Text>
            </View>

            {/* 운행시간, 목적지, 출발지 입력 */}
            <View style={UseCarStyle.inputContainer}>
                <Text>운행 날짜: 2024-5-5(월)</Text>
                <Text>운행 시간</Text>
                <View style={UseCarStyle.timeInputContainer}>
                    <Text style={UseCarStyle.timeInput}>시작 시간: {formatDate(startTime)}</Text>
                    <Text> ~ </Text>
                    <Text style={UseCarStyle.timeInput}>종료 시간: {formatDate(endTime)}</Text>
                </View>
                <Text>운행 목적: </Text>
                <Text>운행 종류: </Text>
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

            {/* 차량 사용 내용 리스트 */}
            <View style={UseCarStyle.detailsContainer}>
                <Text>운행 상세 내역</Text>
                {/* 예시 리스트 아이템 */}
                <Text>목적지: 목적지1</Text>
                <Text>거리: 11KM</Text>
                <Text>운행 시간 기록: {formatTime(drivingTime)}</Text>
            </View>
        </View>
    );
};

export default UseCar;
