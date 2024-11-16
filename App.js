import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'; // Text import 추가
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './view/Login';
import Main from './screens/Main';
import UseCar from './screens/UseCar';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider import


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="UseCar" component={UseCar} options={{ title: '운행 기록 시작' }} />
        </Stack.Navigator>
    );
}

function SidebarContent() {
    return (
        <SafeAreaView style={styles.sidebar}>
            {/* 사이드바 내용 추가 */}
            <Text style={styles.sidebarText}>메뉴 1</Text>
            <Text style={styles.sidebarText}>메뉴 2</Text>
        </SafeAreaView>
    );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            {isLoggedIn ? (
                <Drawer.Navigator
                    drawerContent={(props) => <SidebarContent {...props} />}
                    screenOptions={{ drawerStyle: { backgroundColor: '#e6e6e6', width: 240 } }}
                >
                    <Drawer.Screen name="Home" component={MainStack} options={{ headerShown: false }} />
                    <Drawer.Screen name="Other" component={UseCar} />
                </Drawer.Navigator>
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
