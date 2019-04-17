import React from 'react'

//Styles
import { Text, Platform } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import theme from '../config/theme'

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Header
                placement="left"
                containerStyle={{
                    marginTop: Platform.OS === 'ios' ? 0 : - 40, backgroundColor: theme.darkPrimaryColor,
                    justifyContent: 'space-around'
                }}
                leftComponent={<Icon name="arrowleft" type="antdesign" color={theme.lightFontColor} onPress={this.props.onPress} />}
                centerComponent={<Text style={{ color: theme.lightFontColor, fontSize: 18 }}>{this.props.title}</Text>}
            />
        )
    }
}

export default HeaderComponent