import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['isUserLoggedIn'],
  loginFailure: null,
  saveUserDetails: ['user'],
  updateUserDetails: ['user'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  isUserLoggedIn: false,
  user: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  isUserLoggedIn: state => state.login.isUserLoggedIn,
  isUserSignedUp: state => state.login.user !== null
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { isUserLoggedIn } = action
  return state.merge({ fetching: false, error: null, isUserLoggedIn })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const saveDetails = (state, action) => {
  const { user } = action
  return state.merge({ fetching: false, error: null, user, isUserLoggedIn: true })
}

export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SAVE_USER_DETAILS]: saveDetails,
  [Types.UPDATE_USER_DETAILS]: saveDetails,
  [Types.LOGOUT]: logout
})
