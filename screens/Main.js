import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import MainStyle from '../style/MainStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 import

const Main = () => {
    const [vehicles, setVehicles] = useState([]); // 차량 목록을 저장하는 상태
    const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리 상태
    const [filteredVehicles, setFilteredVehicles] = useState([]); // 필터링된 차량 목록
    const [showMenu, setShowMenu] = useState(false); // 사이드 메뉴 표시 여부
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값
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
                    setVehicles(data.vehicles);
                    setFilteredVehicles(data.vehicles);
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
            setFilteredVehicles(vehicles);
        } else {
            const filtered = vehicles.filter(vehicle =>
                vehicle.license_plate_number.includes(searchQuery)
            );
            setFilteredVehicles(filtered);
        }
    };

    const toggleSideMenu = () => {
        if (showMenu) {
            Animated.timing(menuAnimation, {
                toValue: -300, // 메뉴가 화면 밖으로 나가도록
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowMenu(false));
        } else {
            setShowMenu(true);
            Animated.timing(menuAnimation, {
                toValue: 0, // 메뉴가 화면에 들어오도록
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const closeSideMenu = () => {
        if (showMenu) {
            Animated.timing(menuAnimation, {
                toValue: -300, // 메뉴가 화면 밖으로 나가도록
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowMenu(false));
        }
    };

    return (
        <TouchableWithoutFeedback onPress={closeSideMenu}>
            <View style={MainStyle.container}>
                <View style={MainStyle.carInfoList}>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle, index) => (
                            <View key={index} style={MainStyle.carInfoItem}>
                                <Text style={MainStyle.carText}>
                                    [법인] {vehicle.license_plate_number}
                                </Text>
                                <TouchableOpacity
                                    style={MainStyle.registrationButton}
                                    onPress={() => navigation.navigate('UseCar', {
                                            vehicleId: vehicle.id,
                                            licensePlateNumber: vehicle.license_plate_number,
                                            totalMileage: vehicle.total_mileage,
                                            vehicleType: vehicle.vehicle_type
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

                <View style={MainStyle.searchBar}>
                    <Button title="=" onPress={toggleSideMenu} />
                    <TextInput
                        style={MainStyle.searchInput}
                        placeholder="차량 번호 검색"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Button title="검색" onPress={handleSearch} />
                </View>

                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                    <SideMenu navigation={navigation} />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '110%', // 전체 높이
        width: '66%', // 화면의 2/3 너비
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5, // 안드로이드에서 그림자 효과
    },
});

export default Main;
