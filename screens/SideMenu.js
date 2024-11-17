import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SideMenu = ({ navigation }) => {
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {/* 닫기 버튼 기능 추가 */}}>
            </TouchableOpacity>
            <Text style={styles.menuTitle}>부서 / 직급</Text>
            <Text style={styles.userName}>이름</Text>

            <TouchableOpacity onPress={() => navigation.navigate('MyUsage')} style={styles.menuItem}>
                <Text style={styles.itemText}>내 사용 현황</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => navigation.navigate('CurrentUsage')} style={styles.menuItem}>
                <Text style={styles.itemText}>차량 운행기록부 생성</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => navigation.navigate('ExpenseRecord')} style={styles.menuItem}>
                <Text style={styles.itemText}>지출내역 조회</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.menuItem}>
                <Text style={styles.itemText}>설정</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        width: '120%', // 화면의 2/3 너비로 조정
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%', // 전체 높이
    },
    closeButton: {
        alignSelf: 'flex-end', // 오른쪽 정렬
        padding: 10,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#007BFF', // 버튼 텍스트 색상
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'left',
    },
    userName: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'left',
    },
    menuItem: {
        marginVertical: 15, // 항목 간격 조정
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10, // 항목과 경계선 간의 간격
    },
    itemText: {
        fontSize: 18,
        textAlign: 'left',
    },
    logoutItem: {
        marginTop: 'auto', // 로그아웃 항목을 하단으로 이동
    },
});

export default SideMenu;
