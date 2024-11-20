import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars'; // 달력 컴포넌트 임포트
import makeExcelStyle from '../style/MakeExcelStyle';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 import
import { useNavigation } from '@react-navigation/native'; // useNavigation 임포트

const MakeExcel = () => {
    const navigation = useNavigation(); // navigation 객체 받기
    const [showMenu, setShowMenu] = useState(false); // 사이드 메뉴 표시 여부
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값
    const [activeMenu, setActiveMenu] = useState('makeExcel'); // 현재 활성화된 메뉴 항목 추가
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 여부
    const [activeCalendar, setActiveCalendar] = useState('start'); // 활성화된 달력
    const [selectedDate, setSelectedDate] = useState({ start: '', end: '' }); // 선택된 날짜

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

    const data = [
        { id: '1', name: '134가 1234', details: '차량운행기록부 생성' },
        // 필요한 데이터를 더 추가
    ];

    return (
        <View style={{ flex: 1 }} onTouchEnd={closeSideMenu}>
            <View style={makeExcelStyle.container}>
                {/* 헤더 */}
                <View style={makeExcelStyle.header}>
                    <Text style={makeExcelStyle.title}>[번호] 134가 1234</Text>
                    <TouchableOpacity style={makeExcelStyle.downloadIcon}>
                        <Text>⬇️ 다운로드</Text>
                    </TouchableOpacity>
                </View>

                {/* 검색 바 및 날짜 선택 */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {/* 검색 바 */}
                    <View style={makeExcelStyle.searchBar}>
                        <Button title="선택 생성" onPress={() => {}} />
                    </View>

                    {/* 날짜 선택 및 조회 기준 텍스트 */}
                    <View style={makeExcelStyle.dateContainer}>
                        <Text style={makeExcelStyle.queryText}>조회 기준:</Text>
                        <TouchableOpacity
                            onPress={() => { if (!showMenu) { setActiveCalendar('start'); setShowCalendar(true); }}}
                            style={makeExcelStyle.dateButton}
                        >
                            <Text style={makeExcelStyle.dateText}>{selectedDate.start || '시작 날짜 선택'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { if (!showMenu) { setActiveCalendar('end'); setShowCalendar(true); }}}
                            style={makeExcelStyle.dateButton}
                        >
                            <Text style={makeExcelStyle.dateText}>{selectedDate.end || '종료 날짜 선택'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 작은 달력 표시 */}
                {showCalendar && !showMenu && (
                    <Calendar
                        onDayPress={onDateSelect}
                        markedDates={{
                            [selectedDate.start]: { selected: true, marked: true },
                            [selectedDate.end]: { selected: true, marked: true },
                        }}
                        style={makeExcelStyle.calendar}
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

                {/* 항목 리스트 */}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={makeExcelStyle.item}>
                            <Text>{item.name}</Text>
                            <Button title={item.details} onPress={() => {}} />
                        </TouchableOpacity>
                    )}
                />

                {/* 푸터 */}
                <View style={makeExcelStyle.footer}>
                    <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={toggleSideMenu}>
                        <Text style={styles.buttonText}>=</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.searchButton]} onPress={() => {}}>
                        <Text style={styles.buttonText}>차량검색</Text>
                    </TouchableOpacity>
                </View>

                {/* 사이드 메뉴 */}
                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                    <SideMenu
                        navigation={navigation}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu} // 활성 메뉴 업데이트 함수 전달
                    />
                </Animated.View>
            </View>
        </View>
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
    button: {
        backgroundColor: '#007BFF', // 버튼 배경색
        paddingVertical: 10,         // 상하 패딩
    },
    equalButton: {
        flex: 1,                     // 1:9 비율을 위해 flex 비율 설정
        marginRight: 10,             // 버튼 간격
    },
    searchButton: {
        flex: 9,                     // 1:9 비율을 위해 flex 비율 설정
    },
    buttonText: {
        color: '#FFFFFF',            // 텍스트 색상
        fontSize: 16,                // 텍스트 크기
        textAlign: 'center',         // 텍스트 정렬
    },
});

export default MakeExcel;