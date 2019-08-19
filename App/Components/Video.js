// @flow

import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Image } from 'react-native-ui-lib'
import styles from './Styles/VideoStyle'
import Share from 'react-native-share'
import ViewOverflow from 'react-native-view-overflow'

export default class Video extends React.Component {

  socialShare(video_url){
    Share.open({
      title: 'Share via',
      message: 'Awesome Video',
      url: `${video_url}`,
      social: Share.Social.EMAIL
    })
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err) })
  }

  render () {
    let { title, video_url, thumbnail_url } = this.props.item
    console.log(this.props.item)
    return (
      <View style={styles.videoContainer}>
        <ViewOverflow>
          <View style={styles.outerContainer} >
            <Text style={styles.videoTitle}>{title}</Text>
          </View>
        </ViewOverflow>
        <View style={styles.innerContainer} >
          <TouchableWithoutFeedback onPress={() => this.socialShare(video_url)}>
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
