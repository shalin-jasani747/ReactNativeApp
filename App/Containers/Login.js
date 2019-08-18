// @flow

import React from 'react'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, AsyncStorage } from 'react-native'
import { View, Text, Button, Image, TextInput, Checkbox } from 'react-native-ui-lib'
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'
// external libs
import ValidationComponent from 'react-native-form-validator'
// Styles
import styles from './Styles/LoginStyle'

class Login extends ValidationComponent {
  constructor (props){
    super(props)
    this.validationRules = {
      email: {
        label: 'Email Address',
        email: true,
        required: true
      },
      password: {
        label: 'Password',
        required: true
      }
    }

    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      rememberMe: false
    }
  }

  async componentDidMount() {
    const email = await this.getRememberedUser()
    this.setState({
      email: email || '',
      rememberMe: !!email })
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

    this.setState({ ...errorState })
    return hasError
  }

  validateField = fieldName => {
    this.validate(this.validationRules)
    let errorState = {}
    errorState[`${fieldName}Error`] = this.getErrorsInField(fieldName)
      .slice(-1)
      .pop()
    this.setState({ ...errorState })
  }

  login(){
    const hasError = this.validateForm()
    const { email, password } = this.state
    if (!hasError){
      this.props.login({email, password})
    }
  }

  toggleRememberMe(value){
    this.setState({ rememberMe: value })
    if (value === true) {
      this.rememberUser()
    } else {
      this.forgetUser()
    }
  }

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('emailAddress', this.state.email)
    } catch (error) {
      // Error saving data
    }
  }
  getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem('emailAddress')
      if (email !== null) {
        // We have email!!
        return email
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('emailAddress')
    } catch (error) {
      // Error removing
    }
  }

  render () {
    const { email, emailError, password, passwordError, rememberMe} = this.state
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.mainContainer}>
            <View center paddingT-20>
              <Text style={{fontSize: 18, fontWeight: '700'}}>Login</Text>
            </View>
            <View center style={styles.logo}>
              <Image source={Images.logo} resizeMode='stretch'/>
            </View>
            <View padding-20>
              <TextInput
                placeholder='Email Address'
                autoCapitalize="none"
                floatingPlaceholder
                floatingPlaceholderColor={'#8f96a5'}
                autoCorrect={false}
                underlineColor={'#c6cad1'}
                underlineColorAndroid="transparent"
                onBlur={() => this.validateField('email')}
                onChangeText={email => this.setState({email})}
                error={emailError}
                value={email}
              />
              <TextInput
                placeholder='Password'
                autoCapitalize="none"
                floatingPlaceholder
                secureTextEntry
                floatingPlaceholderColor={'#8f96a5'}
                autoCorrect={false}
                underlineColor={'#c6cad1'}
                underlineColorAndroid="transparent"
                onBlur={() => this.validateField('password')}
                onChangeText={password => this.setState({password})}
                error={passwordError}
                value={password}
              />
              <View row paddingT-10 style={{justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Checkbox
                    value={rememberMe}
                    pointerEvents="box-only"
                    onValueChange={(value) => this.toggleRememberMe(value)}
                  />
                  <Text marginL-10 color={'#8f96a5'}>
                    Remember Me
                  </Text>
                </View>
                <Text color={'#8f96a5'}>Forgot Password?</Text>
              </View>
              <View paddingT-30>
                <Button
                  backgroundColor='#4d95ef'
                  borderRadius={5}
                  label='Login'
                  labelStyle={{fontWeight: '600'}}
                  onPress={() => this.login()}
                />
              </View>
              <View paddingT-20 center style={{flexDirection: 'row'}}>
                <Text color={'#8f96a5'}>Not member yet? </Text>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text color={'#000'} style={{textDecorationLine: 'underline'}}>Register Now</Text>
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
    login: (data) => dispatch(LoginActions.loginRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
