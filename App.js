import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import firebase from './Firebase';
import { AuthContext } from './AuthContext.js';
import { AppContext } from './AppContext';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import QuizScreen from './screens/QuizScreen';
import ResetPassword from './screens/ResetPassword';
import Loading from './screens/Loading';
import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import HistoryScreen from './screens/HistoryScreen';
import JournalEntry from './screens/JournalEntry';

import AccountStack from './screens/account/AccountStack';

import { AsyncStorage } from 'react-native';
import { InputGroup } from 'native-base';
import AdminPanel from './components/admin/AdminPanel';
import AppIcons from './components/AppIcons';

const AuthStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const JournalStack = createStackNavigator();
const HomeStack = createStackNavigator();

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

  function JournalStackScreen(navigation, route) {

    // if (route.state && route.state.index > 0) {
    //   navigation.setOptions= {options:{tabBarVisible:false}}
    // }
    // else {
    //   navigation.setOptions= {options:{tabBarVisible:true}}
    // }
    return (
       <JournalStack.Navigator headerMode="none">
        <JournalStack.Screen
          name="JournalScreen"
          component={JournalScreen}
        />
        <JournalStack.Screen
          name="JournalEntry"
          component={JournalEntry}
          options={{
            tabBarVisible:false
          }}
        />
      </JournalStack.Navigator>
    );
  }

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
        />
        <HomeStack.Screen
          name="InitialAssessment"
          component={QuizScreen}
          initialParams={{ quizName: 'initialAssessment' }}
        />
        <HomeStack.Screen
          name="AdminPanel"
          component={AdminPanel}
        />
        
      </HomeStack.Navigator>
    )
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
    if(results.type === 'success' && !!results.params.access_token){
      saveSpotifyToken(results.params.access_token);
    }else if (results.type === 'dismiss'){
      console.error("Spotify Signin & Token Generation Failed (App.js -> handleSpotifyLogin). Results were 'dismissed' (signin window closed)");
    }else if (results.type === 'error'){
      console.error("Spotify Signin & Token Generation Failed (App.js -> handleSpotifyLogin). Results returned an error (probably a 404/401 to Spotify)")
    }else{
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
            <AppContext.Provider value={hitpause}>

              <NavigationContainer>
                <Tab.Navigator 
                  initialRouteName='Home'
                  activeColor='#6050DC'
                  inactiveColor='black'
                  barStyle={{ backgroundColor: 'white' }}
                >
                  <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                      title: 'Home',
                      tabBarLabel: false,
                      tabBarIcon: ({ color }) => (
                        <AppIcons name="materialcommunityicons:home" color={color} size={26} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Journal"
                    component={JournalStackScreen}
                    options={{
                      title: 'Journal',
                      tabBarLabel: false,
                      tabBarIcon: ({ color }) => (
                        <AppIcons name="materialcommunityicons:book" color={color} size={26} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="PauseQuiz"
                    component={QuizScreen}
                    initialParams={{ quizName: 'incidentQuestionnaire' }}
                    options={{
                      title: 'HitPause Quiz',
                      tabBarLabel: false,
                      tabBarIcon: ({ color }) => (
                        <AppIcons name="materialcommunityicons:pause" color={color} size={26} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{
                      title: 'History',
                      tabBarLabel: false,
                      tabBarIcon: ({ color }) => (
                        <AppIcons name="materialcommunityicons:bookmark" color={color} size={26} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Account"
                    component={AccountStack}
                    options={{
                      title: 'Account',
                      tabBarLabel: false,
                      tabBarIcon: ({ color }) =>(
                        <AppIcons name="materialicons:person" color={color} size={26} />
                      ),
                    }}
                  />
                </Tab.Navigator>
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







