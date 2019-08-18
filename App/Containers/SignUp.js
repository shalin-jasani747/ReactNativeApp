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
import LoginActions from '../Redux/LoginRedux'
import { Metrics, Colors } from '../Themes'
import ImagePicker from 'react-native-image-picker'
// external libs
import FeatherIcons from 'react-native-vector-icons/Feather'
import { renderIf, isEmpty } from '../Services/helpers'
import ViewOverflow from 'react-native-view-overflow'
import ValidationComponent from 'react-native-form-validator'
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

class SignUp extends ValidationComponent {
  hideActionSheet = () => {
    this.setState({actionSheetVisible: false})
  }
  showActionSheet = () => {
    this.setState({actionSheetVisible: true})
  }
  validateForm = () => {
    this.validate(this.validationRules)
    let errorState = {}
    const hasError =
      Object.keys(this.validationRules).filter(fieldName => {
        const fieldError = this.isFieldInError(fieldName)

        errorState[`${fieldName}Error`] = this.getErrorsInField(fieldName)
          .slice(-1)
          .pop()
        if (fieldName === 'password') {
          return false
        }
        return fieldError
      }).length !== 0

    this.setState({...errorState})
    return hasError
  }
  validateField = fieldName => {
    this.validate(this.validationRules)
    let errorState = {}
    errorState[`${fieldName}Error`] = this.getErrorsInField(fieldName)
      .slice(-1)
      .pop()
    this.setState({...errorState})
  }

  constructor (props) {
    super(props)
    this.state = {
      profilePicture: null,
      actionSheetVisible: false,
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      phone: '',
      phoneError: '',
      joinDate: '',
      joinDateError: '',
      password: '',
      passwordError: '',
      address: '',
      addressError: ''
    }

    this.validationRules = {
      firstName: {
        label: 'First Name',
        required: true
      },
      lastName: {
        label: 'Last Name',
        required: true
      },
      email: {
        label: 'Email Address',
        email: true,
        required: true
      },
      phone: {
        label: 'Phone',
        required: true
      },
      joinDate: {
        label: 'Join Date',
        required: true
      },
      password: {
        label: 'Password',
        required: true
      },
      address: {
        label: 'Address',
        required: true
      }
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

  SignUp () {
    const hasError = this.validateForm()
    let {profilePicture, firstName, lastName, email, phone, joinDate, password, address} = this.state
    if (!hasError) {
      this.props.saveDetails({profilePicture, firstName, lastName, email, phone, joinDate, password, address})
    }
  }

  render () {
    let {profilePicture, firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, joinDate, joinDateError, password, passwordError, address, addressError} = this.state
    return (
      <ScrollView style={styles.container}>
        {/*<KeyboardAvoidingView behavior='position'>*/}
        <View style={styles.mainContainer}>
          <View center paddingT-20>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Sign Up</Text>
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
                      backgroundColor: '#37404d',
                      borderRadius: 15,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} onPress={() => this.showActionSheet()}>
                      <FeatherIcons name='camera' style={{color: '#fff', fontSize: 15}}/>
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
                    backgroundColor: '#37404d',
                    borderRadius: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} onPress={() => {}}>
                    <FeatherIcons name='camera' style={{color: '#fff', fontSize: 15}}/>
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
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
                  <TextInput
                    style={{width: '50%', paddingRight: 10}}
                    placeholder='First Name'
                    autoCapitalize='none'
                    floatingPlaceholder
                    floatingPlaceholderColor={'#8f96a5'}
                    autoCorrect={false}
                    underlineColor={'#c6cad1'}
                    underlineColorAndroid='transparent'
                    onChangeText={firstName => this.setState({firstName})}
                    onBlur={() => this.validateField('firstName')}
                    error={firstNameError}
                    value={firstName}
                  />
                </View>
                <View>
                  <TextInput
                    style={{width: '50%', left: 10}}
                    placeholder='Last Name'
                    autoCapitalize='none'
                    floatingPlaceholder
                    floatingPlaceholderColor={'#8f96a5'}
                    autoCorrect={false}
                    underlineColor={'#c6cad1'}
                    underlineColorAndroid='transparent'
                    onChangeText={lastName => this.setState({lastName})}
                    onBlur={() => this.validateField('lastName')}
                    error={lastNameError}
                    value={lastName}
                  />
                </View>
              </View>
              <TextInput
                placeholder='Email'
                autoCapitalize='none'
                floatingPlaceholder
                floatingPlaceholderColor={'#8f96a5'}
                autoCorrect={false}
                underlineColor={'#c6cad1'}
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({email})}
                onBlur={() => this.validateField('email')}
                error={emailError}
                value={email}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
                  <TextInput
                    style={{width: '50%'}}
                    placeholder='Phone'
                    autoCapitalize='none'
                    floatingPlaceholder
                    floatingPlaceholderColor={'#8f96a5'}
                    autoCorrect={false}
                    underlineColor={'#c6cad1'}
                    underlineColorAndroid='transparent'
                    onChangeText={phone => this.setState({phone})}
                    onBlur={() => this.validateField('phone')}
                    error={phoneError}
                    value={phone}
                  />
                </View>
                <View>
                  <TextInput
                    style={{width: '50%'}}
                    placeholder='Join Date'
                    autoCapitalize='none'
                    floatingPlaceholder
                    floatingPlaceholderColor={'#8f96a5'}
                    autoCorrect={false}
                    underlineColor={'#c6cad1'}
                    underlineColorAndroid='transparent'
                    onChangeText={joinDate => this.setState({joinDate})}
                    onBlur={() => this.validateField('joinDate')}
                    error={joinDateError}
                    value={joinDate}
                  />
                </View>
              </View>
              <TextInput
                placeholder='Password'
                autoCapitalize='none'
                floatingPlaceholder
                secureTextEntry
                floatingPlaceholderColor={'#8f96a5'}
                autoCorrect={false}
                underlineColor={'#c6cad1'}
                underlineColorAndroid='transparent'
                onChangeText={password => this.setState({password})}
                onBlur={() => this.validateField('password')}
                error={passwordError}
                value={password}
              />
              <TextInput
                placeholder='Address'
                autoCapitalize='none'
                floatingPlaceholder
                floatingPlaceholderColor={'#8f96a5'}
                autoCorrect={false}
                underlineColor={'#c6cad1'}
                underlineColorAndroid='transparent'
                onChangeText={address => this.setState({address})}
                onBlur={() => this.validateField('address')}
                error={addressError}
                value={address}
              />
            </View>
            <View paddingT-30>
              <Button
                backgroundColor='#4d95ef'
                borderRadius={5}
                label='Sign Up'
                labelStyle={{fontWeight: '600'}}
                onPress={() => this.SignUp()}
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
        {/*</KeyboardAvoidingView>*/}
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDetails: (user) => dispatch(LoginActions.saveUserDetails(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
