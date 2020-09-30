import * as React from 'react';
import { Text, View, StyleSheet, ImagePropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default class Response_Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };

    const responses = Object.values(props.response);
    this.state.responses = responses.map(function (obj) {
      return {
        score: obj.score,
        text: obj.text,
        checked: false
      };
    });
  }

  handleChecked(score){
    const response = this.state.responses;
    const index = response.findIndex(x => x.score === score);
    response[index].checked = !response[index].checked;
    this.setState(response);
  }

  render() {
    return (
      <View style={styles.quizQuestion}>
        <Text style={styles.text}>I'm the Checkbox</Text>

        {
        this.state.responses.map((item, key) =>
              <View style={styles.checkItem}>
              <Text style={styles.checkText}>{item.text}</Text>
              <Checkbox
              key={key}
              status={item.checked ? 'checked' : 'unchecked'}
              onPress={() => {
                this.handleChecked(item.score)
              }}
            />
            </View>
              )
        }

      </View>
    );
  }

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