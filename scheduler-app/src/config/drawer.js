//Screens
import Home from '../screens/home-screen/home-screen'
import Details from '../screens/home-screen/details-screen'
import Schedule from '../screens/schedule-screen/schedules-screen'
import History from '../screens/history-screen/history-screen'
import Payments from '../screens/payment-screen/payments-screen'
import User from '../screens/user-screen/user-screen'

//Navigation
import { createDrawerNavigator } from 'react-navigation'

//Sidebar
import DrawerComponent from '../components/drawer-component'

export default createDrawerNavigator(
    {
        Home: { screen: Home },
        Details: { screen: Details },
        Schedules: { screen: Schedule },
        History: { screen: History },
        Payments: { screen: Payments },
        User: { screen: User }
    },
    {
        contentComponent: DrawerComponent,
        drawerWidth: 300
    }
)