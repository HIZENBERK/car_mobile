import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import makeExcelStyle from '../style/MakeExcelStyle';
import SideMenu from './SideMenu';
import { useNavigation } from '@react-navigation/native';
import MainStyle from '../style/MainStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import excelMaker from '../component/excelMaker';
import {Calendar} from 'react-native-calendars';

const MakeExcel = () => {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(-300));
    const [activeMenu, setActiveMenu] = useState('makeExcel');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState({}); // 체크된 운행 기록 상태 관리
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0];
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 여부
    const [activeCalendar, setActiveCalendar] = useState(null); // 어떤 달력이 활성화되었는지
    const [selectedDate, setSelectedDate] = useState({ start: startOfMonth, end: endOfMonth });

    // 차량 정보를 불러오는 함수
    const fetchVehicles = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                Alert.alert('오류', '로그인 토큰이 없습니다. 다시 로그인해 주세요.');
                return;
            }

            const response = await fetch('https://hizenberk.pythonanywhere.com/api/vehicles/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.vehicles)) {
                    setVehicles(data.vehicles);
                    setFilteredVehicles(data.vehicles);
                    console.log(filteredVehicles);
                } else {
                    Alert.alert('오류', '차량 정보를 불러오는 데 실패했습니다. 데이터 형식이 올바르지 않습니다.');
                }
            } else {
                Alert.alert('오류', '차량 정보를 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('서버 오류:', error);
            Alert.alert('오류', '서버와의 연결에 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const toggleSideMenu = () => {
        if (showMenu) {
            Animated.timing(menuAnimation, {
                toValue: -300,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowMenu(false));
        } else {
            setShowMenu(true);
            Animated.timing(menuAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

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

    // 체크박스 토글
    const toggleCheck = (vehicleId, isChecked) => {
        setSelectedRecords((prev) => ({
            ...prev, // 기존 상태 유지
            [vehicleId]: isChecked, // isChecked 값으로 업데이트
        }));
    };

    // 선택 생성 버튼 클릭
    const handleBatchCreate = () => {
        const selectedVehicles = filteredVehicles.filter(vehicle => selectedRecords[vehicle.id]);
        if (selectedVehicles.length === 0) {
            Alert.alert('선택된 항목 없음', '운행 기록을 선택하세요.');
            return;
        }
        //excelMaker(selectedVehicles); // 선택된 항목을 excelMaker에 전달
        Alert.alert('엑셀 생성', '선택된 운행 기록부가 생성되었습니다.');
    };

    // 개별 생성 버튼 클릭
    const handleIndividualCreate = (vehicle) => {
        excelMaker(vehicle); // 개별 항목을 excelMaker에 전달
    };
    const onDateSelect = (day) => {
        if (activeCalendar === 'start') {
            if (selectedDate.end && new Date(day.dateString) > new Date(selectedDate.end)) {
                Alert.alert("오류", "시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
                return;
            }
            setSelectedDate(prev => ({ ...prev, start: day.dateString }));
        } else if (activeCalendar === 'end') {
            if (selectedDate.start && new Date(day.dateString) < new Date(selectedDate.start)) {
                Alert.alert("오류", "종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
                return;
            }
            setSelectedDate(prev => ({ ...prev, end: day.dateString }));
        }
        setShowCalendar(false);
    };

    return (
        <TouchableWithoutFeedback onPress={() => showMenu && toggleSideMenu()}>
            <View style={makeExcelStyle.container}>
                {/* 헤더 */}
                <View style={makeExcelStyle.header}>
                    <TouchableOpacity style={makeExcelStyle.downloadIcon}>
                        <Text>⬇️ 다운로드</Text>
                    </TouchableOpacity>
                    <Button title="선택 생성" onPress={handleBatchCreate} /> {/* 수정됨 */}
                </View>

                {/* 날짜 선택 */}
                <View style={MainStyle.dateContainer}>
                    <Text style={MainStyle.queryText}>조회 기준:</Text>
                    <TouchableOpacity
                        onPress={() => !showMenu && setActiveCalendar('start') && setShowCalendar(true)}
                        style={MainStyle.dateButton}
                    >
                        <Text style={MainStyle.dateText}>{selectedDate.start || '시작 날짜 선택'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => !showMenu && setActiveCalendar('end') && setShowCalendar(true)}
                        style={MainStyle.dateButton}
                    >
                        <Text style={MainStyle.dateText}>{selectedDate.end || '종료 날짜 선택'}</Text>
                    </TouchableOpacity>
                </View>

                {/* 작은 달력 표시 */}
                {showCalendar && !showMenu && (
                    <Calendar
                        onDayPress={onDateSelect}
                        markedDates={{
                            [selectedDate.start]: { selected: true, marked: true },
                            [selectedDate.end]: { selected: true, marked: true },
                        }}
                        style={MainStyle.calendar}
                        theme={{
                            arrowColor: '#007BFF',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#007BFF',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#007BFF',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                        }}
                    />
                )}


                {/* 차량 목록 */}
                <View style={MainStyle.carInfoList}>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle, index) => (
                            <View key={index} style={MainStyle.carInfoItem}>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="#007BFF" // 선택 시 색상
                                    unfillColor="#A9A9A9" // 비선택 시 색상
                                    iconStyle={{ borderColor: 'blue' }} // 체크박스 테두리 색상
                                    textStyle={{ fontFamily: 'JosefinSans-Regular'}} // 텍스트 스타일
                                    isChecked={!!selectedRecords[vehicle.id]} // 초기 체크 상태
                                    onPress={(isChecked) => toggleCheck(vehicle.id, isChecked)} // 체크박스 상태 변경 시 실행
                                    style={ makeExcelStyle.checkbox } // 추가 스타일
                                />
                                <Text style={MainStyle.carText}>
                                    [법인] {vehicle.license_plate_number}
                                </Text>
                                <TouchableOpacity
                                    style={MainStyle.registrationButton}
                                    onPress={() => handleIndividualCreate(vehicle)}
                                >
                                    <Text style={MainStyle.registrationButtonText}>생성하기</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={MainStyle.noVehiclesText}>등록된 차량이 없습니다.</Text>
                    )}
                </View>

                {/* 푸터 */}
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

                {/* 사이드 메뉴 */}
                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                    <SideMenu
                        navigation={navigation}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />
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

export default MakeExcel;
