// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profileImageView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  nullProfileView: {backgroundColor: '#e9e6e6', borderRadius: 50, width: 100, height: 100},
  touchable: {
    position: 'absolute',
    top: 60,
    right: -10,
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {color: Colors.cyanBlue, fontSize: 15},
  changePasswordView: {
    marginTop: 10,
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5
  },
  icon: {
    backgroundColor: '#f2f4f7',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordText: {fontSize: 15, fontWeight: '700', marginLeft: 15},
  helloText: {fontSize: 20, fontWeight: '700', marginLeft: 30},
  profileDetails: {backgroundColor: '#fff', padding: 10, borderRadius: 5},
  buttonView: {flexDirection: 'row', justifyContent: 'space-between'}
})
