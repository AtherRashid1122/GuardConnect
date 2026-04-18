import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GuardsScreen from '../../screens/AdminScreens/GuardsScreen'
import AddGuardScreen from "../../screens/AdminScreens/AddGuardScreen";
import EditGuardScreen from '../../screens/AdminScreens/EditGuardScreen'
import AssignShiftScreen from "../../screens/AdminScreens/AssignShiftScreen";
const Stack = createNativeStackNavigator();

const GuardsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GuardsLists" component={GuardsScreen} options={{ title: 'Manage Guards' }}
            />
            <Stack.Screen name="AddGuardScreen" component={AddGuardScreen} options={{ title: 'Add Guard' }} />
            <Stack.Screen name="EditGuardScreen" component={EditGuardScreen} options={{ title: 'Edit Guard' }} />
            <Stack.Screen name="AssignShiftScreen" component={AssignShiftScreen} options={{ title: 'Assign Guard' }} />

        </Stack.Navigator>
    )
}
export default GuardsStackNavigator;