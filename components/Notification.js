import { useState, useEffect, useRef, useContext, memo } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Contexto } from '../functions/Context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Notification({navigation}) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const {EXPO_PUBLIC_API_URL} = process.env
  const {user} = useContext(Contexto)

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      handleNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const setTokenValues = async () => {
      await fetch(`${EXPO_PUBLIC_API_URL}/api/users/setToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
        },
        body: JSON.stringify({userId: user.id, token: expoPushToken})
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }

    if(user){
      setTokenValues()
    }
  }, [expoPushToken])

  function handleNotification(notification) {
    const data = notification?.data;
    if(data){
      if (data.screen) {
        if(data.commerceId){
          navigation.navigate(data.screen, {commerce_id: data.commerceId});
        }else{
          navigation.navigate(data.screen);
        }
      }
    }
  }
  
  return <></>
}

export default memo(Notification)


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Por Favor activa las notificaciones para CiudadGPS!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}