import React,{useEffect} from "react";
import { Alert } from "react-native";
import AppNavigator from './src/navigation/AppNavigator'
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from "redux-persist/integration/react";
import messaging from "@react-native-firebase/messaging";
import { listenToTokenRefresh } from "./src/utils/fcmServices";
const App = () => {
 useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log("Foreground message:", remoteMessage);

      Alert.alert(
        remoteMessage?.notification?.title || "New Notification",
        remoteMessage?.notification?.body || "You received a new message"
      );
    });

    const unsubscribeTokenRefresh = listenToTokenRefresh();

    return () => {
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
export default App