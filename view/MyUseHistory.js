import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import myUseStyle from '../style/MyUseStyle';
const MyUseHistory = () => {
    const data = [
        { id: 1, carNumber: '134가 1234', time: '12:21 - 13:11', date: '2024.09.11', duration: '00:50' },
        { id: 2, carNumber: '134가 1234', time: '12:21 - 13:11', date: '2024.09.11', duration: '00:50' },
        { id: 3, carNumber: '134가 1234', time: '12:21 - 13:11', date: '2024.09.11', duration: '00:50' },
        { id: 4, carNumber: '134가 1234', time: '12:21 - 13:11', date: '2024.09.11', duration: '00:50' },
    ];

    const renderItem = ({ item }) => (
        <View style={myUseStyle.itemContainer}>
            <Text style={myUseStyle.id}>{item.id}</Text>
            <View style={myUseStyle.carInfo}>
                <Text style={myUseStyle.carNumber}>{item.carNumber}</Text>
                <Text style={myUseStyle.time}>{item.time}</Text>
            </View>
            <Text style={myUseStyle.date}>{item.date}</Text>
            <Text style={myUseStyle.duration}>{item.duration}</Text>
        </View>
    );

    return (
        <View style={myUseStyle.container}>
            {/* 조회 기간 */}
            <View style={myUseStyle.searchPeriod}>
                <TextInput style={myUseStyle.dateInput} placeholder="Start Date" />
                <TextInput style={myUseStyle.dateInput} placeholder="End Date" />
            </View>

            {/* 리스트 */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={myUseStyle.list}
            />

            {/* 하단 검색 영역 */}
            <View style={myUseStyle.bottomBar}>
                <TouchableOpacity style={myUseStyle.searchButton}>
                    <Text>🔍</Text>
                </TouchableOpacity>
                <TextInput style={myUseStyle.searchInput} placeholder="차량 검색" />
            </View>
        </View>
    );
};

export default MyUseHistory;
