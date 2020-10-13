import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import WelcomeBanner from '../components/WelcomeBanner';

export default function LikesScreen() {

  const NAME = "Favourites"

  return (
    <View style={styles.container}>
        <View style = {styles.contentContainer}>
            <ScrollView>
                  <Text style = {styles.header}>
                    My Favorites
                  </Text>
            </ScrollView>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00095e'
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  
});