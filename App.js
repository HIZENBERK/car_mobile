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
                    {/* UseCar 화면 */}
                    <Stack.Screen name="MakeExcel" component={MakeExcel} options={{ title: '차량 운행 기록부 생성' }} />
                    {/* UseCar 화면 */}
                    <Stack.Screen name="ReceiptRegistration" component={ReceiptRegistration} options={{ title: '영수증 등록' }} />
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
