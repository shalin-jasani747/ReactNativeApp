// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  signUpText: {fontSize: 18, fontWeight: '700'},
  mainView: {justifyContent: 'center', alignItems: 'center', marginTop: 10},
  profilePicView: {backgroundColor: '#e9e6e6', borderRadius: 50, width: 100, height: 100},
  profilePicTouchable: {
    position: 'absolute',
    top: 60,
    right: -10,
    height: 30,
    width: 30,
    backgroundColor: '#37404d',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicIcon: {color: '#fff', fontSize: 15},
  profilePicImage: {borderRadius: 50, width: 100, height: 100},
  textInputWidth: {width: '50%'}
})
