// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    paddingVertical: Metrics.screenHeight / 6
  },
  loginText: {
    fontSize: 18,
    fontWeight: '700'
  }
})
