
import React, { Component } from 'react';
import { Platform } from 'react-native';

//OneSignal
import OneSignal from 'react-native-onesignal'

//Screens
import drawerNavigator from './src/config/drawer'
import Details from './src/screens/home-screen/details-screen'

//Navigation
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'

//Redux and saga
import { Provider } from 'react-redux'
import store from './src/config/store'

const stackNavigator = createStackNavigator({
  Drawer: {
    screen: drawerNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Details: {
    screen: Details,
  },

},{
  headerMode: 'none'
});

const Navigation = createAppContainer(stackNavigator);

export default class App extends React.Component {

  async componentDidMount() {
    OneSignal.init('84af63b9-4b44-4094-9931-dbfcec94781a')
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }

}