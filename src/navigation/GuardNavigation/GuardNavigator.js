// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import GuardDashboard from "../../screens/GuardScreens/GuardDashboard";
// const Stack = createNativeStackNavigator()
// import GuardBottomTabNavigator from './GuardBottonTabNavigator'
// const GuardNavigator = () => {
//     return <GuardBottomTabNavigator/>
// }
// export default GuardNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GuardBottomTabNavigator from './GuardBottonTabNavigator'
import ShiftsDetailScreen from '../../screens/GuardScreens/ShiftDetailScreen'
const Stack = createNativeStackNavigator()
const GuardNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='GuardBottomTabNavigator' component={GuardBottomTabNavigator} 
            options={{ headerShown: false }} />
            <Stack.Screen name='ShiftsDetailScreen' component={ShiftsDetailScreen} />
        </Stack.Navigator>
    )
}
export default GuardNavigator