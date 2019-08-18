// @flow

import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { View, Text, TextInput, } from 'react-native-ui-lib'
import styles from './Styles/StripStyle'
import _ from 'lodash'

export default class Strip extends React.Component {

  changeStripValue(value, stripKey){
    let { strip } = this.props
    let stripObject = _.find(strip[stripKey], { value })
    if (!_.isUndefined(stripObject)){
      this.props.selectStrip(stripKey, stripObject)
    }
  }

  render () {
    let { strip } = this.props
    let stripKey = _.get(_.keys(strip), '0')
    let stringCase = (stripKey === 'pH') ? stripKey : _.startCase(stripKey)
    let stripeValue = _.isUndefined(strip.selectedStripe.value) ? '' : strip.selectedStripe.value
    let stripeColor = _.isUndefined(strip.selectedStripe.color) ? '' : strip.selectedStripe.color
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start', bottom: 5}}>
            <Text color={'#aeafb0'} style={{fontSize: 15, fontWeight: '700' }}>{ stringCase }</Text>
            <Text color={'#aeafb0'} style={{fontSize: 15 }}> (ppm)</Text>
          </View>
          <View>
            <TextInput
              style={{ borderColor: '#e8e8e8', color: '#3585b2', fontWeight: '700', width: '22%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: 0 }}
              placeholder='0'
              placeholderTextColor={'#e8e8e8'}
              autoCapitalize="none"
              keyboardType={'number-pad'}
              autoCorrect={false}
              hideUnderline
              maxLength={4}
              underlineColor='transparent'
              underlineColorAndroid='transparent'
              value={`${stripeValue}`}
              onChangeText={(value) => this.changeStripValue(parseInt(value), stripKey)}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 30}}>
          {
            _.map(strip[stripKey], (o, key) => (
              <View key={key} style={[{flex: 1, justifyContent: 'center'}, (key !== (strip[stripKey].length - 1)) ? { paddingRight: 5 } : {paddingRight: 0}]}>
                <TouchableWithoutFeedback onPress={() => this.props.selectStrip(stripKey, o)}>
                  <View style={[ (stripeColor === o.color) ? { borderColor: '#7aaa35', borderWidth: 2, borderRadius: 5, padding: 1.5 } : {}]} >
                    <View style={{backgroundColor: o.color, height: 25, borderRadius: 5 }} />
                  </View>
                </TouchableWithoutFeedback>
                <Text style={{ alignSelf: 'center', color: '#bcbdbd'}}>{o.value}</Text>
              </View>
              )
            )
          }
        </View>
      </View>
    )
  }
}

// // Prop type warnings
// Strip.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Strip.defaultProps = {
//   someSetting: false
// }
