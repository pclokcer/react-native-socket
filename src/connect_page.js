import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

let client = '';




export default class Connection extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            //title: navigation.getParam('name')
            headerShown: false
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            server: [],
            value: '',
            ip: '192.168.1.7',
            port: '3000',
            status: false
        };
    }


    render() {
        let datalar = []
        let _this = this
        const { navigate, state } = this.props.navigation;
        const { ip, port, value } = this.state;
        function connect() {

            client = TcpSocket.createConnection({ port: port, host: ip })

            client.on('connect', function (id) {
                _this.setState({ status: true });
            })

            client.on('data', function (data) {
                //setserver([])
                datalar.push('Server: ' + String.fromCharCode.apply(null, data))
                //setserver(datalar)
                _this.setState({ server: datalar });
            });

            client.on('error', function (error) {
                _this.setState({ status: false });
                //setstatus(false)
                console.log(error);
            });

            client.on('close', function () {
                //setstatus(false)
                datalar = []
                // setserver([]);
                // setdata([])
                _this.setState({ status: false });
                _this.setState({ server: [] });
                _this.setState({ data1: [] });
                console.log('Connection closed!');
            });

        }

        function send() {
            client.write(value);
            _this.state.data1.push('Client: ' + value)
            //setdata(['Client: ' + value, ...data1])
        }
        function stop() {
            client.destroy();
        }

        return (

            <View style={
                {
                    flex: 1,
                    "alignItems": "center",
                    "backgroundColor": "#DBDCDB"
                }
            } >
                <View style={
                    {
                        "alignItems": "center",
                        "paddingTop": 13,
                        "width": 375,
                        "height": 52,
                        "backgroundColor": "rgba(151, 99, 177, 255)"
                    }
                } >
                    <Text style={
                        {
                            "fontFamily": "Segoe UI",
                            "fontSize": 20,
                            "color": "rgba(255, 255, 255, 255)"
                        }
                    } > TCP Sender  </Text>
                </View>
                <View style={
                    {
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }
                } >
                    <TextInput
                        style={{
                            height: 40,
                            "fontFamily": "Segoe UI",
                            "fontSize": 15,
                            "color": "rgba(0, 0, 0, 255)",
                            "alignItems": "flex-start",
                            "paddingTop": 12,
                            "marginTop": 14,
                            "width": 160,
                            "height": 43,
                            "borderRadius": 15,
                            "borderWidth": 1,
                            "borderColor": "rgba(112, 112, 112, 255)",
                            "backgroundColor": "rgba(255, 255, 255, 255)"
                        }}
                        onChangeText={text => this.setState({ ip: text })}
                        value={this.state.ip}
                    />

                    <TextInput
                        style={{
                            height: 40,
                            "fontFamily": "Segoe UI",
                            "fontSize": 15,
                            "color": "rgba(0, 0, 0, 255)",
                            "alignItems": "flex-start",
                            "paddingTop": 12,
                            "marginTop": 14,
                            "marginLeft": 15,
                            "width": 106,
                            "height": 43,
                            "borderRadius": 15,
                            "borderWidth": 1,
                            "borderColor": "rgba(112, 112, 112, 255)",
                            "backgroundColor": "rgba(255, 255, 255, 255)"
                        }}
                        onChangeText={text => this.setState({ port: text })}// this.setState({ port: text })}
                        value={this.state.port}
                    />

                </View>
                <TouchableOpacity onPress={this.state.status == false ? connect : stop}>
                    <View style={
                        {
                            "alignItems": "center",
                            "paddingTop": 8,
                            "marginTop": 14,
                            "width": 162,
                            "height": 40,
                            "borderRadius": 20,
                            "backgroundColor": "rgba(151, 99, 177, 255)"
                        }
                    } >
                        <Text style={
                            {
                                "fontFamily": "Segoe UI",
                                "fontSize": 16,
                                "color": "rgba(255, 255, 255, 255)"
                            }
                        } > {this.state.status == false ? 'Bağlan' : 'Bağlantıyı Kes'} </Text>
                    </View>
                </TouchableOpacity>
                <Text style={
                    {
                        "alignItems": "flex-start",
                        "fontFamily": "Segoe UI",
                        "fontSize": 16,
                        "marginTop": 13,
                        "color": "black"
                    }
                } > Server </Text>
                <SafeAreaView
                    style={
                        {
                            "alignItems": "flex-start",
                            "width": 281,
                            "height": 150,
                            "borderRadius": 5,
                            "borderWidth": 1,
                            "borderColor": "rgba(112, 112, 112, 255)",
                            "backgroundColor": "rgba(122, 122, 122, 255)"
                        }
                    }>
                    <ScrollView style={{ "width": 281 }}>
                        {
                            this.state.data1.map(function (ee) {
                                return <Text style={{ "color": "white" }}>{ee}</Text>
                            })
                        }
                    </ScrollView>
                </SafeAreaView>

                <Text style={
                    {
                        "alignItems": "flex-start",
                        "fontFamily": "Segoe UI",
                        "fontSize": 16,
                        "marginTop": 13,
                        "color": "black"
                    }
                } > Client </Text>

                <SafeAreaView
                    style={
                        {
                            "alignItems": "flex-start",
                            "width": 281,
                            "height": 150,
                            "borderRadius": 5,
                            "borderWidth": 1,
                            "borderColor": "rgba(112, 112, 112, 255)",
                            "backgroundColor": "rgba(122, 122, 122, 255)"
                        }
                    }>
                    <ScrollView style={{ "width": 281 }}>
                        {
                            _this.state.server.map(function (e1e) {
                                return <Text style={{ "color": "white" }}>{e1e}</Text>
                            })
                        }
                    </ScrollView>
                </SafeAreaView>

                <TextInput
                    style={{
                        height: 40,
                        "fontFamily": "Segoe UI",
                        "fontSize": 15,
                        "color": "rgba(0, 0, 0, 255)",
                        "alignItems": "flex-start",
                        "paddingTop": 12,
                        "marginTop": 48,
                        "width": 281,
                        "height": 43,
                        "borderRadius": 15,
                        "borderWidth": 1,
                        "borderColor": "rgba(112, 112, 112, 255)",
                        "backgroundColor": "rgba(255, 255, 255, 255)"

                    }}
                    onChangeText={text => this.setState({ value: text })}
                    value={this.state.value}
                />

                <TouchableOpacity onPress={send} disabled={this.state.status == false ? true : false} style={this.state.status == false ? { "opacity": 0.3 } : { "opacity": 1 }}>
                    <View style={
                        {
                            "alignItems": "center",
                            "paddingTop": 8,
                            "marginTop": 16,
                            "width": 162,
                            "height": 40,
                            "borderRadius": 20,
                            "borderWidth": 1,
                            "borderColor": "rgba(112, 112, 112, 255)",
                            "backgroundColor": "rgba(151, 99, 177, 255)"
                        }
                    } >
                        <Text style={
                            {
                                "fontFamily": "Segoe UI",
                                "fontSize": 16,
                                "color": "rgba(255, 255, 255, 255)"
                            }
                        } > GÖNDER </Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    baglan: {
        "fontFamily": "Segoe UI",
        "fontSize": 15,
        "color": "rgba(112, 112, 112, 255)"
    },
    senddata: {
        "fontFamily": "Segoe UI",
        "fontSize": 12,
        "color": "rgba(112, 112, 112, 255)"
    },
    head: {
        "alignItems": "flex-start",
        "paddingTop": 60,
        "flex": 1,
        "padding": 50
    }
});