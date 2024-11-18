import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MainStyle from '../style/MainStyle';
import axios from 'axios';
import SideMenu from './SideMenu';

const ExpenseRecord = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState({ start: startOfMonth, end: endOfMonth });
    const [searchQuery, setSearchQuery] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [activeCalendar, setActiveCalendar] = useState(null);
    const [expenseRecords, setExpenseRecords] = useState([]);
    const [menuAnimation] = useState(new Animated.Value(-300));

    const fetchExpenseRecords = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const response = await axios.get('https://hizenberk.pythonanywhere.com/api/expenses/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                if (response.data && Array.isArray(response.data.expenses)) {
                    const filteredExpenses = response.data.expenses.filter(record => {
                        const expenseDate = new Date(record.expense_date);
                        return expenseDate >= new Date(selectedDate.start) && expenseDate <= new Date(selectedDate.end);
                    });
                    setExpenseRecords(filteredExpenses);
                } else {
                    console.error('지출 내역 데이터 형식 오류:', response.data);
                    Alert.alert('오류', '지출 내역 데이터 형식이 올바르지 않습니다.');
                }
            } else {
                Alert.alert('오류', '지출 내역을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('지출 내역 불러오기 오류:', error);
            Alert.alert('오류', '지출 내역 불러오는 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchExpenseRecords();
    }, [selectedDate]);

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

    const renderHeader = () => (
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
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={[MainStyle.recordItem, { padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, borderColor: '#ccc' }]}>
            <Text style={{ fontWeight: 'bold' }}>지출 유형: {item.expense_type === 'expense' ? '지출' : '정비'}</Text>
            <Text>차량 번호판: {item.vehicle_info?.license_plate_number || '정보 없음'}</Text>
            <Text>차종: {item.vehicle_info?.vehicle_type || '정보 없음'}</Text>
            <Text>사용자: {item.user_info?.name || '정보 없음'}</Text>
            <Text>지출 일자: {item.expense_date}</Text>
            <Text>금액: {item.amount}원</Text>
            <Text>상태: {item.status === 'approved' ? '승인' : item.status === 'pending' ? '대기' : '반려'}</Text>
            <Text>결제 수단: {item.payment_method}</Text>
            <Text>상세 내용: {item.details}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => { if (showMenu) toggleSideMenu(); }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={expenseRecords}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />

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
        height: '100%',
        width: '66%',
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
    },
});

export default ExpenseRecord;
