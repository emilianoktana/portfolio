import { createBottomTabNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import InvestmentsScreen from '../screens/InvestmentsScreen'

export default createBottomTabNavigator(
    {
      Home: HomeScreen,
      Portfolio: InvestmentsScreen
    }
  )