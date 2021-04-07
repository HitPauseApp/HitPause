import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationHandler(props) {
  const user = React.useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [QOTD, setQOTD] = useState();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const getQOTD = async () => {
    try {
      const value = await AsyncStorage.getItem('QOTD')
        console.warn("Notification " + value);
        setQOTD(value);
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(() => {
    getQOTD();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    user.ref.child(`settings/notifications/${props.notificationType}`).once('value').then(s => {
      setIsSwitchOn(s.val());
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  async function onClick() {
    onToggleSwitch();
    if (!isSwitchOn) {
      await schedulePushNotification(props, QOTD);
      user.ref.child(`settings/notifications/${props.notificationType}`).set(true);
    }
    else user.ref.child(`settings/notifications/${props.notificationType}`).set(false);
  }
  
  return (
    <View>
      <Switch
        value={isSwitchOn}
        onValueChange={onClick}
        style={{}}
      />
    </View>
  );
}

async function schedulePushNotification(props, QOTD) {
  let quoteData = QOTD;
  if (props.notificationType === 'enable_all') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "HitPause",
        body: "Thank you for subscribing to all of our notifications!",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
  else if (props.notificationType === 'survey_reminder') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "HitPause",
        body: "Reminder! Don't forget to take your daily Pause Survey!",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
  else if (props.notificationType === 'QOTD') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "HitPause - Quote of the Day",
        body: '"' + quoteData + '"',
        data: { data: quoteData },
      },
      trigger: { seconds: 1 },
    });
  }
  else if (props.notificationType === 'checkin_reminder') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "HitPause",
        body: "Reminder! Don't forget to check in with us!",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice && !Constants.platform.web) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
