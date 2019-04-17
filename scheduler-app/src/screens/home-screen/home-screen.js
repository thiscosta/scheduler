
import React from 'react';
import {
  StyleSheet, Text, View,
  Button, FlatList, ScrollView
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import moment from 'moment'

//Reducers
import { startLoadListEstablishments, successSelectEstablishment } from '../../reducers/home-reducer'
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
                onPress={() => {
                  this.props.successSelectEstablishment({ selectedEstablishment: item })
                  this.props.navigation.navigate('Details')
                }}
                leftIcon={<Icon
                  reverse
                  name='scissors'
                  type='font-awesome'
                  color='#517fa4'
                />} />
            }
          />
        </View>
      </ScrollView>
    )
  }

  static navigationOptions = {
    mode: 'none',
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
  startLoadListEstablishments,
  successSelectEstablishment
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);