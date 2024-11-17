import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import makeExcelStyle from '../style/MakeExcelStyle';
import SideMenu from './SideMenu'; // 사이드 메뉴 컴포넌트 import
import { useNavigation } from '@react-navigation/native'; // useNavigation 임포트

const MakeExcel = () => {
    const navigation = useNavigation(); // navigation 객체 받기
    const [showMenu, setShowMenu] = useState(false); // 사이드 메뉴 표시 여부
    const [menuAnimation] = useState(new Animated.Value(-300)); // 사이드 메뉴 애니메이션 값

    const toggleSideMenu = () => {
        if (showMenu) {
            // 메뉴 닫기
            Animated.timing(menuAnimation, {
                toValue: -300, // 메뉴가 화면 밖으로 나가도록
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowMenu(false));
        } else {
            // 메뉴 열기
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

    const data = [
        { id: '1', name: '134가 1234', details: '차량운행기록부 생성' },
        // 필요한 데이터를 더 추가
    ];

    return (
        <View style={makeExcelStyle.container}>
            {/* 헤더 */}
            <View style={makeExcelStyle.header}>
                <Text style={makeExcelStyle.title}>[번호] 134가 1234</Text>
                <TouchableOpacity style={makeExcelStyle.downloadIcon}>
                    <Text>⬇️ 다운로드</Text>
                </TouchableOpacity>
            </View>

            {/* 검색 바 */}
            <View style={makeExcelStyle.searchBar}>
                <TextInput style={makeExcelStyle.input} placeholder="조회기간" />
                <Button title="선택 생성" onPress={() => {}} />
            </View>

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
                <SideMenu navigation={navigation} />
            </Animated.View>
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
