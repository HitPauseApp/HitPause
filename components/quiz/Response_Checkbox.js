import * as React from 'react';
import { Text, View, StyleSheet, ImagePropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Response_Checkbox(props) {
  let handleChecked = (score) => {
    let newValue = [];
    // Handle "uncheck" case
    if (Array.isArray(props.value) && props.value.indexOf(score) >= 0) {
      let i = props.value.indexOf(score);
      newValue = props.value.splice(i, 1);
    }
    // Handle "check" case
    if (Array.isArray(props.value)) {
      newValue = [...props.value, score];
    } else {
      newValue = [score];
    }

    props.onChange(newValue);
  }

  return (
    <View style={styles.quizQuestion}>
      {
        Object.values(props.responses).map((item, key) =>
          <View style={styles.checkItem} key={key}>
            <Text style={styles.checkText}>{item.text}</Text>
            <Checkbox
              key={key}
              status={Array.isArray(props.value) && props.value.indexOf(item.score) >= 0 ? 'checked' : 'unchecked'}
              onPress={() => {handleChecked(item.score)}}
            />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#48484A",
    textAlign: "center"
  },
  checkItem: {
    flexDirection: "row",
    alignSelf: "center"
  },
  checkText: {
    marginTop: 10,
  }
});