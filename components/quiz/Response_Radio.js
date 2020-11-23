import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Response_Radio(props) {
  const onChange = (id) => {
    let flags = {};
    for (const key in props.responses) {
      if (key == id) {
        flags = { ...props.responses[key].effects };
        break;
      }
    }
    props.onChange(id, flags);
  }
  return (
    <View>
      <RadioButton.Group onValueChange={value => onChange(value)} value={String(props.value)}>
        {
          Object.values(props.responses).map((item, key) =>
            <RadioButton.Item
              label={item.text}
              labelStyle={{color: '#00095e'}}
              style={styles.radioButton}
              color="#00095e"
              value={String(key)}
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