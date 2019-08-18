import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  stripRequest: null,
  stripSuccess: ['payload'],
  stripFailure: null,
  selectStrip: ['key', 'object']
})

export const StripTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const selectStrip = (state, action) => {
  const { key, object } = action
  let index = _.findIndex(state.payload, key)
  let newPayload =  _.values({
    ...state.payload,
    [index]: {
      ...state.payload[index],
      selectedStripe: object
    }
  })
  return state.merge({ fetching: false, error: null, payload: newPayload })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STRIP_REQUEST]: request,
  [Types.STRIP_SUCCESS]: success,
  [Types.STRIP_FAILURE]: failure,
  [Types.SELECT_STRIP]: selectStrip
})
