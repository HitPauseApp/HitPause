import React, {Component} from 'react';

import { StyleSheet, View, Text} from 'react-native';

export default class WelcomeBanner extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Welcome Back {this.props.NAME}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    bodyText:{
        marginTop: 5,
    },
});
