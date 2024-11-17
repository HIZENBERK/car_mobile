import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 import
import MainStyle from '../style/MainStyle';

const MyUsageScreen = () => {
    const [selectedDate, setSelectedDate] = useState({ start: '', end: '' });
    const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 여부
    const [activeCalendar, setActiveCalendar] = useState(null); // 어떤 달력이 활성화되었는지
    const [showMenu, setShowMenu] = useState(false); // 사이드 메뉴 표시 여부
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값

    const navigation = useNavigation();

    const fetchVehicles = async () => {
        // 차량 정보를 불러오는 기능이 필요하면 여기에 구현
    };

    useEffect(() => {
        fetchVehicles();
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

                {/* 검색 바 및 사이드 메뉴 버튼 */}
                <View style={MainStyle.searchBar}>
                    <Button title="=" onPress={toggleSideMenu} />
                    <TextInput
                        style={MainStyle.searchInput}
                        placeholder="차량 검색"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Button title="검색" onPress={() => {/* 검색 기능 구현 */}} />
                </View>

                {/* 사이드 메뉴 애니메이션 */}
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

export default MyUsageScreen;
