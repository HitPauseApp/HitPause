import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default function QuizQuestion(props){
  return(
    <View>
      <Text style={styles.text}>Question {props.question.order}</Text>
      <Text style={styles.text}>{props.question.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  quizQuestion: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 100,
    height: RFValue(300),
    width: RFValue(250),
  }
});