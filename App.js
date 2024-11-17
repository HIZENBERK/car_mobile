import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'; // Text import 추가
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './view/Login';
import Main from './screens/Main';
import UseCar from './screens/UseCar';
import MakeExcel from "./screens/MakeExcel";
import ReceiptRegistration from "./screens/ReceiptRegistration";
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider import
import SideMenu from './screens/SideMenu'; // SideMenu 컴포넌트 import
import MyUse from './screens/MyUse'; // MyUse로 수정
import Setting from './screens/Setting'; // Setting 화면 추가
import ChangePassword from './screens/ChangePassword';
import Notice from './screens/Notice';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createStackNavigator();

  const handleLogin = () => setIsLoggedIn(true);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            {isLoggedIn ? (
                <Stack.Navigator initialRouteName="Main">
                  {/* Main 화면 */}
                  <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                  {/* UseCar 화면 */}
                  <Stack.Screen name="UseCar" component={UseCar} options={{ title: '운행 기록 시작' }} />
                  {/* MyUse 화면 추가 */}
                  <Stack.Screen name="MyUsage" component={MyUse} options={{ title: '내 사용 현황' }} />
                  {/* SideMenu 화면 추가 */}
                  <Stack.Screen name="SideMenu" component={SideMenu} options={{ title: '사이드 메뉴' }} />
                  {/* UseCar 화면 */}
                  <Stack.Screen name="CurrentUsage" component={MakeExcel} options={{ title: '차량 운행 기록부 생성' }} />
                  {/* UseCar 화면 */}
                  <Stack.Screen name="ExpenseRecord" component={ReceiptRegistration} options={{ title: '영수증 등록' }} />
                  <Stack.Screen name="Settings" component={Setting} options={{ title: '설정' }} />
                  <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '설정' }}/>
                  <Stack.Screen name="Notice" component={Notice} options={{ title: '공지사항' }}/>
                </Stack.Navigator>
            ) : (
                // 로그인 화면
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
});

export default App;
