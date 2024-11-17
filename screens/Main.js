import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import MainStyle from '../style/MainStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
    const [vehicles, setVehicles] = useState([]); // 차량 목록을 저장하는 상태
    const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리 상태
    const [filteredVehicles, setFilteredVehicles] = useState([]); // 필터링된 차량 목록
    const navigation = useNavigation();

    // 차량 정보를 불러오는 함수
    const fetchVehicles = async () => {
        try {
            // AsyncStorage에서 토큰 가져오기
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            // 차량 정보 요청
            const response = await fetch('https://hizenberk.pythonanywhere.com/api/vehicles/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // 인증 토큰 사용
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('차량 정보:', data); // 데이터 형식 확인을 위해 콘솔에 출력
                if (data && Array.isArray(data.vehicles)) {
                    setVehicles(data.vehicles); // vehicles 속성을 사용하여 차량 정보 설정
                    setFilteredVehicles(data.vehicles); // 초기 필터링된 차량 정보 설정
                } else {
                    Alert.alert("오류", "차량 정보를 불러오는 데 실패했습니다. 데이터 형식이 올바르지 않습니다.");
                }
            } else {
                Alert.alert("오류", "차량 정보를 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("오류", "서버와의 연결에 실패했습니다.");
        }
    };

    // 컴포넌트가 마운트될 때 차량 정보를 불러오기 위해 호출
    useEffect(() => {
        fetchVehicles();
    }, []);

    // 차량 번호 검색 함수
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredVehicles(vehicles); // 검색어가 비어있으면 전체 차량 목록 표시
        } else {
            const filtered = vehicles.filter(vehicle =>
                vehicle.license_plate_number.includes(searchQuery)
            );
            setFilteredVehicles(filtered);
        }
    };

    return (
        <View style={MainStyle.container}>
            {/* Car Information List */}
            <View style={MainStyle.carInfoList}>
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle, index) => (
                        <View key={index} style={MainStyle.carInfoItem}>
                            <Text style={MainStyle.carText}>
                                [법인]: {vehicle.license_plate_number}
                            </Text>
                            <TouchableOpacity
                                style={MainStyle.registrationButton}
                                onPress={() => navigation.navigate('UseCar', {
                                        vehicleId: vehicle.id,
                                        licensePlateNumber: vehicle.license_plate_number,
                                        totalMileage: vehicle.total_mileage
                                    })}
                            >
                                <Text style={MainStyle.registrationButtonText}>사용 등록</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={MainStyle.noVehiclesText}>등록된 차량이 없습니다.</Text>
                )}
            </View>

            <Button title="운행기록부 생성" onPress={() => navigation.navigate('MakeExcel')} />
            <Button title="영수증 등록" onPress={() => navigation.navigate('ReceiptRegistration')} />
            {/* Bottom Search Bar */}
            <View style={MainStyle.searchBar}>
                <Button title="-" onPress={() => {}} />
                <TextInput
                    style={MainStyle.searchInput}
                    placeholder="차량 번호 검색"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="검색" onPress={handleSearch} />
            </View>
        </View>
    );
};

export default Main;
// 11/16 10:28 운행기록 api 연결 직전
