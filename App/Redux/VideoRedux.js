import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  videoRequest: null,
  videoSuccess: ['payload'],
  videoFailure: null,
  loadMoreVideos: ['payload']
})

export const VideoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  payload: [],
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

export const loadMoreVideo = (state, { payload }) => {
  return state.merge({ fetching: false, error: null, payload: [...state.payload, ...payload] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIDEO_REQUEST]: request,
  [Types.VIDEO_SUCCESS]: success,
  [Types.VIDEO_FAILURE]: failure,
  [Types.LOAD_MORE_VIDEOS]: loadMoreVideo
})
