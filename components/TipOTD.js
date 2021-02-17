import React, { Component } from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class TipOTD extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
      }

    getQOTDFromApi() {
        if(Platform.OS === 'ios' || Platform.OS === 'android'){
            return fetch('https://zenquotes.io/api/today')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    jsonData: responseJson[0],
                });
                console.log(responseJson[0]);
                // return responseJson.q;
            }).catch(error => {
                console.warn(error);
            });
        
        //Since QOTD doesn't work on web browser, there is no data so just set loading to false
        }else{
            this.setState({
                isLoading: false,
            });
        }
        
    }

    componentDidMount(){
        this.getQOTDFromApi();
    }

    render() {
        if (this.state.isLoading) {
            return (
            <View style={styles.container}>
                <Text style={styles.bodyText}>Loading Quote of the Day</Text>
            </View>
            );
          }

        if(Platform.OS === 'ios' || Platform.OS === 'android'){
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
        }else{
            return (
                <View style={styles.container}>
                    <Text style={styles.bodyText}>Quote of the Day incompatible with web view!</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        width: '90%',
        height:'100%',
        alignSelf: 'center',
        borderRadius: 10,
        //padding: 10,
        //bottom: 10,
        //margin: 10
        //marginTop: '10%',
        //flex:1
        shadowColor:  "#000",
    shadowOffset: {
    width: RFValue(1),
    height: RFValue(5),
  },
  shadowOpacity: 0.25,
  shadowRadius: RFValue(3.84),
  elevation: RFValue(1),
  borderRadius: RFValue(15),
    },
    header: {
        color: '#00095e',
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        textAlign: 'center',
        
       // textDecorationLine: 'underline'
    },
    bodyText: {
        color: '#00095e',
        fontFamily: 'Poppins-Medium',
        marginTop: 15,
        fontSize: RFValue(13),
        textAlign: 'center',
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
        width:'89%',
       height:'89%',
        alignSelf: 'center',
        justifyContent:'center'
        
    }

});
