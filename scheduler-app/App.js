
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ToastAndroid, Button } from 'react-native';
import SocketIOClient from 'socket.io-client'
import OneSignal from 'react-native-onesignal'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.socket = SocketIOClient('http://192.168.0.99:3030/')

    this.entrar = this.entrar.bind(this)

    this.socket.on('newSchedule', (message) => {
      console.log('chegou a mensagem')
      ToastAndroid.show(message, ToastAndroid.SHORT);
    })
  }

  componentDidMount(){
    OneSignal.init('84af63b9-4b44-4094-9931-dbfcec94781a')
    OneSignal.addEventListener('received', this.receivedPush)
  }

  receivedPush(push){
    console.log('Recebeu a notificação: ' + push)
  }

  entrar(){
    let establishment = { id: '5cb4677456a51101743373e5' }
    console.log('vai entrar')
    try{
      this.socket.emit("join", establishment)
    }catch(e){
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button onPress={this.entrar} title="Entrar" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
