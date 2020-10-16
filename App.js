import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
import { Provider as PaperProvider } from 'react-native-paper';

import firebase from './Firebase';
import { AuthContext } from './AuthContext.js';

// TODO: Remove?
// import BottomTabNavigator from './navigation/BottomTabNavigator';
// import useLinking from './navigation/useLinking';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import QuizScreen from './screens/QuizScreen';
import ResetPassword from './screens/ResetPassword';
import Loading from './screens/Loading';
import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import LikesScreen from './screens/LikesScreen';
import Account from './screens/AccountScreen';
import JournalEntry from './screens/JournalEntry';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const JournalStack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [preAuthNavState, setPreAuthNavState] = React.useState('Login');
  const [authNavState, setAuthNavState] = React.useState('Home');
  const [authUser, setAuthUser] = React.useState(null);
  const containerRef = React.useRef();
  
  // const { getInitialState } = useLinking(containerRef);

  function JournalStackScreen() {
    return (
      <JournalStack.Navigator headerMode="none">
        <JournalStack.Screen
          name="JournalScreen"
          component={JournalScreen}
        />
        <JournalStack.Screen
          name="JournalEntry"
          component={JournalEntry}
        />
      </JournalStack.Navigator>
    );
  }
  
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setpreAuthNavState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
          'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
          'poppins-thin': require('./assets/fonts/Poppins-Thin.ttf'),
          'poppins-extra-light': require('./assets/fonts/Poppins-ExtraLight.ttf'),

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

    // Establish firebase authentication observer
    // TODO: react-native-firebase auth state persistence
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticating(true);
      if (user) {
        // There is a user
        console.log("Logged in as:", user.email);
        firebase.database().ref(`users/${user.uid}`).once('value').then(s => {
          setAuthUser(s.val());
          // If user profile does not exist (new user)
          if (!s.val().profile) {
            setAuthNavState('InitialAssessment');
          }
          setIsAuthenticating(false);
        });
      } else {
        setAuthUser(null);
        setIsAuthenticating(false);
      }
    });
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else if (isAuthenticating) {
    return <Loading></Loading>;
  } else {
    return (
      <AuthContext.Provider value={authUser}>
        <PaperProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef}>
              {/* Display authentication screens or app screens based on userToken */}
              { authUser == null ? (
                <Stack.Navigator initialRouteName={preAuthNavState} headerMode="none">
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="ResetPassword" component={ResetPassword} />
                </Stack.Navigator>
              ) : (
                <Tab.Navigator
                  initialRouteName={authNavState}
                >
                  <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      title: 'Home',
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
                    }}
                  />
                  <Tab.Screen
                    name="Journal"
                    component={JournalStackScreen}
                    options={{
                      title: 'Journal',
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                    }}
                  />
                  <Tab.Screen
                    name="PauseQuiz"
                    component={QuizScreen}
                    initialParams={{ quizName: 'incidentQuestionnaire' }}
                    options={{
                      title: 'HitPause Quiz',
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pause" />,
                    }}
                  />
                  <Tab.Screen
                    name="Likes"
                    component={LikesScreen}
                    options={{
                      title: 'My Likes',
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart" />,
                    }}
                  />
                  <Tab.Screen
                    name="Account"
                    component={Account}
                    options={{
                      title: 'Account',
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
                    }}
                  />
                  {/* Hidden tabs */}
                  <Tab.Screen
                    name='InitialAssessment'
                    component={QuizScreen}
                    initialParams={{ quizName: 'initialAssessment' }}
                    options={{
                      tabBarButton: () => null
                    }}
                  />
                </Tab.Navigator>
              )}
            </NavigationContainer>
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







