import * as _ from 'lodash'
import moment from 'moment'

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty

export function isEmpty (obj) {

  // null and undefined are "empty"
  if (obj == null) return true

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false
  if (obj.length === 0) return true

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }

  return true
}

const isFunction = input => typeof input === 'function'

export const renderIf = predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null

export function formatNumber (n) {
  n = Number(n)
  return n.toFixed(2).replace(/./g, function (c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c
  })
}

export function parseURL (url) {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match
  while (match = regex.exec(url)) {
    params[match[1]] = match[2]
  }
  return params
}

export function toCamel (string) {
  return string.replace(/(?:_| |\b)(\w)/g, function ($1) {
    return $1.toUpperCase().replace('_', ' ')
  })
}

export function isValueInObject (item, string, value) {
  return _.findIndex(item, function (o) { return o[string] == value }) !== -1
}

function insertString (string, value, imageName) {
  var position = (!isEmpty(imageName)) ? string.indexOf(imageName) : -1
  if (position !== -1) {
    return string.substr(0, position) + value + string.substr(position)
  }

  return string
}

export function getThumbImageURL (imageUrl) {
  let imageData = _.split(imageUrl, '/')
  return insertString(imageUrl, 'thumb/', _.last(imageData))
}

export function objectToQueryString (obj) {
  const results = []
  _.forOwn(obj, (value, key) => {
    if (Array.isArray(value)) {
      _.forOwn(value, value => {
        results.push(`${key}[]=${value}`)
      })
    } else {
      results.push(`${key}=${value}`)
    }
  })
  return results.join('&')
}
