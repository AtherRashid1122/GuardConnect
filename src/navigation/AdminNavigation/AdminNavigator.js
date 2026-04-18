import React from "react";
import AdminDashboard from '../../screens/AdminScreens/AdminDashboard'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer'
import GuardsScreen from '../../screens/AdminScreens/GuardsScreen'
import AdminProfile from "../../screens/AdminScreens/AdminProfile";
import RequestScreen from '../../screens/AdminScreens/RequestScreen'
import ShiftScreen from "../../screens/GuardScreens/ShiftsScreen";
import AddGuardScreen from '../../screens/GuardScreens/ShiftsScreen'
import GuardsStackNavigator from './GuardsStackNavigator'
import ChatScreen from "../../screens/GuardScreens/ChatScreen";
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const AdminNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Adimdashboard"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
            }} >
            <Drawer.Screen name="Adimdashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
            <Drawer.Screen name="GuardsScreen" component={GuardsStackNavigator} options={{ title: 'Manage Guards' }}
            />
            <Drawer.Screen name="AdminProfile" component={AdminProfile} options={{ title: 'Profile' }}
            />
            <Drawer.Screen name="RequestScreen" component={RequestScreen} options={{ title: 'Requests' }}
            />
            <Drawer.Screen name="ShiftScreen" component={ShiftScreen} options={{ title: 'Manage Shifts' }}
            />
               <Drawer.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat Shifts' }} 
screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
            }}
               

            />
        </Drawer.Navigator>
    )
}
export default AdminNavigator
