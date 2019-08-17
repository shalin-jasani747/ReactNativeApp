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
      <ScrollView style={styles.container}>
        <View center>
          {(fetching) ? (
            <View marginT-20>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              ref='list'
              data={payload}
              renderItem={({item, index}) => this.renderRow(item, index)}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={(false) ? (<View style={{marginTop: 10}}>
                <ActivityIndicator />
              </View>) : null}
              onEndReachedThreshold={1}
              onEndReached={() => {
                if (false) {
                  // this.submit(true)
                }
              }}
            />)
          }
        </View>
      </ScrollView>
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
    fetchVideo: () => dispatch(VideoActions.videoRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
