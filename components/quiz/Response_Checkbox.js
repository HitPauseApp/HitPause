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
    let response = this.state.responses;
    let index = response.findIndex(x => x.score === score);
    response[index].checked = !response[index].checked;
    //Another example of poor state management, should be refactored 
    this.setState(response);

    //Send the state array to the callback function to capture score 
    this.props.onScoreUpdate(this.state.responses);
  }

  render() {
    return (
      <View style={styles.quizQuestion}>

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