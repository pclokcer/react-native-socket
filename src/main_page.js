import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

let client = '';
let datalar = []

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View >
                <Button title="git" onPress={() => navigate('Connection', { name: 'erdem' })}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baglan: {
        "fontFamily": "Segoe UI",
        "fontSize": 15,
        "color": "rgba(112, 112, 112, 255)"
    }
});