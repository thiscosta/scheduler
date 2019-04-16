
import React, { Component } from 'react';
import { Platform } from 'react-native';

//OneSignal
import OneSignal from 'react-native-onesignal'

//Screens
import drawerNavigator from './src/config/drawer'

import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';


// const stackNavigator = createStackNavigator({
//   DetailsScreen: {
//     screen: Details
//   },
//   Drawer: drawerNavigator
// },{
//   initialRouteName: 'Drawer'
// })

const Navigation = createAppContainer(drawerNavigator);

export default class App extends React.Component {

  async componentDidMount() {
    OneSignal.init('84af63b9-4b44-4094-9931-dbfcec94781a')
  }

  render() {
    return (
      <Navigation />
    )
  }

}