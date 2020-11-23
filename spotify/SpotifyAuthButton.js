import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { AsyncStorage } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {

    const [config, setConfig] = React.useState({
    clientId: 'bc628be0b7a344a384e7acff4617a332',
    redirectUri: 'http://localhost:19006/',
    clientSecret: null,
    scopes: ['user-read-email', 'playlist-modify-public']
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: config.clientId,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: config.redirectUri
      //  makeRedirectUri({
      //   // For usage in bare and standalone
      //   native: 'your.app://redirect',
      // }),
    },
    discovery
  );

  let saveSpotifyToken = async (token) => {
    try {
      await AsyncStorage.setItem('SpotifyToken', token);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      saveSpotifyToken(access_token);
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

// import * as React from 'react';
// import firebase from '../Firebase.js';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest, exchangeCodeAsync, refreshAsync } from 'expo-auth-session';
// import { Button } from 'react-native';
// import SpotifyWebAPI from 'spotify-web-api-js';

// WebBrowser.maybeCompleteAuthSession();

// // Endpoint
// const discovery = {
//   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//   tokenEndpoint: 'https://accounts.spotify.com/api/token',
// };

// export default function SpotifyAuthButton() {
//   const [config, setConfig] = React.useState({
//     clientId: 'bc628be0b7a344a384e7acff4617a332',
//     redirectUri: 'http://localhost:19006/',
//     clientSecret: null,
//     scopes: ['user-read-email', 'playlist-modify-public']
//   });

//   const spotifyApi = new SpotifyWebAPI();
//   /*
//     Steps: 
//       1. Get Auth Code
//       2. Use auth code to get token
//       3. Check for token refresh timeout, get new token if needed

//   */

//   React.useEffect(() => {
//     async function getConfig() {
//       firebase.database().ref('hitpause/integrations/spotify/cs').once('value').then(s => {
//         setConfig({
//           clientId: 'bc628be0b7a344a384e7acff4617a332',
//           redirectUri: 'http://localhost:19006/',
//           clientSecret: s.val(), //THIS NEEDS TO BE MOVED TO A DATABASE CONNECTION!
//           scopes: ['user-read-email', 'playlist-modify-public']
//         });
//       });
//     }

//     getConfig();
//   }, []);

//   const [userData, setUserData] = React.useState({
//     accessToken: '',
//     refreshToken: '',
//     expirationTime: ''
//   });

//   //Get Auth Code (Step 1)
//   const [request, response, getAuthCode] = useAuthRequest(
//     {
//       clientId: config.clientId,
//       scopes: config.scopes,
//       // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
//       // this must be set to false
//       usePKCE: false,
//       redirectUri: config.redirectUri,
//     },
//     discovery
//   );

//   //Get our access token (Step 2)
//   let getToken = function (code) {

//     return exchangeCodeAsync(
//       {
//         clientId: config.clientId,
//         clientSecret: config.clientSecret,
//         scopes: config.scopes,
//         redirectUri: config.redirectUri,
//         code: code
//       },
//       discovery).then(token => { return token });
//   }

//   //Get a new token if it needs to be refreshed (Step 3)
//   let getRefreshToken = function (code) {
//     return refreshAsync(
//       {
//         clientId: config.clientId,
//         clientSecret: config.clientSecret,
//         scopes: config.scopes,
//         redirectUri: config.redirectUri,
//         code: code,
//         refreshToken: userData.refreshToken
//       },
//       discovery).then(token => { return token });
//   }

//   function checkIfTokenExpired({ expirationTime }) {
//     return new Date(expirationTime) < new Date();
//   }

//   function getUserPlaylists() {
//     spotifyApi
//       .getUserPlaylists()
//       .then(
//         function (data) {
//           console.log('User playlists', data);
//         },
//         function (err) {
//           console.error(err);
//         }
//       );
//   }

//   React.useEffect(() => {
//     let code;
//     if (response?.type === 'success') {
//       code = response.params.code;
//       let userToken = getToken(code);
//       userToken.then(function (result) {
//         setUserData({ accessToken: result.accessToken });
//         setUserData({ refreshToken: result.refreshToken });
//         const expirationTime = new Date().getTime() + result.expiresIn * 1000;
//         setUserData({ expirationTime: expirationTime });
//         spotifyApi.setAccessToken(result.accessToken);
//         getUserPlaylists();
//       });
//     }
//     (async () => {
//       let tokenExpired = await checkIfTokenExpired(userData.expirationTime);
//       if (tokenExpired) {
//         let newToken = getRefreshToken(code);
//         newToken.then(function (result) {
//           setUserData({ accessToken: result.accessToken });
//           setUserData({ refreshToken: result.refreshToken });
//           const expirationTime = new Date().getTime() + result.expiresIn * 1000;
//           setUserData({ expirationTime: expirationTime });
//         })
//       }
//     })();
//   }, [response]);

//   return (
//     <Button
//       title="Login To Spotify"
//       onPress={() => {
//         getAuthCode();
//       }}
//     />
//   );
// }
