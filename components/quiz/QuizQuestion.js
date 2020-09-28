import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function QuizQuestion(){
  return(
    <View>
      <Text style={styles.text}>I'm a Quiz Question</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: "#fff"
  }
});