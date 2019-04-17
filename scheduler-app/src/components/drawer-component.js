import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList } from 'react-native';

import { ListItem, Icon, Divider } from 'react-native-elements'

//Theme
import theme from '../config/theme'
import { TouchableHighlight } from 'react-native-gesture-handler';

class Drawer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [
                { label: 'Início', icon: <Icon name="shop" type="entypo" color={theme.lightFontColor} size={28} />, routeName: 'Home' },
                { label: 'Minhas agendas', icon: <Icon name="calendar" type="antdesign" color={theme.lightFontColor} size={28} />, routeName: 'Schedules' },
                { label: 'Histórico', icon: <Icon name="schedule" type="material" color={theme.lightFontColor} size={28} />, routeName: 'History' },
                { label: 'Pagamento', icon: <Icon name="dollar-sign" type="feather" color={theme.lightFontColor} size={28} />, routeName: 'Payments' }
            ]
        }

        this.renderDrawerItems = this.renderDrawerItems.bind(this)
    }

    renderDrawerItems(e) {
        e = e.item
        return (
            <TouchableHighlight onPress={() => { this.props.navigation.navigate(e.routeName) }} underlayColor={theme.lightPrimaryColor}>
                <ListItem
                    leftIcon={e.icon}
                    title={e.label}
                    titleStyle={{ color: theme.lightFontColor, fontWeight: 'bold', fontSize: 18.5 }}
                    chevronColor={theme.lightFontColor}
                    containerStyle={{ backgroundColor: theme.primaryColor, flex: 1 }}
                />
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.user}>
                        <ListItem
                            leftIcon={<Icon
                                name='user'
                                type='antdesign'
                                color={theme.lightFontColor}
                                size={40} />}
                            title="Thiago Costa"
                            titleStyle={{ color: theme.lightFontColor, fontWeight: 'bold', fontSize: 22 }}
                            subtitleStyle={{ color: theme.lightFontColor }}
                            subtitle="Detalhes"
                            chevronColor={theme.lightFontColor}
                            containerStyle={{
                                justifyContent: 'center', alignSelf: 'center',
                                backgroundColor: 'transparent', flex: 1, height: 150
                            }}
                            chevron
                            onPress={() => this.props.navigation.navigate('User')}
                        />
                    </View>
                    <Divider />
                    <View style={styles.drawerItems}>
                        <FlatList
                            data={this.state.items}
                            renderItem={this.renderDrawerItems}
                            keyExtractor={(item) => item.label}
                        />
                    </View>
                </ScrollView>
                <View >
                    <Text style={styles.instructions}>Scheduler © 2019</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primaryColor,
    },
    user: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.darkPrimaryColor
    },
    drawerItems: {
        flex: 1
    },
    instructions: {
        textAlign: 'center',
        color: theme.lightFontColor,
        marginBottom: 5,
    },
});

export default Drawer
