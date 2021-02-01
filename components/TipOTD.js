import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default class TipOTD extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
      }

    getQOTDFromApi() {
        return fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    jsonData: responseJson[0].q
                });
                console.log(responseJson[0].q);
                // return responseJson.q;
            }).catch(error => {
                console.error(error);
            });
    }

    componentDidMount(){
        this.getQOTDFromApi();
    }

    render() {
        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, padding: 20 }}>
                <Text>Loading...</Text>
              </View>
            );
          }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Quote of the Day</Text>
                <Text style={styles.bodyText}>{this.state.jsonData}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132090',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        bottom: 10,
        margin: 10
    },
    header: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        textAlign: 'center'
    },
    bodyText: {
        color: 'white',
        fontFamily: 'Poppins-Extra-Light',
        marginTop: 5,
        textAlign: 'center',
    },
});
