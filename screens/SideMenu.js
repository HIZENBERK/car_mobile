import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SideMenu = ({ navigation }) => {
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {/* 닫기 버튼 기능 추가 */}}>
                <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
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
            <Text style={styles.logoutItem}>로그아웃</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        width: '33%', // 화면의 1/3 너비
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%', // 전체 높이
        borderRightWidth: 1, // 오른쪽 경계선 추가
        borderColor: '#ddd', // 경계선 색상
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
    menuItem: {
        fontSize: 18,
        marginVertical: 15, // 항목 간격 조정
        textAlign: 'left',
    },
    logoutItem: {
        fontSize: 18,
        marginTop: 'auto', // 로그아웃 항목을 하단으로 이동
        textAlign: 'left',
        color: '#007BFF', // 로그아웃 항목 색상
    },
});

export default SideMenu;
