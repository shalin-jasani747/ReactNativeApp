// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/StripStyle'

export default class Strip extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>Strip Component</Text>
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
