import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { LoginSelectors } from '../Redux/LoginRedux'
import { is } from 'ramda'
import { NavigationActions, StackActions } from 'react-navigation'

export const loggedInUser = LoginSelectors.isUserLoggedIn
export const signedUpUser = LoginSelectors.isUserSignedUp

// process STARTUP actions
export function * startup (action) {
  // if (__DEV__ && console.tron) {
  //   // straight-up string logging
  //   console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //
  //   // logging an object for better clarity
  //   console.tron.log({
  //     message: 'pass objects for better logging',
  //     someGeneratorFunction: selectAvatar
  //   })
  //
  //   // fully customized!
  //   const subObject = { a: 1, b: [1, 2, 3], c: true }
  //   subObject.circularDependency = subObject // osnap!
  //   console.tron.display({
  //     name: '🔥 IGNITE 🔥',
  //     preview: 'You should totally expand this',
  //     value: {
  //       '💃': 'Welcome to the future!',
  //       subObject,
  //       someInlineFunction: () => true,
  //       someGeneratorFunction: startup,
  //       someNormalFunction: selectAvatar
  //     }
  //   })
  // }
  let isUserLoggedIn = yield select(loggedInUser)
  let isUserSignedUp = yield select(signedUpUser)
  // only get if we don't have it yet
  // if (!is(String, avatar)) {
  //   yield put(GithubActions.userRequest('GantMan'))
  // }

  if (isUserLoggedIn || isUserSignedUp) {
    // yield put(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home' })]}));
  }
}
