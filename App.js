import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import firebase from './Firebase';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import QuizScreen from './screens/QuizScreen';

import ResetPassword from './screens/ResetPassword';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState('Login');
  const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);

  // Establish firebase authentication observer
  var currentUser = null
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // There is a user
      console.log("Auth user is non-null");
      currentUser = user;
      console.log(currentUser.email);
      containerRef.current?.navigate('Root');
    } else {
      // There is not a user
      console.log("Auth user is null");
    }
  });

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
          'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
          'poppins-thin': require('./assets/fonts/Poppins-Thin.ttf'),

        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <PaperProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef}>
            <Stack.Navigator initialRouteName={initialNavigationState} headerMode="none">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen name="QuizScreen" component={QuizScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
  },
});







