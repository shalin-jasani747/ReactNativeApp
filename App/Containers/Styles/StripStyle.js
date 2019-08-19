// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  stripMainView: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  stripText: {color: '#123362', fontSize: 30, fontWeight: '700'},
  stripNextMainView: {backgroundColor: '#a1a2a3', borderRadius: 15, padding: 8, justifyContent: 'center' },
  leftColumn: {flexDirection: 'row', paddingTop: 20},
  leftColumnView: {width: 25, flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'transparent', borderRadius: 5, borderWidth: 1, borderColor: '#aeafb0', marginRight: 10},
  leftBlock: {width: 23, height: 25}
})
