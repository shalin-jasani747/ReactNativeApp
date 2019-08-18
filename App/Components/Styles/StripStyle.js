// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10
  },
  stripRightUpperBlock: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  stripRightUpperBlockView: {flexDirection: 'row', alignItems: 'flex-start', bottom: 5},
  stripRightUpperBlockViewText: {fontSize: 15, fontWeight: '700' },
  rightBlockTextInput: { borderColor: '#e8e8e8', color: '#3585b2', fontWeight: '700', width: '22%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: 0 },
  stripeColorBlockView: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 30},
})
