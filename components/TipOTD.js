import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TipOTD extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    getQOTDFromApi() {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return fetch('https://zenquotes.io/api/today')
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false,
                        jsonData: responseJson[0],
                    });
                    console.log(responseJson[0]);
                    this.storeQOTD(responseJson[0].q);
                    // return responseJson.q;
                }).catch(error => {
                    console.warn(error);
                });

            //Since QOTD doesn't work on web browser, there is no data so just set loading to false
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }


    storeQOTD = async (json) => {
        try {
            await AsyncStorage.setItem('QOTD', json);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getQOTDFromApi();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={{ ...styles.bodyText, marginTop: 0, flex: 1 }}>Loading quote of the day...</Text>
                </View>
            );
        }

        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>Quote of the Day</Text>
                        <Text style={styles.bodyText}>"{this.state.jsonData.q}"</Text>
                        <Text style={styles.bodyText}>- {this.state.jsonData.a}</Text>
                    </View>

                    {/* <Text style={styles.attributionText}>Inspirational quotes provided by{"\n"}
                        <a href="https://zenquotes.io/" style={{color: 'white'}} target="_blank">ZenQuotes API</a>
                    </Text> */}
                </View>
            );

            //Since QOTD doesn't work on web browser, there is no data so just display this text
        } else {
            return (
                <View style={styles.container}>
                    <Text style={{ ...styles.bodyText, marginTop: 0, flex: 1 }}>Quote of the Day incompatible with web view!</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        borderRadius: RFValue(15),
        padding: 10,
        //backgroundColor: '#F2FCFD'
    },
    header: {
        color: '#00095e',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(17),
        textAlign: 'center',
    },
    bodyText: {
        color: '#00095e',
        fontFamily: 'Poppins-Medium',
        marginTop: 10,
        fontSize: RFValue(12),
        textAlign: 'center',
        alignSelf: 'center'
    },
    attributionText: {
        color: '#00095e',
        fontFamily: 'Poppins-Extra-Light',
        marginTop: 5,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 25
    },
    textContainer: {
        alignSelf: 'center',
        justifyContent: 'center'

    }

});
