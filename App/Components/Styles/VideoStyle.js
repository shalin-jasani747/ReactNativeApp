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
    width: Metrics.screenWidth - 60,
    height: 130,
    borderRadius: 15,
    borderColor: '#8ba1af',
    borderWidth: 1,
    elevation: 7,
    zIndex: 500,
    top: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
    left: 30
  },
  innerContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: Metrics.screenWidth - 60,
    top: 0,
    left: 30,
    right: 30,
    height: 130,
    borderRadius: 15,
    zIndex: 1500
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  videoImage:{
    flex: 1,
    width: Metrics.screenWidth - 120,
    height: 130,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1
  },
  videoTitle: { marginBottom: 10, fontSize: 18}
})
