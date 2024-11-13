import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import UseCarStyle from '../style/UseCarStyle';
const UseCar = () => {
    const [isDriving, setIsDriving] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const toggleDrivingStatus = () => {
        setIsDriving(!isDriving);
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
                    <Text
                        style={UseCarStyle.timeInput}
                        placeholder="시작 시간"
                        value={startTime}
                    />
                    <Text> ~ </Text>
                    <Text
                        style={UseCarStyle.timeInput}
                        placeholder="종료 시간"
                        value={endTime}
                    />
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
                        <Text style={UseCarStyle.buttonText}>{isDriving ? "종료" : "시작"}</Text>
                        <Text>운행 시간: {isDriving ? '00:20' : '00:00'}</Text>
                        <Text>운행 거리: {isDriving ? '0.6km' : '0.0km'}</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* 차량 사용 내용 리스트 */}
            <View style={UseCarStyle.detailsContainer}>
                <Text>운행 상세 내역</Text>
                {/* 예시 리스트 아이템 */}
                <Text>목적지: 목적지1</Text>
                <Text>거리: 11KM</Text>
            </View>
        </View>
    );
};

export default UseCar;
