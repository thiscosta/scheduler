import React from 'react'

import { View, Text } from 'react-native'

export default class DetailsScreen extends React.Component {
    render() {
        return (
            <View><Text>oi</Text></View>
        )
    }

    static navigationOptions = {
        title: 'Details',
    };
}