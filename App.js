import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './view/Login';
import Main from './screens/Main';
import UseCar from './screens/UseCar';
import Setting from './screens/Setting'; // Setting 화면 추가
import ChangePassword from './screens/ChangePassword';
import Notice from './screens/Notice';
import NoticeDetail from './screens/NoticeDetail';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
              {/* Setting 화면 추가 */}
              <Stack.Screen name="Setting" component={Setting} options={{ title: '설정' }} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '설정' }}/>
              <Stack.Screen name="Notice" component={Notice} options={{ title: '공지사항' }}/>
              <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
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
