import * as React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';

import SpotifyWebAPI from 'spotify-web-api-js';

export default function SpotifyPlaylist() {

  const [playlistData, setPlaylistData] = React.useState('Awaiting Authorization');

  const spotifyApi = new SpotifyWebAPI();

  let getAccessToken = async () => {
    AsyncStorage.getItem('SpotifyToken', (err, result) => {
      // console.log(result);
      if (result) {
        spotifyApi.setAccessToken(result);
      }
    });
  }

  let getPlaylist = () => {
    spotifyApi.getPlaylist('37i9dQZF1DX3rxVfibe1L0').then(
      function (data) {
        setPlaylistData({
          title: data.name,
          author: data.owner.display_name,
          image: data.images[0].url
        });
        // console.log('Albums information', data);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  React.useEffect(() => {
    getAccessToken();
    getPlaylist();
  }, [playlistData.title]);

  return (
    <View style={styles.container}>
      <View>
        <Image
        style={styles.spotifyImage}
        source={{
          uri: `${playlistData.image}`,
        }}
      />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{playlistData.title}</Text>
        <Text style={styles.bodyText}>Created By: {playlistData.author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132090',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 10,
    flexDirection: "row"
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
  spotifyImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: "center"
  }
});
