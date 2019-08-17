// @flow

import React from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { View, Text, Button, Image, TextInput, Checkbox, ActionSheet } from 'react-native-ui-lib'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics, Colors } from '../Themes'
import ImagePicker from 'react-native-image-picker'
// external libs
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { renderIf, isEmpty } from '../Services/helpers'
import ViewOverflow from 'react-native-view-overflow'
import _ from 'lodash'
// Styles
import styles from './Styles/SignUpStyle'
import Images from '../Themes/Images'

const isAndroid = (Platform.OS === 'android')

const CropOptions = {
  mediaType: 'photo',
  cropping: isAndroid,
  width: 1080,
  height: 1080,
  freeStyleCropEnabled: isAndroid
}

class SignUp extends React.Component {
  hideActionSheet = () => {
    this.setState({actionSheetVisible: false})
  }
  showActionSheet = () => {
    this.setState({actionSheetVisible: true})
  }

  constructor (props) {
    super(props)
    this.state = {
      profilePicture: null,
      actionSheetVisible: false
    }
  }

  takeProfilePicture () {
    ImagePicker.launchCamera(CropOptions).then(response => {
      // this.setPictureFromPhone(response)
    })
  }

  openPhoneLibrary () {
    ImagePicker.launchImageLibrary(CropOptions).then(response => {
      // this.setPictureFromPhone(response)
    })
  }

  async setPictureFromPhone (response, type) {
    // if (response.didCancel) {
    //   console.log('User cancelled image picker')
    // }
    // else if (response.error) {
    //   console.log('ImagePicker Error: ', response.error)
    // }
    // else {
    //   const formData = new FormData()
    //
    //   let imageResponse = response
    //
    //   if (imageResponse.width > 6000) {
    //     Alert.alert(
    //       '',
    //       'This image is too large, please choose another',
    //       [
    //         {text: 'OK', onPress: () => console.log('ok')},
    //       ],
    //       {cancelable: false}
    //     )
    //     return
    //   }
    //
    //   if (!isEmpty(imageResponse)) {
    //     let uri = _.get(imageResponse, 'path')
    //     let fileName = (uri !== 'undefined') ? _.last(uri.split('/')) : `${moment()}-Image`
    //
    //     if (type == 'coverPhoto') {
    //       formData.append('cover_photo', {
    //         uri: uri,
    //         type: imageResponse.mime,
    //         name: fileName
    //       })
    //
    //       this.props.updatePicture(formData)
    //     }
    //
    //     if (type == 'profilePhoto') {
    //       formData.append('profile_photo', {
    //         uri: uri,
    //         type: imageResponse.mime,
    //         name: fileName,
    //       })
    //
    //       this.props.updatePicture(formData)
    //     }
    //   }
    // }
  }

  deleteProfilePicture () {
    // this.props.deletePicture({type: (type == 'profilePhoto') ? 1 : 2})
  }

  render () {
    let {profilePicture} = this.state
    return (
      // <ScrollView style={styles.container}>
      //   <KeyboardAvoidingView behavior='position'>
      <View style={styles.mainContainer}>
        <View center>
          <Text>Sign Up</Text>
        </View>
        <View padding-20>

          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            {renderIf(profilePicture === null)(
              <View style={{backgroundColor: '#e9e6e6', borderRadius: 50, width: 100, height: 100}}>
                <ViewOverflow>
                  <TouchableOpacity style={{
                    position: 'absolute',
                    top: 60,
                    right: -10,
                    height: 30,
                    width: 30,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} onPress={() => this.showActionSheet()}>
                    <FontAwesomeIcon name='camera' style={{color: Colors.cyanBlue, fontSize: 15}}/>
                  </TouchableOpacity>
                </ViewOverflow>
              </View>
            )
            }
            {renderIf(profilePicture !== null)(
              <View>
                <Image source={{uri: _.get(profilePicture, 'uri')}}
                       style={{borderRadius: 50, width: 100, height: 100}}/>
                <TouchableOpacity style={{
                  position: 'absolute',
                  top: 60,
                  right: -10,
                  height: 30,
                  width: 30,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} onPress={() => {}}>
                  <FontAwesomeIcon name='camera' style={{color: Colors.cyanBlue, fontSize: 15}}/>
                </TouchableOpacity>
              </View>
            )
            }
            <ActionSheet
              title="Select Profile Photo"
              cancelButtonIndex={3}
              destructiveButtonIndex={2}
              options={[
                {label: 'Take Picture', onPress: this.takeProfilePicture},
                {label: 'Open Phone Library', onPress: this.openPhoneLibrary},
                {label: 'Delete Picture', onPress: this.deleteProfilePicture},
                {label: 'Cancel', onPress: this.hideActionSheet}
              ]}
              visible={this.state.actionSheetVisible}
              useNativeIOS={!isAndroid}
              onDismiss={this.hideActionSheet}
            />
          </View>

          <View>
            <TextInput
              placeholder='First Name'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Last Name'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Email'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Phone'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Join Date'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Password'
              autoCapitalize='none'
              floatingPlaceholder
              secureTextEntry
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
            <TextInput
              placeholder='Address'
              autoCapitalize='none'
              floatingPlaceholder
              floatingPlaceholderColor={'#8f96a5'}
              autoCorrect={false}
              underlineColor={'#c6cad1'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}
              value={''}
            />
          </View>
          <View paddingT-30>
            <Button
              backgroundColor='#4d95ef'
              borderRadius={5}
              label='Sign Up'
              labelStyle={{fontWeight: '600'}}
              onPress={() => {}}
            />
          </View>
          <View paddingT-20 center style={{flexDirection: 'row'}}>
            <Text color={'#8f96a5'}>Already member? </Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
              <Text color={'#000'} style={{textDecorationLine: 'underline'}}>Login Now</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      // </KeyboardAvoidingView>
      // </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
