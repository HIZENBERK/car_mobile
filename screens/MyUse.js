import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MainStyle from '../style/MainStyle';
import axios from 'axios';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 임포트

const MyUsageScreen = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState({ start: startOfMonth, end: endOfMonth });
    const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 여부
    const [activeCalendar, setActiveCalendar] = useState(null); // 어떤 달력이 활성화되었는지
    const [drivingRecords, setDrivingRecords] = useState([]); // 운행 기록 상태
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값
    const [userId, setUserId] = useState(null); // 사용자 ID 상태 추가
    const navigation = useNavigation();

    // 유저 ID를 가져오는 함수
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('access');
                if (!accessToken) {
                    Alert.alert('오류', '인증 토큰이 없습니다. 다시 로그인해 주세요.');
                    navigation.navigate('Login');
                    return;
                }

                // 현재 로그인된 사용자 정보 조회
                const response = await axios.get('https://hizenberk.pythonanywhere.com/api/users/me/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setUserId(response.data.id); // 로그인된 유저 ID 저장
                } else {
                    Alert.alert('오류', '사용자 정보를 가져오는 데 실패했습니다.');
                }
            } catch (err) {
                console.error('사용자 정보 조회 오류:', err.message);
                Alert.alert('오류', '사용자 정보를 가져오는 데 실패했습니다.');
            }
        };

        fetchUserId();
    }, []);

    const fetchDrivingRecords = async () => {
        try {
            const token = await AsyncStorage.getItem('access'); // 저장된 access 토큰 가져오기
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            if (!userId) {
                Alert.alert("오류", "사용자 정보를 찾을 수 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const response = await axios.get('https://hizenberk.pythonanywhere.com/api/driving-records/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                if (response.data && Array.isArray(response.data.records)) {
                    response.data.records.forEach(record => {
                        console.log('Record:', record); // 응답된 record 전체를 출력
                        console.log('User ID:', userId);
                    });

                    const filteredRecords = response.data.records.filter(record => {
                        const drivingDate = new Date(record.departure_time);
                        return record.user_id === userId && drivingDate >= new Date(selectedDate.start) && drivingDate <= new Date(selectedDate.end);
                    });

                    console.log('필터링된 운행 기록:', filteredRecords); // 필터링된 운행 기록 로그 추가
                    setDrivingRecords(filteredRecords); // 필터링된 운행 기록 설정
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

    useEffect(() => {
        if (userId) {
            fetchDrivingRecords();
        }
    }, [selectedDate, userId]);

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

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => { if (showMenu) toggleSideMenu(); }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={[MainStyle.container, { flexGrow: 1 }]}
                        contentContainerStyle={{ paddingBottom: 200 }}
                        showsVerticalScrollIndicator={true}
                        alwaysBounceVertical={true}
                    >
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
                        <View style={[MainStyle.recordsContainer, { marginBottom: 80 }]}>
                            {drivingRecords.length > 0 ? (
                                drivingRecords.map((record, index) => (
                                    <View key={index} style={[MainStyle.recordItem, { padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, borderColor: '#ccc' }]}>
                                        <Text style={{ fontWeight: 'bold' }}>운행 목적: {record.driving_purpose}</Text>
                                        <Text>출발지: {record.departure_location}</Text>
                                        <Text>도착지: {record.arrival_location}</Text>
                                        <Text>출발 시간: {record.departure_time}</Text>
                                        <Text>도착 시간: {record.arrival_time}</Text>
                                        <Text>운행 거리: {record.driving_distance} km</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={MainStyle.noRecordsText}>등록된 운행 기록이 없습니다.</Text>
                            )}
                        </View>
                    </ScrollView>

                    {/* 검색 바 및 사이드 메뉴 버튼 */}
                    <View style={[MainStyle.searchBar, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
                        <Button title="=" onPress={toggleSideMenu} />
                        <TextInput
                            style={MainStyle.searchInput}
                            placeholder="운행 기록 검색"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <Button title="검색" onPress={() => { /* 검색 기능 구현 */ }} />
                    </View>

                    {/* 사이드 메뉴 */}
                    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                        <SideMenu navigation={useNavigation()} />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%', // 전체 높이
        width: '66%', // 화면의 2/3 너비
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5, // 안드로이드에서 그림자 효과
    },
});

export default MyUsageScreen;
// 11-19 기능 완