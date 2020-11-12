import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Response_Scale(props){
  // TODO: The following is a temporary solution, eventually we'll want to use an actual scale element
  let options = [];
  let scaleLow = props.scaleLow || 1;
  for (let i = scaleLow; i < props.scaleHigh + 1; i += 1) {
    options.push(i);
  }

  const onChange = (value) => {
    let flags = {};
    for (const key in props.flagChanges) {
      if (key == value) {
        flags = {...props.flagChanges[key]};
        break;
      }
    }
    props.onChange(value, flags);
  }

  return(
    <View style={styles.quizQuestion}>
      <RadioButton.Group onValueChange={value => onChange(value)} value={props.value}>
        {
          options.map((item, key) =>
            <RadioButton.Item
              label={item}
              labelStyle={{color: '#00095e'}}
              style={styles.radioButton}
              color="#00095e"
              value={item}
              key={key}
            />
          )
        }
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%'
  },
});