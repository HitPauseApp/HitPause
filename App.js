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
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import firebase from './Firebase';
import { AuthContext } from './AuthContext.js';
import { AppContext } from './AppContext';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import QuizScreen from './screens/surveys/QuizScreen';
import PauseSurvey from './screens/surveys/PauseSurvey';
import Loading from './screens/Loading';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import JournalScreen from './screens/journal/JournalScreen';
import JournalEntry from './screens/journal/JournalEntry';
import AccountSummary from './screens/account/AccountSummary';
import AccountTraits from './screens/account/AccountTraits';

import { AsyncStorage } from 'react-native';
import AdminPanel from './components/admin/AdminPanel';
import AppIcons from './components/AppIcons';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();

export default function App(props) {
  const [isLoadingApp, setIsLoadingApp] = React.useState(true);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);
  const [isAppConnected, setIsAppConnected] = React.useState(false);
  const [authNavState, setAuthNavState] = React.useState('Home');
  // TODO: There's probably a better way to pass these without using state...?
  const [authUser, setAuthUser] = React.useState(null);
  const [hitpause, setHitpause] = React.useState(null);
  const [config, setConfig] = React.useState({
    clientId: 'bc628be0b7a344a384e7acff4617a332',
    redirectUri: 'http://localhost:19006/',
    scopes: ['user-read-email', 'playlist-modify-public']
  });

  if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
  }

  //Sign in with Implicit Grant flow. NO USER DATA IS ACCESSIBLE HERE
  let handleSpotifyLogin = async () => {
    // let redirectUrl = AuthSession.getRedirectUrl();
    let results = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=user-read-email&response_type=token`,
      returnUrl: config.redirectUri
    });
    //return the access token
    console.log(results);
    if (results.type === 'success' && !!results.params.access_token) {
      saveSpotifyToken(results.params.access_token);
    } else if (results.type === 'dismiss') {
      console.error("Spotify Signin & Token Generation Failed (App.js -> handleSpotifyLogin). Results were 'dismissed' (signin window closed)");
    } else if (results.type === 'error') {
      console.error("Spotify Signin & Token Generation Failed (App.js -> handleSpotifyLogin). Results returned an error (probably a 404/401 to Spotify)")
    } else {
      console.error("Unkown Failure... Spotify Signin & Token Generation Failed (App.js -> handleSpotifyLogin)");
    }
  };

  let saveSpotifyToken = async (token) => {
    try {
      await AsyncStorage.setItem('SpotifyToken', token);
    } catch (error) {
      console.log(error);
    }
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        console.log('plat', Platform)

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
        await updateAuthContext(user.uid, isAppConnected);
        // handleSpotifyLogin();
        setHitpause(await getAppData());
        setIsLoadingUser(false);
      } else {
        setAuthUser(null);
        setIsLoadingUser(false);
      }
    });

    // Check firebase connection status
    firebase.database().ref('.info/connected').on('value', s => {
      if (s.val() === true) {
        setIsAppConnected(true);
        // Update AuthContext using firebase
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) { // <-- NEW
          updateAuthContext(firebase.auth().currentUser.uid, true);
        }                                                                     // <-- New
      } else {
        setIsAppConnected(false);
      }
    });
  }, []);

  async function updateAuthContext(uid, useFirebase) {
    let userData = {};
    if (useFirebase) {
      // Get data from firebase
      let data = await firebase.database().ref(`users/${uid}`).once('value').then(s => s.val());
      userData = {
        uid: uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        admin: data.admin,
        isNewUser: data.isNewUser,
        spotifyToken: data.spotifyToken,
        ref: firebase.database().ref(`users/${uid}`)
      };
      // Store firebase data locally
      AsyncStorage.setItem('userData', JSON.stringify(userData));
    } else {
      // Get data from local storage
      userData = JSON.parse(await AsyncStorage.getItem('userData'));
      // If no 'userData' object exists
      if (userData == null) {
        // Try one more time to load data from firebase
        console.log('Local userData was null... trying to load from Firebase');
        setTimeout(await updateAuthContext(uid, true), 3000);
        return;
      }
    }
    setAuthUser(userData);
  }

  // Loads data used by the app (non-account-specific)
  async function getAppData() {
    let suggestions = await firebase.database().ref('hitpause/suggestions').once('value').then(s => s.val());
    let traits = await firebase.database().ref('hitpause/traits').once('value').then(s => s.val());
    return { suggestions, traits };
  }

  function HomeTabNavigator() {
    return (
      <HomeTab.Navigator
        initialRouteName='Home'
        activeColor='#6050DC'
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
          name="PauseSurvey"
          component={PauseSurvey}
          options={{
            title: 'HitPause Quiz',
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
          component={AccountSummary}
          options={{
            title: 'Account',
            tabBarLabel: false,
            tabBarIcon: ({ color }) => <AppIcons name="materialicons:person" color={color} size={26} />,
          }}
        />
      </HomeTab.Navigator>
    )
  }

  // TODO: A lot of this structure probably ought to be broken out into separate files
  //       Doing so might fix the 'state change on unmounted componente' error
  // Display loading screen if app or user is being loaded
  if (isLoadingApp || isLoadingUser) return <Loading></Loading>;
  // If authUser is null, display pre-login screens
  else if (authUser == null) {
    return (
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
    );
  }
  // Otherwise, we are logged in
  else {
    return (
      <AuthContext.Provider value={authUser}>
        <PaperProvider>
          <View style={styles.container}>
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
                    name="InitialAssessment"
                    component={QuizScreen}
                    initialParams={{ quizName: 'initialAssessment' }}
                    options={{ headerTitle: 'Initial Survey' }}
                  />
                  <MainStack.Screen
                    name="IncidentQuestionnaire"
                    component={QuizScreen}
                    initialParams={{ quizName: 'incidentQuestionnaire' }}
                    options={{ headerTitle: 'Incident Survey' }}
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







