import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function QuizQuestion(props){
  return(
    <View style={styles.quizQuestion}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: "#fff",
    textAlign: "center"
  }
});