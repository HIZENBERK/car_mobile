import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MainStyle from '../style/MainStyle';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 임포트

const MyUsageScreen = ({ navigation }) => {
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState({ start: startOfMonth, end: endOfMonth });
    const [searchQuery, setSearchQuery] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [activeCalendar, setActiveCalendar] = useState(null);
    const [drivingRecords, setDrivingRecords] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값

    const fetchDrivingRecords = async () => {
        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const response = await axios.get('https://hizenberk.pythonanywhere.com/api/driving-records/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                if (response.data && response.data.records && Array.isArray(response.data.records)) {
                    setDrivingRecords(response.data.records); // 운행 기록 설정
                    fetchVehicleDetails(response.data.records.map(record => record.vehicle)); // 차량 정보 요청
                } else {
                    console.error('운행 기록 데이터 형식 오류:', response.data);
                    Alert.alert('오류', '운행 기록 데이터 형식이 올바르지 않습니다.');
                }
            } else {
                Alert.alert('오류', '운행 기록을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('운행 기록 불러오기 오류:', error);
            Alert.alert('오류', '운행 기록 불러오는 중 오류가 발생했습니다.');
        }
    };

    // 차량 정보 불러오기 함수
    const fetchVehicleDetails = async (vehicleIds) => {
        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const vehicleDetailsTemp = { ...vehicleDetails };
            for (const vehicleId of vehicleIds) {
                if (!vehicleDetailsTemp[vehicleId]) {
                    try {
                        const url = `https://hizenberk.pythonanywhere.com/api/vehicles/${vehicleId}/`; // URL 수정
                        console.log(`Fetching vehicle details from: ${url}`); // 요청 URL 확인
                        const response = await axios.get(url, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });
                        console.log('차량 정보 응답:', response.data); // 응답 데이터 출력
                        if (response.status === 200) {
                            vehicleDetailsTemp[vehicleId] = response.data.vehicle; // `response.data.vehicle`에 접근하여 데이터 저장
                        } else {
                            console.error(`차량 정보 불러오기 오류 (차량 ID: ${vehicleId}): 상태 코드 ${response.status}`);
                        }
                    } catch (error) {
                        console.error(`차량 정보 불러오기 오류 (차량 ID: ${vehicleId}):`, error);
                        console.error('오류 응답 데이터:', error.response?.data);
                        if (error.response && error.response.status === 404) {
                            console.error(`ID ${vehicleId}에 해당하는 차량이 존재하지 않습니다.`);
                        }
                    }
                }
            }
            setVehicleDetails(vehicleDetailsTemp);
        } catch (error) {
            console.error('차량 정보 불러오기 오류:', error);
        }
    };

    useEffect(() => {
        fetchDrivingRecords();
    }, []);

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
        setShowCalendar(false); // 날짜 선택 후 달력 숨기기
    };

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

        const closeSideMenu = () => {
            if (showMenu) {
                Animated.timing(menuAnimation, {
                    toValue: -300,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => setShowMenu(false));
            }
        };

   return (
           <TouchableWithoutFeedback onPress={closeSideMenu}>
               <View style={{ flex: 1 }}>
                   <ScrollView style={[MainStyle.container, { flexGrow: 1 }]} contentContainerStyle={{ paddingBottom: 100 }}>
                       {/* 날짜 선택 및 조회 기준 텍스트 */}
                       <View style={MainStyle.dateContainer}>
                           <Text style={MainStyle.queryText}>조회 기준:</Text>
                           <TouchableOpacity
                               onPress={() => { setActiveCalendar('start'); setShowCalendar(true); }}
                               style={MainStyle.dateButton}
                           >
                               <Text style={MainStyle.dateText}>{selectedDate.start || '시작 날짜 선택'}</Text>
                           </TouchableOpacity>
                           <Text style={MainStyle.dateSeparator}> - </Text>
                           <TouchableOpacity
                               onPress={() => { setActiveCalendar('end'); setShowCalendar(true); }}
                               style={MainStyle.dateButton}
                           >
                               <Text style={MainStyle.dateText}>{selectedDate.end || '종료 날짜 선택'}</Text>
                           </TouchableOpacity>
                       </View>

                       {/* 작은 달력 표시 */}
                       {showCalendar && (
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

                       {/* 운행 기록 리스트 */}
                       <ScrollView style={[MainStyle.recordsContainer, { marginBottom: 80 }]} contentContainerStyle={{ paddingBottom: 50 }}>
                           {drivingRecords.length > 0 ? (
                               drivingRecords.map((record, index) => (
                                   <View key={index} style={[MainStyle.recordItem, { padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, borderColor: '#ccc' }]}>
                                       <Text style={{ fontWeight: 'bold' }}>차종: {vehicleDetails[record.vehicle]?.vehicle_type || '정보 없음'}</Text>
                                       <Text>차량 번호판: {vehicleDetails[record.vehicle]?.license_plate_number || '정보 없음'}</Text>
                                       <Text>운행 목적: {record.driving_purpose}</Text>
                                       <Text>출발지: {record.departure_location}</Text>
                                       <Text>도착지: {record.arrival_location}</Text>
                                       <Text>운행 거리: {record.driving_distance} km</Text>
                                       <Text>운행 시간: {record.driving_time}</Text>
                                   </View>
                               ))
                           ) : (
                               <Text style={MainStyle.noRecordsText}>등록된 운행 기록이 없습니다.</Text>
                           )}
                       </ScrollView>
                   </ScrollView>

                   {/* 사이드 메뉴 */}
                   <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                       <SideMenu navigation={navigation} />
                   </Animated.View>

                   {/* 검색 바 */}
                   <View style={[MainStyle.searchBar, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
                       <Button title="=" onPress={toggleSideMenu} />
                       <TextInput
                           style={MainStyle.searchInput}
                           placeholder="차량 검색"
                           value={searchQuery}
                           onChangeText={setSearchQuery}
                       />
                       <Button title="검색" onPress={() => { /* 검색 기능 구현 */ }} />
                   </View>
               </View>
           </TouchableWithoutFeedback>
        );
    };

    const styles = StyleSheet.create({
        menuContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '92%', // 전체 높이
            width: '66%', // 화면의 2/3 너비
            backgroundColor: '#fff',
            padding: 20,
            elevation: 5, // 안드로이드에서 그림자 효과
        },
    });

    export default MyUsageScreen;
