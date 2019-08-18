// @flow

import React from 'react'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

// Styles
import styles from './Styles/ProfileStyle'

// I18n
import I18n from 'react-native-i18n'
import { ActionSheet, Button, Image, TextInput, View, Text } from 'react-native-ui-lib'
import { renderIf } from '../Services/helpers'
import ViewOverflow from 'react-native-view-overflow'
import Colors from '../Themes/Colors'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import LoginActions from '../Redux/LoginRedux'
import ValidationComponent from 'react-native-form-validator'

const isAndroid = (Platform.OS === 'android')

const CropOptions = {
  mediaType: 'photo',
  cropping: isAndroid,
  width: 1080,
  height: 1080,
  freeStyleCropEnabled: isAndroid
}

class Profile extends ValidationComponent {

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
  }

  componentDidMount () {
    let {user} = this.props
    if (user) {
      this.setState({
        ...user
      })
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
            <View style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
              flexDirection: 'row'
            }}>
              {renderIf(profilePicture === null)(
                <View style={{backgroundColor: '#e9e6e6', borderRadius: 50, width: 100, height: 100}}>
                  <ViewOverflow>
                    {
                      renderIf(editProfile)(
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
                      )
                    }
                  </ViewOverflow>
                </View>
              )
              }
              {renderIf(profilePicture !== null)(
                <View>
                  <Image source={{uri: _.get(profilePicture, 'uri')}}
                         style={{borderRadius: 50, width: 100, height: 100}}/>
                  {
                    renderIf(editProfile)(
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
              <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 30}}>Hello,</Text>
            </View>
            <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
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
                    editable={editProfile}
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
            <View style={{
              marginTop: 10,
              backgroundColor: '#fff',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 5,
              padding: 5
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{
                  backgroundColor: '#f2f4f7',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <EvilIcons name={'lock'} style={{fontSize: 22, color: '#76adf0'}}/>
                </View>
                <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 15}}>Changed Password</Text>
              </View>
              <Ionicons name={'ios-arrow-forward'} style={{fontSize: 20, color: '#76adf0'}}/>
            </View>
            <View paddingT-30 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
