import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { encode as btoa } from 'base-64';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const credidentials = {
  clientId: 'bc628be0b7a344a384e7acff4617a332',
  clientSecret: '14da02bb95bc49e1992ba34891678519',
  redirectUri: 'http://localhost:19006/'
}
let userData = {
  accessToken: '',
  refreshToken: '',
  expirationTime: ''
}

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthCode();
    const creds = credidentials;
    const credsB64 = btoa(`${creds.clientId}:${creds.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'applicaton/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri
        }`,
    });
    const responseJson = await response.json();
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime + expiresIn * 1000;
    userData.accessToken = accessToken;
    userData.refreshToken = refreshToken;
    userData.expirationTime = expirationTime;
    console.log(userData);
  } catch (err) {
    console.error(err);
  }
}

export const refreshTokens = async () => {
  try {
    const credentials = await getSpotifyCredentials() //we wrote this function above
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = await getUserData('refreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      // await setUserData('accessToken', newAccessToken);
      userData.accessToken = newAccessToken;
      if (newRefreshToken) {
        // await setUserData('refreshToken', newRefreshToken);
        userData.refreshToken = newRefreshToken;
      }
      // await setUserData('expirationTime', expirationTime);
      userData.expirationTime = expirationTime;
    }
  } catch (err) {
    console.error(err)
  }
}
