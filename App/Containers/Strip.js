// @flow

import React from 'react'
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import StripActions from '../Redux/StripRedux'
import { Metrics } from '../Themes'
// external libs
import { View, Text } from 'react-native-ui-lib'
import StripView from '../Components/Strip'
import _ from 'lodash'

// Styles
import styles from './Styles/StripStyle'

class Strip extends React.Component {

  componentDidMount(){
    this.props.getStrip()
  }

  showSelectedValues(){
    let { strips } = this.props
    let text = ''
    _.map(strips, (strip) => {
      let stripKey = _.get(_.keys(strip), '0')
      let stringCase = (stripKey === 'pH') ? stripKey : _.startCase(stripKey)
      return (
      text += `${stringCase} : ${strip.selectedStripe.value}, `
      )
    })
    Alert.alert(
      'Selected Strip',
      `${text}`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false}
    )
  }

  render () {
    let { strips } = this.props
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View paddingH-20>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{color: '#123362', fontSize: 30, fontWeight: '700'}}>Test Strip</Text>
              <View style={{backgroundColor: '#a1a2a3', borderRadius: 15, padding: 8, justifyContent: 'center' }}>
                <TouchableWithoutFeedback onPress={() => this.showSelectedValues()}>
                  <Text color={'#fff'} style={{fontWeight: '700'}}>Next</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
              <View style={{width: 25, flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'transparent', borderRadius: 5, borderWidth: 1, borderColor: '#aeafb0', marginRight: 10}}>
                {
                  _.map(strips, (strip, key) => {
                    let stripKey = _.get(_.keys(strip), '0')
                    let defaultValue = _.get(strip[stripKey], '0')
                    let color = _.isUndefined(strip.selectedStripe.color) ? defaultValue.color : strip.selectedStripe.color
                    return (
                      <View key={key} style={{width: 23, height: 25, backgroundColor: color, marginTop: 18}} />
                    )
                  })
                }
              </View>
              <View style={{flex: 1}}>
                {
                  _.map(strips, (strip, key) => <StripView key={key} strip={strip} selectStrip={(key, object) => this.props.selectStrip(key, object)} />)
                }
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    strips: state.strip.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStrip: () => dispatch(StripActions.stripRequest()),
    selectStrip: (key, object) => dispatch(StripActions.selectStrip(key, object))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Strip)
