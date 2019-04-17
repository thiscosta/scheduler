import React from 'react'

import { View, ActivityIndicator, Dimensions, BackHandler } from 'react-native'
import { Image, Text, Rating, ListItem, Icon } from 'react-native-elements'

//styles
import theme from '../../config/theme'
import HeaderComponent from '../../components/header-component'
import { connect } from 'react-redux'

//Reducers
import { successSelectEstablishment } from '../../reducers/home-reducer'
import { FlatList } from 'react-native-gesture-handler';

const img = 'data:image/jpeg;base64,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'

class DetailsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.handleBackPress = this.handleBackPress.bind(this)
        this.renderServices = this.renderServices.bind(this)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.successSelectEstablishment({ selectedEstablishment: null })
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            this.props.successSelectEstablishment({ selectedEstablishment: null })
        })
    }

    handleBackPress() {
        this.props.navigation.goBack(null)
        this.props.successSelectEstablishment({ selectedEstablishment: null })
    }

    renderServices(item) {
        console.log('item', item)
        item = item.item
        return (
            <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontSize: 18 }}
                subtitleStyle={{}}
                subtitle={item.description}
                leftIcon={<Icon type='feather' name='scissors' color={theme.primaryColor} />}
                rightElement={
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text>
                            R${item.price}
                        </Text>
                        <Text>
                            {item.estimatedDuration}min
                        </Text>
                    </View>
                }
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <HeaderComponent title="Detalhes do estabelecimento" onPress={this.handleBackPress} />
                <View>
                    <Image source={{ uri: img }} style={{ width: Dimensions.get('screen').width, height: 200 }}
                        PlaceholderContent={<ActivityIndicator />} />
                </View>
                <View style={{
                    flex: 1, alignItems: 'center', marginTop: 30
                }} >
                    <Text style={{
                        fontSize: 20, color: 'black', fontFamily: 'Roboto'
                    }}>{this.props.establishment ? this.props.establishment.name : ''}</Text>
                    <Text style={{ fontFamily: 'Roboto' }}>{this.props.establishment ? this.props.establishment.address : ''}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={this.props.establishment ? this.props.establishment.rating : 0}
                        style={{ marginTop: 25 }}
                    />
                    <Text>
                        {this.props.establishment ? this.props.establishment.rating : ''} ({this.props.establishment ? this.props.establishment.ratings.length : ''})
                    </Text>
                </View>
                <View style={{ flex: 3, marginTop: 70, }}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{
                            fontSize: 20, color: 'black', fontFamily: 'Roboto'
                        }}>Serviços</Text>
                    </View>
                    <FlatList
                        data={this.props.establishment ? this.props.establishment.services : []}
                        renderItem={this.renderServices}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            </View>
        )
    }

    static navigationOptions = {
        headerTitle: <HeaderComponent />,
    };
}

const mapStateToProps = store => ({
    establishment: store.home.selectedEstablishment
})

const mapDispatchToProps = {
    successSelectEstablishment
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)