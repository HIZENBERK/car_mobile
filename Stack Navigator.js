import { createStackNavigator } from '@react-navigation/stack';
import MyUsage from './screens/MyUsage';
import CurrentUsage from './screens/CurrentUsage';
import RegisterUsage from './screens/RegisterUsage';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                {/* 기존 스크린들 */}
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="MyUsage" component={MyUsage} />
                <Stack.Screen name="CurrentUsage" component={CurrentUsage} />
                <Stack.Screen name="RegisterUsage" component={RegisterUsage} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}