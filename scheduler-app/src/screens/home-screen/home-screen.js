
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, ToastAndroid,
  Button, FlatList, ScrollView
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import SocketIOClient from 'socket.io-client'
import OneSignal from 'react-native-onesignal'
import axios from 'axios'
import moment from 'moment'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.searchSchedules = this.searchSchedules.bind(this)

    this.state = {
      scheduleList: []
    }
  }

  componentDidMount(){
    this.searchSchedules()
  }

  async searchSchedules() {
    const response = await axios.get('http://192.168.0.99:3030/establishments/5cb4677456a51101743373e5/schedules');
    console.log('response', response)
    await this.setState({ scheduleList: (response.data.reverse()) })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button onPress={() => {
          this.props.navigation.navigate('DetailsScreen')
        }} title="Entrar" />
        <View style={{
          flex: 1, flexDirection: 'column'
        }}>
          <FlatList
            data={this.state.scheduleList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) =>
              <ListItem
                title={`Agenda: Usuário`}
                subtitle={
                  <View>
                    <Text>{moment(item.date).format('DD/MM/YYYY - HH:mm')}</Text>
                  </View>
                }
                leftIcon={<Icon
                  reverse
                  name='ios-american-football'
                  type='ionicon'
                  color='#517fa4'
                />} />
            }
          />
        </View>
      </ScrollView>
    )
  }

  static navigationOptions = {
    title: 'Home',
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
