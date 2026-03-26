import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GuardDashboard from "../../screens/GuardScreens/GuardDashboard";
const Stack = createNativeStackNavigator()
import GuardBottomTabNavigator from './GuardBottonTabNavigator'
const GuardNavigator = () => {
    return <GuardBottomTabNavigator/>
}
export default GuardNavigator;