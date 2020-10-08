import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default class Response_Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: []
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

  render() {
    return (
      <View style={styles.quizQuestion}>
        <RadioButton.Group onValueChange={value => this.props.onChange(value)} value={this.props.value}>
          {
            // TODO: Use RadioButton.Item
            this.state.responses.map((item, key) =>
              <View style={styles.checkItem} key={key}>
                <RadioButton
                  value={item.score}
                  status={this.props.value === item.score ? 'checked' : 'unchecked'}
                />
                <Text style={styles.checkText}>{item.text}</Text>
              </View>
            )
          }
        </RadioButton.Group>
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