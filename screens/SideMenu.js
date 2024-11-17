import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SideMenu = ({ navigation }) => {
    return (
        <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>부서 / 직급</Text>
            <Text style={styles.menuItem}>이름</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyUsage')}>
                <Text style={styles.menuItem}>내 사용 현황</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CurrentUsage')}>
                <Text style={styles.menuItem}>현재 운행기록 생성</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterUsage')}>
                <Text style={styles.menuItem}>운행 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.menuItem}>설정</Text>
            </TouchableOpacity>
            <Text style={styles.menuItem}>로그아웃</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        width: '33%', // 화면의 1/3 너비
        position: 'absolute', // 절대 위치 설정
        left: 0, // 왼쪽으로 정렬
        top: 0,
        height: '100%', // 전체 높이
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 10,
    },
});

export default SideMenu;
