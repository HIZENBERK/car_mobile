import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid, Platform, Modal} from 'react-native';
import UseCarStyle from '../style/UseCarStyle';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import AddressSearch from '../component/AddressSearch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import calculateDistance from '../component/calculateDistance'; // 아이콘을 사용하려면 설치 필요


const UseCar = () => {
    const [isDriving, setIsDriving] = useState(false);
    const [drivingTime, setDrivingTime] = useState(0); // 운행 시간을 초 단위로 관리
    const [intervalId, setIntervalId] = useState(null); // setInterval을 관리하기 위한 상태
    const [startTime, setStartTime] = useState(null); // 운행 시작 시간
    const [endTime, setEndTime] = useState(null); // 운행 종료 시간
    const [departureLocation, setDepartureLocation] = useState('출발지 입력'); // 출발지
    const [arrivalLocation, setArrivalLocation] = useState('도착지 입력'); // 도착지
    const [fuelCost, setFuelCost] = useState(''); // 유류비
    const [tollFee, setTollFee] = useState(''); // 통행료
    const [otherCosts, setOtherCosts] = useState(''); // 기타 비용
    const [coordinates, setCoordinates] = useState(''); //좌표 저장 변수
    const route = useRoute();
    const { vehicleId, licensePlateNumber, totalMileage, vehicleType } = route.params; // 차량 ID를 가져옴
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); //검색창 모달 열기 여부
    const [selectedInput, setSelectedInput] = useState(null); //어떤 차량에 대해서 저장하는지에 대한 변수
    const [isCostModalVisible, setIsCostModalVisible] = useState(false); // 비용 입력 모달 보이기 여부
    const [drivingPurpose, setDrivingPurpose] = useState('commuting'); // 기본 용도
    const [afterTotalMileage, setAfterTotalMileage] = useState('');
    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: '위치 권한 요청',
                        message: '운행 기록을 위해 위치 접근 권한이 필요합니다.',
                        buttonNeutral: '나중에',
                        buttonNegative: '거부',
                        buttonPositive: '허용',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            return true;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    const toggleDrivingStatus = async () => {
        if (isDriving) {
            // 운행 종료
            clearInterval(intervalId); // 기존 타이머 정리
            setIntervalId(null); // 타이머 ID 초기화
            setEndTime(new Date()); // 종료 시간을 현재 시간으로 설정

            // 마지막 좌표 저장
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates((prevCoords) => {
                        if (
                            prevCoords.length === 0 ||
                            calculateDistance(
                                prevCoords[prevCoords.length - 1].latitude,
                                prevCoords[prevCoords.length - 1].longitude,
                                latitude,
                                longitude
                            ) >= 300
                        ) {
                            // 이전 좌표가 없거나, 마지막 좌표와의 거리가 300m 이상인 경우 저장
                            return [...prevCoords, { latitude, longitude }];
                        }
                        return prevCoords; // 300m 미만인 경우 추가하지 않음
                    });
                },
                (error) => {
                    console.error('위치 정보 오류 (운행 종료 시):', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                }
            );

            setIsCostModalVisible(true); // 비용 입력 모달 띄우기
        } else {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                Alert.alert('권한 오류', '위치 접근 권한이 필요합니다.');
                return;
            }

            // 운행 시작
            setStartTime(new Date()); // 시작 시간을 현재 시간으로 설정
            setEndTime(null); // 종료 시간을 초기화
            setDrivingTime(0); // 운행 시간을 초기화
            setCoordinates([]); // 좌표 초기화

            let secondsPassed = 0; // 경과 시간 (초)
            const id = setInterval(() => {
                // 1초마다 타이머 갱신
                setDrivingTime((prevTime) => prevTime + 1);
                secondsPassed += 1;

                if (secondsPassed === 1) {
                    // 첫 번째 좌표는 바로 저장 (운행 시작 시)
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;

                            // 첫 좌표 저장
                            setCoordinates([{ latitude, longitude }]);
                        },
                        (error) => {
                            console.error('위치 정보 오류 (운행 시작 시):', error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000,
                        }
                    );
                }

                if (secondsPassed % 10 === 0) {
                    // 10초마다 위치를 저장
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;

                            setCoordinates((prevCoords) => {
                                if (prevCoords.length === 0) {
                                    // 첫 좌표는 무조건 저장
                                    return [{ latitude, longitude }];
                                }

                                const lastCoord = prevCoords[prevCoords.length - 1];
                                calculateDistance(
                                    lastCoord.latitude,
                                    lastCoord.longitude,
                                    latitude,
                                    longitude
                                ).then((distance) => {
                                    if (distance >= 300) {
                                        // 300m 이상 차이나는 경우에만 저장
                                        setCoordinates([
                                            ...prevCoords,
                                            { latitude, longitude },
                                        ]);
                                    }
                                }).catch((error) => {
                                    console.error('거리 계산 오류:', error);
                                });

                                return prevCoords; // 이전 좌표 반환
                            });
                        },
                        (error) => {
                            console.error('위치 정보 오류:', error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000,
                        }
                    );
                }
            }, 1000); // 1초마다 실행

            setIntervalId(id); // 타이머 ID 저장
        }
        setIsDriving(!isDriving);
    };

    const saveDrivingRecord = async () => {
        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert('오류', '로그인 토큰이 없습니다. 다시 로그인해 주세요.');
                return;
            }

            console.log(coordinates);
            const recordData = {
                vehicle: vehicleId,
                departure_location: departureLocation,
                arrival_location: arrivalLocation,
                departure_mileage: parseFloat(totalMileage) || 0, // 예시 값, 실제 값으로 대체 필요
                arrival_mileage: parseFloat(afterTotalMileage) , //주행 후 누적거리
                departure_time: startTime,
                arrival_time: new Date(),
                driving_purpose: drivingPurpose,
                fuel_cost: fuelCost ? parseFloat(fuelCost) : null,
                toll_fee: tollFee ? parseFloat(tollFee) : null,
                other_costs: otherCosts ? parseFloat(otherCosts) : null,
                coordinates: coordinates, // 저장된 좌표 데이터를 사용
            };

            const response = await axios.post('https://hizenberk.pythonanywhere.com/api/driving-records/create/', recordData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                setDepartureLocation('출발지 입력');
                setArrivalLocation('도착지 입력');
                setFuelCost('');
                setTollFee('');
                setOtherCosts('');
                setCoordinates('');
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

    const handleAddressSelect = (address) => {
        if (selectedInput === 'departure') {
            setDepartureLocation(address);
        } else if (selectedInput === 'arrival') {
            setArrivalLocation(address);
        }
        setIsSearchModalVisible(false);
    };
    const handleCloseModal = () => {
        setIsSearchModalVisible(false);
    };
    const swapLocations = () => {
        const temp = departureLocation;
        setDepartureLocation(arrivalLocation);
        setArrivalLocation(temp);
    };
    const handleCostSubmit = () => {
        if (!afterTotalMileage) {
            Alert.alert('입력 오류', '주행 후 누적거리는 반드시 입력해야 합니다.');
            return;
        }
        saveDrivingRecord(); // 운행 기록 저장
        setIsCostModalVisible(false); // 모달 닫기
    };
    return (
        <View style={UseCarStyle.container}>
            {/* 상단 차량 정보 및 주행거리 */}
            <View style={UseCarStyle.header}>
                <Text style={UseCarStyle.carInfo}>{vehicleType}[{licensePlateNumber}]</Text>
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
                {/* 라디오 버튼 */}
                <View style={UseCarStyle.radioGroup}>
                    {[
                        { label: '출/퇴근', value: 'commuting' },
                        { label: '일반업무', value: 'business' },
                        { label: '비업무', value: 'non_business' },
                    ].map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={UseCarStyle.radioButton}
                            onPress={() => setDrivingPurpose(option.value)}
                        >
                            <View
                                style={[
                                    UseCarStyle.radioCircle,
                                    drivingPurpose === option.value && UseCarStyle.radioCircleSelected,
                                ]}
                            />
                            <Text style={UseCarStyle.radioLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ margin: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10 }}>
                    {/* 출발지 입력 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text
                            style={{
                                flex: 1,
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                                padding: 10,
                                fontSize: 16,
                                color: '#000000',
                            }}
                            // placeholderTextColor="#ccc"
                            onPress={() => {
                                setSelectedInput('departure');
                                setIsSearchModalVisible(true);
                            }}
                        >
                            {departureLocation}
                        </Text>
                        <TouchableOpacity
                            onPress={swapLocations}
                            style={{
                                marginHorizontal: 10,
                                borderColor:'#bfbfbf',
                                borderWidth: 3,
                                borderRadius: 10,
                        }}>
                            <Text style={{
                                    fontSize: 24,
                                    color: '#bfbfbf',
                            }}>
                                ↑↓
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 도착지 입력 */}
                    <Text
                        style={{
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            padding: 10,
                            fontSize: 16,
                            color: '#000000',
                        }}
                        // placeholderTextColor="#ccc"
                        onPress={() => {
                            setSelectedInput('arrival');
                            setIsSearchModalVisible(true);
                        }}
                    >
                        {arrivalLocation}
                    </Text>
                </View>
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
            <Modal visible={isSearchModalVisible} animationType="slide">
                <AddressSearch onSelectAddress={handleAddressSelect} onClose={handleCloseModal}/>
            </Modal>
            {/* 비용 입력 모달 */}
            <Modal visible={isCostModalVisible} animationType="slide" transparent>
                <View style={UseCarStyle.modalBackground}>
                    <View style={UseCarStyle.modalContent}>
                        <Text style={UseCarStyle.modalTitle}>비용 입력</Text>

                        {/* 유류비 입력 */}
                        <TextInput
                            style={UseCarStyle.textInput}
                            placeholder="유류비"
                            value={fuelCost}
                            onChangeText={setFuelCost}
                            keyboardType="numeric"
                        />

                        {/* 통행료 입력 */}
                        <TextInput
                            style={UseCarStyle.textInput}
                            placeholder="통행료"
                            value={tollFee}
                            onChangeText={setTollFee}
                            keyboardType="numeric"
                        />

                        {/* 기타 비용 입력 */}
                        <TextInput
                            style={UseCarStyle.textInput}
                            placeholder="기타 비용"
                            value={otherCosts}
                            onChangeText={setOtherCosts}
                            keyboardType="numeric"
                        />

                        {/* 주행 후 누적거리 입력 (필수 항목) */}
                        <TextInput
                            style={UseCarStyle.textInput}
                            placeholder="주행 후 누적거리"
                            value={afterTotalMileage}
                            onChangeText={setAfterTotalMileage}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            style={UseCarStyle.smallButton}
                            onPress={handleCostSubmit}
                        >
                            <Text style={UseCarStyle.buttonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UseCar;
