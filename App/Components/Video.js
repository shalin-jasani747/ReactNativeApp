// @flow

import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Image } from 'react-native-ui-lib'
import styles from './Styles/VideoStyle'
import Share from 'react-native-share'

export default class Video extends React.Component {

  socialShare(thumbnailUrl){
    Share.open({
      title: 'Share via',
      message: 'Awesome Video',
      url: `${thumbnailUrl}`,
      social: Share.Social.EMAIL
    })
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err) })
  }

  render () {
    let { title, video_url, thumbnail_url } = this.props.item
    return (
      <View style={styles.videoContainer}>
        <View style={styles.outerContainer} >
          <Text style={styles.videoTitle}>{title}</Text>
        </View>
        <View style={styles.innerContainer} >
          <TouchableWithoutFeedback onPress={() => this.socialShare(thumbnail_url)}>
            <Image source={{uri: thumbnail_url}} style={styles.videoImage} resizeMode='cover' />
          </TouchableWithoutFeedback>
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
