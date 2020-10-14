import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import JournalCard from '../components/JournalCard';

export default function JournalScreen(props) {
  const user = React.useContext(AuthContext);
  const onPress = () => props.navigation.navigate("HomeScreen");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>My Journal</Text>
      {
        !!user.journal && Object.values(user.journal).length > 0 ? (
          Object.values(user.journal).map((item, key) =>
            <JournalCard entry={item} key={key}></JournalCard>)
        ) : (
          <View style={styles.textContainer}>
              <Text style={styles.text}>Nothing here yet. Add your first journal entry below!</Text>
          </View>
        )
      }
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('JournalEntry')}>
          <AntDesign name="pluscircleo" size={40} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <FontAwesome name="trash-o" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    //justifyContent: "center",
    flex: 1,
    // [TOS] This line below is throwing an error
    // vertical: true
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textContainer: {
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-extra-light',
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },

});
