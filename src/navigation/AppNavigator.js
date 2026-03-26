// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import AuthNavigator from "./AuthNavigator";
// import GuardNavigator from './GuardNavigation/GuardNavigator'
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const Stack = createNativeStackNavigator()
// const AppNavigator = () => {
//     const user=useSelector((state)=>state.auth.user);
//     const role=useSelector((state)=>state.auth.role)
// return(
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Auth" component={AuthNavigator} />
//         <Stack.Screen name="Guard" component={GuardNavigator} />
//     </Stack.Navigator>
// )

//     //return isLoggedIn ? <GuardNavigator /> : <AuthNavigator />
// }
// export default AppNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import GuardNavigator from './GuardNavigation/GuardNavigator'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminNavigator from '../navigation/AdminNavigator'
const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role)
    console.log("AppNavigator user:", user);
    console.log("AppNavigator role:", role);
    if (!user) {
  console.log("AppNavigator -> AuthNavigator");
  return <AuthNavigator />;
}

if (role === "admin") {
  console.log("AppNavigator -> AdminNavigator");
  return <AdminNavigator />;
}

if (role === "guard") {
  console.log("AppNavigator -> GuardNavigator");
  return <GuardNavigator />;
}}
export default AppNavigator;