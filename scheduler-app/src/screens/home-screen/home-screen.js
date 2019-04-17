
import React from 'react'
import {
  StyleSheet, Text, View, FlatList, ScrollView, Platform
} from 'react-native'
import { ListItem, Icon, Header, Divider } from 'react-native-elements'
import moment from 'moment'
import theme from '../../config/theme'

//Reducers
import { startLoadListEstablishments, successSelectEstablishment } from '../../reducers/home-reducer'
import { connect } from 'react-redux'
import { TouchableHighlight } from 'react-native-gesture-handler'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.getAddress = this.getAddress.bind(this)
    this.renderEstablishment = this.renderEstablishment.bind(this)

    this.state = {
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    this.props.startLoadListEstablishments()
    this.getAddress()
  }

  getAddress() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('entrou no fullfiled da promise')
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
      async (error) => {
        console.log('entrou no rejected da promise', error)

      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 },
    )

  }

  renderEstablishment(item) {
    item = item.item
    return (
      <TouchableHighlight underlayColor={theme.touchActiveColor} onPress={() => {
        this.props.successSelectEstablishment({ selectedEstablishment: item })
        this.props.navigation.navigate('Details')
      }}>
        <ListItem
          title={item.name}
          titleStyle={{ color: theme.darkFontColor }}
          subtitle={
            <View style={styles.itemlist}>
              <Text>{item.description}</Text>
              <Text>{item.address}</Text>
            </View>
          }

          leftIcon={<Icon
            reverse
            name='scissors'
            type='font-awesome'
            color={theme.primaryColor}
          />} />
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={{
          height: 70, backgroundColor: theme.primaryColor, flex: 1, justifyContent: 'space-between', flexDirection: 'row',
          alignItems: 'center', paddingVertical: 20
        }}>
          <Icon name="user" type="feather" color='transparent' reverse size={20} />
          <View style={{ flexDirection: 'column', marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="location-pin" type="entypo" color="white" />
            <Text style={{ fontSize: 14, color: theme.lightFontColor }}>Rua Luiza Lopes Garcia, 529</Text>
          </View>
        </View>

        <Divider />
        <View style={{ flex: 3, marginTop: 20, backgroundColor: theme.lightColor, marginTop: 10,  paddingTop: 10 }}>
          <View style={{ alignItems: 'flex-start', paddingBottom: 20, justifyContent: 'center' }}>
            <Text style={{
              fontSize: 18, color: 'black', fontFamily: 'Roboto', marginLeft: 10, fontWeight: '400'
            }}>Estabelecimentos</Text>
          </View>
          <Divider />
          <FlatList
            data={this.props.establishments}
            keyExtractor={(item) => item._id}
            renderItem={this.renderEstablishment}
          />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.containerBackgroundColor,
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