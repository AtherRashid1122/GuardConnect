import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import requestNotificationPermission from './requestNotificationPermission';

export const getAndSaveFcmToken = async () => {
  try {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      console.log('Notification permission not granted');
      return null;
    }

    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);

    const currentUser = auth().currentUser;

    if (currentUser?.uid && token) {
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set(
          {
            fcmToken: token,
                  fcmTokenUpdatedAt: firestore.FieldValue.serverTimestamp(),

          },
          { merge: true }
        );
    }

    return token;
  } catch (error) {
    console.log('Get token error:', error);
    return null;
  }
};

export const listenToTokenRefresh = () => {
  return messaging().onTokenRefresh(async token => {
    try {
      console.log('Refreshed FCM TOKEN:', token);

      const currentUser = auth().currentUser;

      if (currentUser?.uid) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set(
            {
              fcmToken: token,
            },
            { merge: true }
          );
      }
    } catch (error) {
      console.log('Token refresh error:', error);
    }
  });
};