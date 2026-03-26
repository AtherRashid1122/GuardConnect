import React from "react";
import AdminDashboard from '../screens/AdminScreens/AdminDashboard'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator()

const AdminNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Adimdashboard" component={AdminDashboard} />
        </Stack.Navigator>
    )
}
export default AdminNavigator