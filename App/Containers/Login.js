// @flow

import React from 'react'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { View, Text, Button, Image, TextInput, Checkbox } from 'react-native-ui-lib'
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// external libs

// Styles
import styles from './Styles/LoginStyle'

class Login extends React.Component {

  render () {
    return (
      // <ScrollView style={styles.container}>
      //  <KeyboardAvoidingView behavior='position'>
          <View style={styles.mainContainer}>
            <View center>
              <Text>Login</Text>
            </View>
            <View center paddingV-130>
              <Image source={Images.logo} resizeMode='stretch' />
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
                onChangeText={username => this.setState({username})}
                value={''}
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
                onChangeText={username => this.setState({username})}
                value={''}
              />
              <View row style={{justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Checkbox
                    value
                    iconColor={'#8f96a5'}
                    pointerEvents="box-only"
                    onValueChange={() => {}}
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
                  onPress={() => {}}
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
    //    </KeyboardAvoidingView>
    //  </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
