import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Response_Radio(props){
  return(
    <View style={styles.quizQuestion}>
      <Text style={styles.text}>I'm the Radio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: "#fff",
    textAlign: "center"
  }
});