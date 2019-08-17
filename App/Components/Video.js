// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/VideoStyle'

export default class Video extends React.Component {

  render () {
    return (
      <View style={styles.videoContainer}>
        <View style={styles.outerContainer} >
          <Text style={{ marginBottom: 10, fontSize: 18}}>{this.props.item.title}</Text>
        </View>
        <View style={styles.innerContainer} >
        </View>
      </View>
    )
  }
}

// // Prop type warnings
// Video.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Video.defaultProps = {
//   someSetting: false
// }
