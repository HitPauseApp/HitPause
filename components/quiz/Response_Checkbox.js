import * as React from 'react';
import { Text, View, StyleSheet, ImagePropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default class Response_Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };

    let responses = Object.values(props.response);
    //setting state this way is not good practice and I have no idea how it's actually working
    this.state.responses = responses.map(function (obj) {
      return {
        score: obj.score,
        text: obj.text,
        checked: false
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
            text: obj.text,
            checked: false
          };
        })
      });
    }
  }

  handleChecked(score) {
    let newValue = [];
    // Handle "uncheck" case
    if (Array.isArray(this.props.value) && this.props.value.indexOf(score) >= 0) {
      let i = this.props.value.indexOf(score);
      newValue = this.props.value.splice(i, 1);
    }
    // Handle "check" case
    if (Array.isArray(this.props.value)) {
      newValue = [...this.props.value, score];
    } else {
      newValue = [score];
    }

    this.props.onChange(newValue);
  }

  render() {
    return (
      <View style={styles.quizQuestion}>
        {
          this.state.responses.map((item, key) =>
            <View style={styles.checkItem} key={key}>
              <Text style={styles.checkText}>{item.text}</Text>
              <Checkbox
                key={key}
                status={Array.isArray(this.props.value) && this.props.value.indexOf(item.score) >= 0 ? 'checked' : 'unchecked'}
                onPress={() => {this.handleChecked(item.score)}}
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