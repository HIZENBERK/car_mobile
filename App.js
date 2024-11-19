import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './view/Login';
import Main from './screens/Main';
import UseCar from './screens/UseCar';
import MakeExcel from './screens/MakeExcel';
import ReceiptRegistration from './screens/ReceiptRegistration';
import SideMenu from './screens/SideMenu';
import MyUse from './screens/MyUse';
import Setting from './screens/Setting';
import ChangePassword from './screens/ChangePassword';
import Notice from './screens/Notice';
import ExpenseRecord from './screens/ExpenseRecord';
import NoticeDetail from './screens/NoticeDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createStackNavigator();

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Login"}>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}>
            {(props) => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>

          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="UseCar" component={UseCar} options={{ title: '운행 기록 시작' }} />
          <Stack.Screen name="MyUsage" component={MyUse} options={{ title: '내 사용 현황' }} />
          <Stack.Screen name="SideMenu" component={SideMenu} options={{ title: '사이드 메뉴' }} />
          <Stack.Screen name="CurrentUsage" component={MakeExcel} options={{ title: '차량 운행 기록부 생성' }} />
          <Stack.Screen name="Settings" component={Setting} options={{ title: '설정' }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '설정' }} />
          <Stack.Screen name="Notice" component={Notice} options={{ title: '공지사항' }} />
          <Stack.Screen name="ExpenseRecord" component={ExpenseRecord} options={{ title: '지출 내역 조회' }} />
          <Stack.Screen name="ReceiptRegistration" component={ReceiptRegistration} options={{ title: '지출 내역 영수증 등록 ' }} />
          <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
