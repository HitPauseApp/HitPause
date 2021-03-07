/*

 Contains the Spotify Playlist display component. 
*/

import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyWebAPI from 'spotify-web-api-js';
import { AuthContext } from '../../AuthContext';
import { RFValue } from 'react-native-responsive-fontsize';

export default function SpotifyPlaylist(props) {
  const user = React.useContext(AuthContext);
  const [playlistData, setPlaylistData] = React.useState({
    title: 'Awaiting Authorization',
    auther: 'Awaiting Authorization',
    image: null
  });

  const spotifyApi = new SpotifyWebAPI();

  let getAccessToken = async () => {
    AsyncStorage.getItem('SpotifyToken', (err, result) => {
      // console.log(result);
      if (result) {
        spotifyApi.setAccessToken(result);
        console.log("Spotify authenticated from Async");
      }
    });
  }

  let playlistURI = () => {
    let url = props.href;
    let uri = url.split("/").pop();
    return uri;
  }

  let getPlaylist = () => {
    spotifyApi.getPlaylist(playlistURI()).then(
      function (data) {
        setPlaylistData({
          title: data.name,
          author: data.owner.display_name,
          image: data.images[0].url
        });
      },
      function (err) {
        console.warn("Spotify Error: Could not get resource")
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
    margin: 12,
    flexDirection: "row"
  },
  header: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(20),
    alignSelf: 'center',
    right: '30%',
    textAlign: 'center'
  },
  bodyText: {
    color: 'white',
    fontFamily: 'Poppins-Extra-Light',
    marginTop: 5,
    //textAlign: 'center',
  },
  spotifyImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    //alignItems: "center"

  }
});
