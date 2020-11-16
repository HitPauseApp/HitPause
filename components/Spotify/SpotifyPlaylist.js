import * as React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Button } from 'react-native';

import SpotifyWebAPI from 'spotify-web-api-js';

export default function SpotifyPlaylist(){

  const spotifyApi = new SpotifyWebAPI();

  let getAccessToken = async () => {
    AsyncStorage.getItem('SpotifyToken', (err, result) => {
      // console.log(result);
      spotifyApi.setAccessToken(result);
      getPlaylist();
    });
  }

  function getPlaylist() {
    spotifyApi.getPlaylist('37i9dQZF1DX3rxVfibe1L0').then(
      function (data) {
        console.log('Albums information', data);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  React.useEffect(() => {
    // getAccessToken();
    // getPlaylist();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Spotify Playlist</Text>
      <Button onPress={getAccessToken} title="Load Playlist"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 10
  },
  header: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    textAlign: 'center'
  },
  bodyText: {
    color: 'white',
    fontFamily: 'Poppins-Extra-Light',
    marginTop: 5,
    textAlign: 'center',
  },
});
