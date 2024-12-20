import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import SideMenuStyle from '../style/SideMenuStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 스타일 임포트

const SideMenu = ({ navigation }) => {
    const [hoveredItem, setHoveredItem] = useState(null); // hover 상태 관리
    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const fetchUserInfo = async () => {
        try {
            // AsyncStorage에서 부서 가져오기
            setDepartment(await AsyncStorage.getItem('department'));
            // AsyncStorage에서 직급 가져오기
            setPosition(await AsyncStorage.getItem('position'));
            // AsyncStorage에서 이름 가져오기
            setName(await AsyncStorage.getItem('name'));
            console.log(department, position, name);
        }catch (error){
            console.error(error);
            Alert.alert('오류', '저장에 실패한 정보가 있습니다.');
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);
    return (
        <View style={SideMenuStyle.menuContainer}>
            <TouchableOpacity style={SideMenuStyle.closeButton} onPress={() => {/* 닫기 버튼 기능 추가 */}}>
            </TouchableOpacity>
            <Text style={SideMenuStyle.menuTitle}>{`${department} / ${position}`}</Text>
            <Text style={SideMenuStyle.userName}>{`${name}`}</Text>
            <View style={SideMenuStyle.separator} />

            {/* 메뉴 항목들 */}
            <TouchableOpacity
                onPress={() => navigation.navigate('MyUsage')}
                onPressIn={() => setHoveredItem('myUsage')}
                onPressOut={() => setHoveredItem(null)}
                style={[SideMenuStyle.menuItem, hoveredItem === 'myUsage' && { backgroundColor: '#B0E0E6' }]} // 연한 하늘색으로 변경
            >
                <Text style={SideMenuStyle.itemText}>내 사용 현황</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => navigation.navigate('CurrentUsage')}
                onPressIn={() => setHoveredItem('currentUsage')}
                onPressOut={() => setHoveredItem(null)}
                style={[SideMenuStyle.menuItem, hoveredItem === 'currentUsage' && { backgroundColor: '#B0E0E6' }]} // 연한 하늘색으로 변경
            >
                <Text style={SideMenuStyle.itemText}>차량 운행기록부 생성</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => navigation.navigate('ExpenseRecord')}
                onPressIn={() => setHoveredItem('expenseRecord')}
                onPressOut={() => setHoveredItem(null)}
                style={[SideMenuStyle.menuItem, hoveredItem === 'expenseRecord' && { backgroundColor: '#B0E0E6' }]} // 연한 하늘색으로 변경
            >
                <Text style={SideMenuStyle.itemText}>지출내역 조회</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                onPressIn={() => setHoveredItem('settings')}
                onPressOut={() => setHoveredItem(null)}
                style={[SideMenuStyle.menuItem, hoveredItem === 'settings' && { backgroundColor: '#B0E0E6' }]} // 연한 하늘색으로 변경
            >
                <Text style={SideMenuStyle.itemText}>설정</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
        </View>
    );
};

export default SideMenu;
