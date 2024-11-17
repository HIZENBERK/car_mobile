import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MainStyle from '../style/MainStyle'; // 스타일 파일 import
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleUsageList = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [vehicleList, setVehicleList] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    const fetchVehicleUsage = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                Alert.alert("오류", "로그인 토큰이 없습니다. 다시 로그인해 주세요.");
                return;
            }

            const response = await fetch(`https://your-api-endpoint.com/api/vehicle-usage?start=${startDate}&end=${endDate}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setVehicleList(data);
                setFilteredVehicles(data);
            } else {
                Alert.alert("오류", "차량 사용 기록을 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("오류", "서버와의 연결에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchVehicleUsage();
    }, [startDate, endDate]);

    const showStartDatePicker = () => setStartDatePickerVisibility(true);
    const showEndDatePicker = () => setEndDatePickerVisibility(true);
    const hideStartDatePicker = () => setStartDatePickerVisibility(false);
    const hideEndDatePicker = () => setEndDatePickerVisibility(false);

    const handleConfirmStartDate = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };

    const handleConfirmEndDate = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const handleSearch = () => {
        const filtered = vehicleList.filter(vehicle => {
            return vehicle.license_plate_number.includes(searchQuery) ||
                   vehicle.start_time.includes(searchQuery) ||
                   vehicle.end_time.includes(searchQuery);
        });
        setFilteredVehicles(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={MainStyle.vehicleItem}>
            <Text>{item.vehicle_type_icon} {item.license_plate_number}</Text>
            <Text>출발 시간: {item.start_time}</Text>
            <Text>도착 시간: {item.end_time}</Text>
            <Text>사용 일자: {item.date}</Text>
            <Text>사용 시간: {item.usage_duration}</Text>
        </View>
    );

    return (
        <View style={MainStyle.container}>
            <View style={MainStyle.datePickerContainer}>
                <TouchableOpacity onPress={showStartDatePicker}>
                    <Text>시작 날짜: {startDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmStartDate}
                    onCancel={hideStartDatePicker}
                />
                <TouchableOpacity onPress={showEndDatePicker}>
                    <Text>종료 날짜: {endDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmEndDate}
                    onCancel={hideEndDatePicker}
                />
            </View>

            <TextInput
                style={MainStyle.searchInput}
                placeholder="차량 번호 검색"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onEndEditing={handleSearch}
            />

            <FlatList
                data={filteredVehicles}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default VehicleUsageList;