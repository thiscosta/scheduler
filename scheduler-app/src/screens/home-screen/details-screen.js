import React from 'react'

import { View, BackHandler, ScrollView } from 'react-native'
import { Image, Text, Rating, ListItem, Icon, Divider } from 'react-native-elements'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'

//styles
import theme from '../../config/theme'
import HeaderComponent from '../../components/header-component'
import * as Progress from 'react-native-progress';


//Redux
import { connect } from 'react-redux'
import { successSelectEstablishment } from '../../reducers/home-reducer'

const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAB9CAYAAACLWX5dAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAALiMAAC4jAXilP3YAAAX5aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDEtMzBUMTU6MTY6MDEtMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDEtMzBUMTU6MTY6MDEtMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTMwVDE1OjE2OjAxLTAyOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVhMzZlOTFmLThlNzUtZTI0My1iMTEzLTA1YmEwOTNkMzI5MyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ0ZjJhMDVmLTFmNWMtYzE0Yy1hOWQ5LWNlY2M5M2ZlNTA4NyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmYyNWFiMTIzLTNmZjYtZGI0My1iMGMyLTgxMTM1MTI3YzBjNSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJBZG9iZSBSR0IgKDE5OTgpIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmMjVhYjEyMy0zZmY2LWRiNDMtYjBjMi04MTEzNTEyN2MwYzUiIHN0RXZ0OndoZW49IjIwMTktMDEtMzBUMTU6MTY6MDEtMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NWEzNmU5MWYtOGU3NS1lMjQzLWIxMTMtMDViYTA5M2QzMjkzIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTMwVDE1OjE2OjAxLTAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93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'

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
            <TouchableHighlight underlayColor={theme.touchActiveColor} onPress={() => {}}>
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
                    bottomDivider
                />
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ScrollView style={{ flexDirection: 'column', backgroundColor: theme.containerBackgroundColor, }}>
                <HeaderComponent title="Detalhes do estabelecimento" onPress={this.handleBackPress} />
                <View style={{ borderRadius: 10, backgroundColor: theme.lightColor, paddingVertical: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: img }} style={{ width: 200, height: 100 }} />
                    </View>
                    <View style={{
                        flex: 1, alignItems: 'center', marginTop: 5
                    }} >
                        <Text style={{
                            fontSize: 20, color: 'black', fontFamily: 'Roboto'
                        }}>{this.props.establishment ? this.props.establishment.name : ''}</Text>
                        <Text style={{ fontFamily: 'Roboto' }}>{this.props.establishment ? this.props.establishment.address : ''}</Text>
                        <Rating
                            imageSize={20}
                            startingValue={this.props.establishment ? this.props.establishment.rating : 0}
                            style={{ marginTop: 25 }}
                            readonly
                        />
                        <Text>
                            {this.props.establishment ? this.props.establishment.rating : ''} ({this.props.establishment ? this.props.establishment.ratings.length : ''})
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 3, marginTop: 20, backgroundColor: theme.lightColor, margin: 10, borderRadius: 10, paddingTop: 10 }}>
                    {this.props.ready ?
                        <View>
                            <View style={{ alignItems: 'center', paddingBottom: 20, justifyContent: 'center' }}>
                                <Text style={{
                                    fontSize: 20, color: 'black', fontFamily: 'Roboto'
                                }}>Serviços</Text>
                            </View>
                            <Divider />
                            <FlatList
                                data={this.props.establishment ? this.props.establishment.services : []}
                                renderItem={this.renderServices}
                                keyExtractor={(item) => item._id}
                            />
                        </View>
                        :
                        <View style={{ alignItems: 'center' }}>
                            <Progress.CircleSnail
                                indeterminate={true}
                                size={50}
                                color={theme.primaryColor}
                                duration={700}
                            />
                        </View>

                    }
                </View>

            </ScrollView>
        )
    }
}



const mapStateToProps = store => ({
    establishment: store.home.selectedEstablishment,
    ready: store.home.contentIsReady
})

const mapDispatchToProps = {
    successSelectEstablishment
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)    