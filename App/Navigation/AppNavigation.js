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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

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
          <Entypo
            size={30}
            name={'video'}
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
          <MaterialCommunityIcons size={30} name="test-tube" color={tintColor} />
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <AntDesign size={30} name="profile" color={tintColor} />
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
  initialRouteName: 'Authorization',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
