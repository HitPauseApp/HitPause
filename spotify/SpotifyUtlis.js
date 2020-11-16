import {exchangeCodeAsync, refreshAsync } from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const config = {
  clientId: 'bc628be0b7a344a384e7acff4617a332',
  redirectUri: 'http://localhost:19006/',
  clientSecret: null,
  scopes: ['user-read-email', 'playlist-modify-public']
};

 //Get our access token (Step 2)
 export function getToken(code) {

  return exchangeCodeAsync(
    {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      scopes: config.scopes,
      redirectUri: config.redirectUri,
      code: code
    },
    discovery).then(token => {
      setUserData({ accessToken: token.accessToken });
      setUserData({ refreshToken: token.refreshToken });
      const expirationTime = new Date().getTime() + token.expiresIn * 1000;
      setUserData({ expirationTime: expirationTime });
      saveSpotifyToken(token.accessToken);
      console.log(token.accessToken);
    });
}

//Get a new token if it needs to be refreshed (Step 3)
export function getRefreshToken(code) {
  return refreshAsync(
    {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      scopes: config.scopes,
      redirectUri: config.redirectUri,
      code: code,
      refreshToken: userData.refreshToken
    },
    discovery).then(token => { return token });
}

export function checkIfTokenExpired({ expirationTime }) {
  return new Date(expirationTime) < new Date();
}

export async function saveSpotifyToken(token) {
  try {
    await AsyncStorage.setItem('SpotifyToken', token);
  } catch (error) {
    console.log(error);
  }
}