import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/Login'
import SignUpScreen from '../Containers/SignUp'
import VideoScreen from '../Containers/Video'
import StripScreen from '../Containers/Strip'
import ProfileScreen from '../Containers/Profile'

import React from 'react'
import styles from './Styles/NavigationStyles'
import { Colors, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const tabviewConfigs = {
  lazy: true,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: Colors.cyanBlue,
    inactiveTintColor: Colors.charcoal,
    showLabel: true,
    showIcon: true,
    pressColor: Colors.coal,
    iconStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    indicatorStyle: {
      backgroundColor: 'transparent' //transparent bottom line for android
    }
  }
}

const AuthorizationStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gestureResponseDistance: {
        horizontal: Metrics.screenWidth
      }
    }
  }
);

const HomeTabView = createBottomTabNavigator(
  {
    Video: {
      screen: VideoScreen,
      navigationOptions: {
        tabBarLabel: 'Video',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            size={30}
            name={focused ? 'ios-home' : 'ios-home'}
            color={tintColor}
          />
        )
      }
    },
    Strip: {
      screen: StripScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Strip',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={30} name="store" color={tintColor} />
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons size={30} name="store" color={tintColor} />
        )
      })
    }
  },
  tabviewConfigs
)

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  Authorization: { screen: AuthorizationStack },
  Home: { screen: HomeTabView },
  SignUp: { screen: SignUpScreen }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SignUp',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
