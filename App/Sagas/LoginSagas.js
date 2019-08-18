/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to Sagas/index.js
*  - This template uses the api declared in Sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { NavigationActions, StackActions } from 'react-navigation';

export function * getLogin (api, action) {
  const { email, password } = action.data
  // make the call to the api
  let passedAuthorization = false
  if (email === 'admin@gmail.com' && password === 'Simform.123'){
    passedAuthorization = true
    yield put(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home' })]}));
  }

  // success?
  if (passedAuthorization) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(passedAuthorization))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * signUpUser (api, action) {
  yield put(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home' })]}));
}

export function * logout (api, action) {
  yield put(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Authorization' })]}));
}
