import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync, TokenResponse, refreshAsync } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyAuthButton() {

  /*
    Steps: 
      1. Get Auth Code
      2. Use auth code to get token
      3. Check for token refresh timeout, get new token if needed

  */

  const config = {
    clientId: 'bc628be0b7a344a384e7acff4617a332',
    redirectUri: 'http://localhost:19006/'
  }

  const [userData, setUserData] = React.useState({
    accessToken: '',
    refreshToken: '',
    expirationTime: ''
  });

  //Get Auth Code (Step 1)
  const [request, response, getAuthCode] = useAuthRequest(
    {
      clientId: config.clientId,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: config.redirectUri,
    },
    discovery
  );

  //Get our access token (Step 2)
  let getToken = function (code) {
    return exchangeCodeAsync(
      {
        clientId: config.clientId,
        clientSecret: '14da02bb95bc49e1992ba34891678519',
        scopes: ['user-read-email', 'playlist-modify-public'],
        redirectUri: config.redirectUri,
        code: code
      },
      discovery).then(token => { return token });
  }

  let getRefreshToken = function(code){
    return refreshAsync(
      {
        clientId: config.clientId,
        clientSecret: '14da02bb95bc49e1992ba34891678519',
        scopes: ['user-read-email', 'playlist-modify-public'],
        redirectUri: config.redirectUri,
        code: code,
        refreshToken: userData.refreshToken
      },
    discovery).then(token => {return token});
  }


  const checkForRefresh = function(){
    if(new Date().getTime() > userData.expirationTime ){
      // let updatedToken = getRefreshToken(code);
      // updatedToken.then(function(result){
      //   setUserData({accessToken: result.accessToken});
      //   setUserData({refreshToken: result.refreshToken});
      //   const expirationTime = new Date().getTime() + result.expiresIn * 1000;
      //   setUserData({expirationTime: expirationTime});
      // })
      console.log("Need New Token!");
    }
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      let userToken = getToken(code);
      userToken.then(function(result){
       setUserData({accessToken: result.accessToken});
       setUserData({refreshToken: result.refreshToken});
       const expirationTime = new Date().getTime() + result.expiresIn * 1000;
       setUserData({expirationTime: expirationTime});
       TokenResponse.fromQueryParams(result);
      });
      console.log(TokenResponse.isTokenFresh);
    }

    // if(new Date().getTime() > userData.expirationTime ){
    //   let updatedToken = getRefreshToken(code);
    //   updatedToken.then(function(result){
    //     setUserData({accessToken: result.accessToken});
    //     setUserData({refreshToken: result.refreshToken});
    //     const expirationTime = new Date().getTime() + result.expiresIn * 1000;
    //     setUserData({expirationTime: expirationTime});
    //   })
    // }
  }, [response]);



  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        getAuthCode();
      }}
    />
  );
}
