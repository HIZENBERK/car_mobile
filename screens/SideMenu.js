import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import SideMenuStyle from '../style/SideMenuStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideMenu = ({ navigation, activeMenu, setActiveMenu }) => {
    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const fetchUserInfo = async () => {
        try {
            setDepartment(await AsyncStorage.getItem('department'));
            setPosition(await AsyncStorage.getItem('position'));
            setName(await AsyncStorage.getItem('name'));
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '저장에 실패한 정보가 있습니다.');
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <View style={SideMenuStyle.menuContainer}>
            <TouchableOpacity style={SideMenuStyle.closeButton} onPress={() => setActiveMenu(null)} />
            <Text style={SideMenuStyle.menuTitle}>{`${department} / ${position}`}</Text>
            <Text style={SideMenuStyle.userName}>{`${name}`}</Text>
            <View style={SideMenuStyle.separator} />

            {/* 메뉴 항목들 */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('MyUsage');
                    setActiveMenu('myUsage'); // 활성 메뉴 변경
                }}
                style={[SideMenuStyle.menuItem, activeMenu === 'myUsage' && SideMenuStyle.activeMenuItem]} // 활성화된 항목에 배경색 적용
            >
                <Text style={SideMenuStyle.itemText}>내 사용 현황</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('CurrentUsage');
                    setActiveMenu('makeExcel'); // 활성 메뉴 변경
                }}
                style={[SideMenuStyle.menuItem, activeMenu === 'makeExcel' && SideMenuStyle.activeMenuItem]} // 활성화된 항목에 배경색 적용
            >
                <Text style={SideMenuStyle.itemText}>차량 운행기록부 생성</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ExpenseRecord');
                    setActiveMenu('expenseRecord'); // 활성 메뉴 변경
                }}
                style={[SideMenuStyle.menuItem, activeMenu === 'expenseRecord' && SideMenuStyle.activeMenuItem]} // 활성화된 항목에 배경색 적용
            >
                <Text style={SideMenuStyle.itemText}>지출내역 조회</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Settings');
                    setActiveMenu('settings'); // 활성 메뉴 변경
                }}
                style={[SideMenuStyle.menuItem, activeMenu === 'settings' && SideMenuStyle.activeMenuItem]} // 활성화된 항목에 배경색 적용
            >
                <Text style={SideMenuStyle.itemText}>설정</Text>
            </TouchableOpacity>
            <View style={SideMenuStyle.separator} />
        </View>
    );
};

export default SideMenu;