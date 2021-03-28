import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import h from '../../globals';
import * as Linking from 'expo-linking';
import { RFValue } from 'react-native-responsive-fontsize';

export default function SpotifyButton(props) {

  const handlePress = () => {
    Linking.openURL(props.playlist.webLink);
  }

  return (
    <View style={{ marginTop: 16 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
      >
        <View style={{ paddingLeft: 16 }}>
          <Image
            style={styles.spotifyImage}
            source={{ uri: `${props.playlist.image}` }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{props.playlist.title}</Text>
          <Text style={styles.bodyText}>Created by: {props.playlist.author}{'\n'}Tap to open in Spotify</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: h.colors.primary,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row"
  },
  header: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(11),
  },
  bodyText: {
    color: 'white',
    fontFamily: 'Poppins-Extra-Light',
    fontSize: RFValue(9),
  },
  spotifyImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20
  }
});
