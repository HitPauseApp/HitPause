import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { encode as btoa } from 'base-64';

import utils from '../spotify/utils';

export default function SpotifyAuthButton() {

  // Endpoint
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const creds = {
    clientId: 'bc628be0b7a344a384e7acff4617a332',
    clientSecret: '14da02bb95bc49e1992ba34891678519',
    redirectUri: 'http://localhost:19006/'
  }

  const [userData, setUserData] = React.useState({
    accessToken: '',
    refreshToken: '',
    expirationTime: ''
  })

  // let userData = {
  //   accessToken: '',
  //   refreshToken: '',
  //   expirationTime: ''
  // }

  const [accessTokenAvailable, setTokenAvailble] = React.useState();

  // const [request, response, getAuthCode] = useAuthRequest(
  //   {
  //     clientId: creds.clientId,
  //     scopes: ['user-read-email', 'playlist-modify-public'],
  //     // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
  //     // this must be set to false
  //     usePKCE: false,
  //     // For usage in managed apps using the proxy
  //     redirectUri: creds.redirectUri

  //   },
  //   discovery
  // );

  const getAuthorizationCode = async () => {
    try {
      const credentials = creds //we wrote this function above
      const redirectUrl = credentials.redirectUri //this will be something like https://auth.expo.io/@your-username/your-app-slug
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      })
    } catch (err) {
      console.error(err)
    }
    return result.params.code;
  }

  const getTokens = async () => {
    try {
      const authResponse = await getAuthorizationCode();
      const authorizationCode = authResponse.params.code;
      const credentials = creds;
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      // const response = await fetch('https://accounts.spotify.com/api/token', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Basic ${credsB64}`,
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri
      //     }`,
      // });
      // const responseJson = await response.json();
      // const {
      //   access_token: accessToken,
      //   refresh_token: refreshToken,
      //   expires_in: expiresIn,
      // } = responseJson;

      // const expirationTime = new Date().getTime + expiresIn * 1000;
      // // userData.accessToken = accessToken;
      // // userData.refreshToken = refreshToken;
      // // userData.expirationTime = expirationTime;
      // setUserData({ accessToken: accessToken });
      // setUserData({ refreshToken: refreshToken });
      // setUserData({ expirationTime: expirationTime });
      console.log(authorizationCode);
    } catch (err) {
      console.error(err);
    }
  }


  const refreshTokens = async () => {
    try {
      const credentials = creds //we wrote this function above
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      // const refreshToken = await getUserData('refreshToken');
      const refreshToken = userData.refreshToken;
      console.log(refreshToken);
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
        await setUserData({ accessToken: newAccessToken });
        // userData.accessToken = newAccessToken;
        if (newRefreshToken) {
          await setUserData({ refreshToken: newRefreshToken });
          // userData.refreshToken = newRefreshToken;
        }
        await setUserData({ expirationTime: expirationTime });
        // userData.expirationTime = expirationTime;
      }
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    const tokenUpdating = async () => {
      const tokenExpirationTime = userData.expirationTime;

      if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
        // refreshTokens();
        getTokens();
      } else {
        setTokenAvailble(true);
      }
    }
    tokenUpdating();
  }, []);


  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => { getTokens() }}
    />
  );
}