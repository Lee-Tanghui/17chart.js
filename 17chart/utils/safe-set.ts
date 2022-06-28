import { ObjectOf } from '../types/general'

function set(obj: ObjectOf<any>, propsArg: string | string[], value: any) {
  var props, lastProp
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0)
  }
  if (typeof propsArg == 'string') {
    props = propsArg.split('.')
  }
  if (typeof propsArg == 'symbol') {
    props = [propsArg]
  }
  if (!Array.isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol')
  }
  lastProp = props.pop()
  if (!lastProp) {
    return false
  }
  prototypeCheck(lastProp)
  var thisProp
  while ((thisProp = props.shift())) {
    prototypeCheck(thisProp)
    if (typeof obj[thisProp] == 'undefined') {
      obj[thisProp] = {}
    }
    obj = obj[thisProp]
    if (!obj || typeof obj != 'object') {
      return false
    }
  }
  obj[lastProp] = value
  return true
}

function prototypeCheck(prop: string) {
  if (prop == '__proto__' || prop == 'constructor' || prop == 'prototype') {
    throw new Error('setting of prototype values not supported')
  }
}

export default set
