// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 200
  },
  outerContainer: {
    backgroundColor: '#abd1df',
    width: Metrics.screenWidth - 80,
    height: 130,
    borderRadius: 15,
    borderColor: '#8ba1af',
    borderWidth: 1,
    elevation: 7,
    zIndex: 500,
    top: 40,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  innerContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 130,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    zIndex: 1500
  }
})
