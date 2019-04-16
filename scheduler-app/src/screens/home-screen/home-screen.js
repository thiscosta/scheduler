
import React from 'react';
import {
  StyleSheet, Text, View,
  Button, FlatList, ScrollView
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import moment from 'moment'

//Reducers
import { startLoadListEstablishments } from '../../reducers/home-reducer'
import { connect } from 'react-redux'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.startLoadListEstablishments()
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
            data={this.props.establishments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) =>
              <ListItem
                title={item.name}
                titleStyle={{ color: '#011019' }}
                subtitle={
                  <View style={styles.itemlist}>
                    <Text>{item.description}</Text>
                    <Text>{item.address}</Text>
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
    color: '#011019',
    marginBottom: 5,
  },
  itemlist: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const mapStateToProps = store => ({
  establishments: store.home.listEstablishments
})

const mapDispatchToProps = {
  startLoadListEstablishments
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);