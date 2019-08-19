// @flow

import React from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Platform
} from 'react-native'
import { View, Text, Button, Image, TextInput, Checkbox, ActionSheet } from 'react-native-ui-lib'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'
import ImagePicker from 'react-native-image-picker'
// external libs
import FeatherIcons from 'react-native-vector-icons/Feather'
import { renderIf } from '../Services/helpers'
import ValidationComponent from 'react-native-form-validator'
import _ from 'lodash'
// Styles
import styles from './Styles/SignUpStyle'

const isAndroid = (Platform.OS === 'android')

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  allowsEditing: true,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'profilePhotos',
    cameraRoll: true,
    waitUntilSaved: true
  }
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
    this.takeProfilePicture = this.takeProfilePicture.bind(this)
    this.openPhoneLibrary = this.openPhoneLibrary.bind(this)
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this)
  }

  takeProfilePicture () {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else {
        this.setState({
          profilePicture: response
        })
      }
    })
  }

  openPhoneLibrary () {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else {
        this.setState({
          profilePicture: response
        })
      }
    })
  }

  deleteProfilePicture () {
    this.setState({
      profilePicture: null
    })
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
      <ScrollView style={[styles.container, {backgroundColor: '#edf0f8'}]}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.mainContainer}>
            <View center paddingT-20>
              <Text style={styles.signUpText}>Sign Up</Text>
            </View>
            <View padding-20>
              <View style={styles.mainView}>
                {renderIf(profilePicture === null)(
                  <View style={styles.profilePicView}>
                      <TouchableHighlight style={styles.profilePicTouchable} onPress={() => this.showActionSheet()}>
                        <FeatherIcons name='camera' style={styles.profilePicIcon} />
                      </TouchableHighlight>
                  </View>
                )
                }
                {renderIf(profilePicture !== null)(
                  <View>
                    <Image source={{uri: _.get(profilePicture, 'uri')}} style={styles.profilePicImage} />
                    <TouchableHighlight style={styles.profilePicTouchable} onPress={() => this.showActionSheet()}>
                      <FeatherIcons name='camera' style={styles.profilePicIcon} />
                    </TouchableHighlight>
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
                  <View marginR-20>
                    <TextInput
                      style={[styles.textInputWidth, {paddingRight: 10}]}
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
                  <View marginR-10>
                    <TextInput
                      style={styles.textInputWidth}
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
                  <View marginR-20>
                    <TextInput
                      style={styles.textInputWidth}
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
                  <View marginR-10>
                    <TextInput
                      style={styles.textInputWidth}
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
        </KeyboardAvoidingView>
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
