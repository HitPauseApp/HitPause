import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import firebase from './Firebase';
import { AuthContext } from './AuthContext.js';
import { AppContext } from './AppContext';
import AppIcons from './components/AppIcons';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import PauseSurvey from './screens/surveys/PauseSurvey';
import PauseHome from './screens/surveys/PauseHome';
import ProfileSurvey from './screens/surveys/ProfileSurvey';
import Loading from './screens/Loading';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import JournalScreen from './screens/journal/JournalScreen';
import JournalEntry from './screens/journal/JournalEntry';
import AccountSummary from './screens/account/AccountSummary';
import AccountTraits from './screens/account/AccountTraits';
import NotificationsScreen from './screens/account/NotificationsScreen';
import WelcomeTutorial from './screens/WelcomeTutorial';
import BadgeScreen from './screens/account/BadgeScreen';
import ReviewScreen from './screens/ReviewScreen';
import AdminPanel from './screens/admin/AdminPanel';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();

// Spotify Endpoints
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App(props) {
  const [isLoadingApp, setIsLoadingApp] = React.useState(true);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(null);
  const [hitpause, setHitpause] = React.useState(null);


  if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
  }
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...FontAwesome5.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
          'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
          'Poppins-Extra-Light': require('./assets/fonts/Poppins-ExtraLight.ttf'),

        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsLoadingApp(false);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();


    // Establish firebase authentication observer
    firebase.auth().onAuthStateChanged(async (user) => {
      setIsLoadingUser(true);
      // If user exists after the auth state has changed
      if (user) {
        console.log("Logged in as:", user.email);
        await updateAuthContext(user.uid);
        // handleSpotifyLogin();
        setHitpause(await getAppData());
        setIsLoadingUser(false);
      } else {
        setAuthUser(null);
        setIsLoadingUser(false);
      }
    });
  },[]);

  async function updateAuthContext(uid) {
    let userData = null;
    // Get data from firebase
    let data = await firebase.database().ref(`users/${uid}`).once('value').then(s => s.val());
    if (data) {
      userData = {
        uid: uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        isAdmin: data.isAdmin,
        isNewUser: data.isNewUser,
        memberSince: data.memberSince,
        ref: firebase.database().ref(`users/${uid}`)
      };
    }
    setAuthUser(userData);
  }

  // Loads data used by the app (non-account-specific)
  async function getAppData() {
    let suggestions = await firebase.database().ref('hitpause/suggestions').once('value').then(s => s.val());
    let traits = await firebase.database().ref('hitpause/traits').once('value').then(s => s.val());
    let badges = await firebase.database().ref('hitpause/badges').once('value').then(s => s.val());
    let ref = firebase.database().ref(`hitpause`);
    return { suggestions, traits, badges, ref };
  }

  function HomeTabNavigator() {
    return (
      <HomeTab.Navigator
        initialRouteName='Home'
        activeColor='#132090'
        inactiveColor='black'
        barStyle={{ backgroundColor: 'white' }}
      >
        <HomeTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialcommunityicons:home" color={color} size={26} />,
          }}
        />
        <HomeTab.Screen
          name="Journal"
          component={JournalScreen}
          options={{
            title: 'Journal',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialcommunityicons:book" color={color} size={26} />,
          }}
        />
        <HomeTab.Screen
          name="PauseHome"
          component={PauseHome}
          options={{
            title: 'Pause Survey Home',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialcommunityicons:pause" color={color} size={26} />,
          }}
        />
        <HomeTab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'History',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialcommunityicons:bookmark" color={color} size={26} />,
          }}
        />
        <HomeTab.Screen
          name="Account"
          component = {AccountSummary}
          options={{
            title: 'Account',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialicons:person" color={color} size={26} />,
          }}
        />
      </HomeTab.Navigator>
    )
  }

  // Display loading screen if app or user is being loaded
  if (isLoadingApp || isLoadingUser) return <Loading></Loading>;
  // If authUser is null, display pre-login screens
  else if (authUser == null) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default"></StatusBar>
        <NavigationContainer>
          <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen
              name="Login"
              component={Login}
            />
            <AuthStack.Screen
              name="SignUp"
              component={SignUp}
            />
            <AuthStack.Screen
              name="ResetPassword"
              component={ResetPassword}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
  // Otherwise, we are logged in
  else {
    return (
      <AuthContext.Provider value={authUser}>
        <PaperProvider>
          <View style={styles.container}>
          <StatusBar barStyle="default" />
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <StatusBar barStyle="default" />}
            <AppContext.Provider value={hitpause}>

              <NavigationContainer>
                <MainStack.Navigator>
                  {/* Main Tab Navigator */}
                  <MainStack.Screen
                    name="HomeTabNavigator"
                    component={HomeTabNavigator}
                    options={{ headerShown: false }}
                  />
                  {/* Screens without bottom tab */}
                  <MainStack.Screen
                    name="AdminPanel"
                    component={AdminPanel}
                    options={{ headerTitle: 'Admin Panel' }}
                  />
                  <MainStack.Screen
                    name="ProfileSurvey"
                    component={ProfileSurvey}
                    options={{ headerTitle: 'Profile Survey' }}
                  />
                  <MainStack.Screen
                    name="PauseSurvey"
                    component={PauseSurvey}
                    options={{ headerTitle: 'Pause Survey' }}
                  />
                  <MainStack.Screen
                    name="JournalEntry"
                    component={JournalEntry}
                    options={{ headerTitle: 'Journal Entry' }}
                  />
                  <MainStack.Screen
                    name="AccountTraits"
                    component={AccountTraits}
                    options={{ headerTitle: 'Account Traits' }}
                  />
                  <MainStack.Screen
                    name="NotificationsScreen"
                    component={NotificationsScreen}
                    options={{ headerTitle: 'Notification Settings' }}
                  />
                  <MainStack.Screen
                    name="WelcomeTutorial"
                    component={WelcomeTutorial}
                    options={{ headerShown: false, headerTitle: 'Welcome Tutorial' }}
                  />
                  <MainStack.Screen
                    name="BadgeScreen"
                    component={BadgeScreen}
                    options={{headerTitle: 'My Badges' }}
                  />
                  <MainStack.Screen
                    name="ReviewScreen"
                    component={ReviewScreen}
                    options={{headerTitle: 'Review Suggestion' }}
                  />
                </MainStack.Navigator>
              </NavigationContainer>
            </AppContext.Provider>
          </View>
        </PaperProvider>
      </AuthContext.Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
  },
});







