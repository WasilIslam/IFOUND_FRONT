import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Feed from './Feed';
import Menu from './Menu';
import Add from './Add';
import colors from '../static/colors';
import { tabIcons } from '../static/icons';
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName=tabIcons[route.name] 
                        iconName+=focused?"":"-outline"
                        return <Ionicons name={iconName} size={size+5} color={color} />;
                    },
                    tabBarActiveTintColor: colors.purple,
                    tabBarInactiveTintColor: 'gray',
                    headerShown:false,
                })}
            >
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="Add" component={Add} />
                <Tab.Screen name="Menu" component={Menu} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
