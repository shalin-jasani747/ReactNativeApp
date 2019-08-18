// @flow

import React from 'react'
import { ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { View } from 'react-native-ui-lib'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import VideoActions from '../Redux/VideoRedux'

import { Metrics } from '../Themes'
// external libs
import VideoCom from '../Components/Video'

// Styles
import styles from './Styles/VideoStyle'

// I18n
import I18n from 'react-native-i18n'

class Video extends React.Component {
  componentDidMount(){
    this.props.fetchVideo()
    console.log('here')
  }

  renderRow (item, id) {
    return (
      <VideoCom key={id} item={item} />
    )
  }

  render () {
    let { fetching, payload} = this.props.video
    return (
      <View>
         <FlatList
            data={payload}
            refreshing={fetching}
            onRefresh={ () => this.props.fetchVideo()}
            renderItem={({item, index}) => this.renderRow(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={(false) ? (<View style={{marginTop: 10}}>
              <ActivityIndicator />
            </View>) : null}
            onEndReachedThreshold={1}
            onEndReached={() => this.props.loadMoreVideos(payload)}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.video
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideo: () => dispatch(VideoActions.videoRequest()),
    loadMoreVideos: (payload) => dispatch(VideoActions.loadMoreVideos(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
