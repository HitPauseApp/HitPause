import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default class Response_Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      checked: ''
    };

    const responses = Object.values(props.response);
    this.state.responses = responses.map(function (obj) {
      return {
        score: obj.score,
        text: obj.text
      };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.response !== this.props.response) {
      let responses = Object.values(this.props.response);
      this.setState({
        responses: responses.map(function (obj) {
          return {
            score: obj.score,
            text: obj.text
          };
        })
      });
    }
  }

  handleChecked(score){
    this.setState({checked: score});
    this.props.onScoreUpdate(score);
    console.log(score);
  }

  render() {
    return (
      <View style={styles.quizQuestion}>
        <Text style={styles.text}>I'm the Radio</Text>

        {
          this.state.responses.map((item, key) =>
            <View style={styles.checkItem}>
              <Text style={styles.checkText}>{item.text}</Text>
              <RadioButton
                value={key}
                status={this.state.checked === item.score ? 'checked' : 'unchecked'}
                onPress={() => this.handleChecked(item.score)}
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
    marginTop: 10
  }
});