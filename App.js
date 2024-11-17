import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './screens/Main';
import UseCar from './screens/UseCar';
import Login from './view/Login';
import MyUseHistory from './view/MyUseHistory'; // 내 사용 현황 페이지 import
import MakeExcel from './view/MakeExcel';
import ReceiptRegistration from './view/ReceiptRegistration';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
    return (
        <SafeAreaView style={styles.sidebar}>
            <Button
                title="메인"
                onPress={() => {
                    navigation.navigate('Main');
                    navigation.closeDrawer(); // 사이드바 닫기
                }}
            />
            <Button
                title="내 사용 현황"
                onPress={() => {
                    navigation.navigate('MyUseHistory'); // 내 사용 현황 페이지로 이동
                    navigation.closeDrawer(); // 사이드바 닫기
                }}
            />
            <Button
                title="설정"
                onPress={() => {
                    alert('설정 메뉴를 선택했습니다.');
                    navigation.closeDrawer(); // 사이드바 닫기
                }}
            />
        </SafeAreaView>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => setIsLoggedIn(true);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
                    {isLoggedIn ? (
                        <Drawer.Navigator
                            drawerContent={(props) => <CustomDrawerContent {...props} />}
                            screenOptions={{
                                headerShown: true,
                                drawerType: 'front',
                                gestureEnabled: true,
                                overlayColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <Drawer.Screen
                                name="Main"
                                component={Main}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <Button
                                            title="메뉴"
                                            onPress={() => navigation.openDrawer()}
                                        />
                                    ),
                                })}
                            />
                            <Drawer.Screen
                                name="UseCar"
                                component={UseCar}
                                options={({ navigation }) => ({
                                    title: '운행 기록 시작',
                                    headerLeft: () => (
                                        <Button
                                            title="뒤로가기"
                                            onPress={() => navigation.goBack()}
                                        />
                                    ),
                                })}
                            />
                            {/* MyUseHistory 추가 */}
                            <Drawer.Screen
                                name="MyUseHistory"
                                component={MyUseHistory}
                                options={({ navigation }) => ({
                                    title: '내 사용 현황',
                                    headerLeft: () => (
                                        <Button
                                            title="뒤로가기"
                                            onPress={() => navigation.goBack()}
                                        />
                                    ),
                                })}
                            />
                            {/* MakeExcel 추가 */}
                            <Drawer.Screen
                                name="MakeExcel"
                                component={MakeExcel}
                                options={({ navigation }) => ({
                                    title: '차량운행기록부 생성',
                                    headerLeft: () => (
                                        <Button
                                            title="뒤로가기"
                                            onPress={() => navigation.goBack()}
                                        />
                                    ),
                                })}
                            />
                            {/* ReceiptRegistration 추가 */}
                            <Drawer.Screen
                                name="ReceiptRegistration"
                                component={ReceiptRegistration}
                                options={({ navigation }) => ({
                                    title: '영수증 등록',
                                    headerLeft: () => (
                                        <Button
                                            title="뒤로가기"
                                            onPress={() => navigation.goBack()}
                                        />
                                    ),
                                })}
                            />
                        </Drawer.Navigator>
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    sidebar: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
