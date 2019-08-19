// @flow

import React from 'react'
import { ScrollView, KeyboardAvoidingView, TouchableHighlight, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// external libs
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

// Styles
import styles from './Styles/ProfileStyle'

import { ActionSheet, Button, Image, TextInput, View, Text } from 'react-native-ui-lib'
import { renderIf } from '../Services/helpers'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import LoginActions from '../Redux/LoginRedux'
import ValidationComponent from 'react-native-form-validator'

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

class Profile extends ValidationComponent {
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
      addressError: '',
      editProfile: false
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
      address: {
        label: 'Address',
        required: true
      }
    }
    this.takeProfilePicture = this.takeProfilePicture.bind(this)
    this.openPhoneLibrary = this.openPhoneLibrary.bind(this)
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this)
  }

  componentDidMount () {
    let {user} = this.props
    if (user) {
      this.setState({
        ...user
      })
    }
  }

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

  manageProfile () {
    let {editProfile} = this.state

    if (!editProfile) {
      this.setState({
        editProfile: true
      })
    } else {
      const hasError = this.validateForm()
      let {profilePicture, firstName, lastName, email, phone, joinDate, password, address} = this.state
      if (!hasError) {
        this.setState({
            editProfile: false
          }, () => this.props.saveDetails({
            profilePicture,
            firstName,
            lastName,
            email,
            phone,
            joinDate,
            password,
            address
          })
        )
      }
    }
  }

  render () {
    let {profilePicture, firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, joinDate, joinDateError, password, passwordError, address, addressError, editProfile} = this.state
    let buttonText = (editProfile) ? 'Save Profile' : 'Edit Profile'
    return (
      <ScrollView style={styles.container}>
        {/*<KeyboardAvoidingView behavior='position'>*/}
        <View style={styles.mainContainer}>
          <View center paddingT-20>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Profile</Text>
          </View>
          <View padding-20>
            <View style={styles.profileImageView}>
              {renderIf(profilePicture === null)(
                <View style={styles.nullProfileView}>
                    {
                      renderIf(editProfile)(
                        <TouchableHighlight style={styles.touchable} onPress={() => this.showActionSheet()}>
                          <FontAwesomeIcon name='camera' style={styles.font} />
                        </TouchableHighlight>
                      )
                    }
                </View>
              )
              }
              {renderIf(profilePicture !== null)(
                <View>
                  <Image source={{uri: _.get(profilePicture, 'uri')}} style={{borderRadius: 50, width: 100, height: 100}}/>
                  {
                    renderIf(editProfile)(
                      <TouchableHighlight style={styles.touchable} onPress={() => this.showActionSheet()}>
                        <FontAwesomeIcon name='camera' style={styles.font} />
                      </TouchableHighlight>
                    )
                  }
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
              <Text style={styles.helloText}>Hello,</Text>
            </View>
            <View style={styles.profileDetails}>
              <View style={{flexDirection: 'row'}}>
                <View marginR-10>
                  <TextInput
                    style={{width: '50%'}}
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
                    editable={editProfile}
                  />
                </View>
                <View marginR-10>
                  <TextInput
                    style={{width: '50%'}}
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
                    editable={editProfile}
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
                editable={editProfile}
              />
              <View style={{flexDirection: 'row'}}>
                <View marginR-10>
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
                    editable={editProfile}
                  />
                </View>
                <View marginR-10>
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
                    editable={editProfile}
                  />
                </View>
              </View>
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
                editable={editProfile}
              />
            </View>
            <View style={styles.changePasswordView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.icon}>
                  <EvilIcons name={'lock'} style={{fontSize: 22, color: '#76adf0'}} />
                </View>
                <Text style={styles.passwordText}>Changed Password</Text>
              </View>
              <Ionicons name={'ios-arrow-forward'} style={{fontSize: 20, color: '#76adf0'}} />
            </View>
            <View paddingT-30 style={styles.buttonView}>
              <Button
                backgroundColor='#4d95ef'
                borderRadius={5}
                label={buttonText}
                labelStyle={{fontWeight: '600'}}
                onPress={() => this.manageProfile()}
              />
              <Button
                backgroundColor='#4d95ef'
                borderRadius={5}
                label='Logout'
                labelStyle={{fontWeight: '600'}}
                onPress={() => this.props.logOut()}
              />
            </View>
          </View>
        </View>
        {/*</KeyboardAvoidingView>*/}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDetails: (user) => dispatch(LoginActions.updateUserDetails(user)),
    logOut: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
