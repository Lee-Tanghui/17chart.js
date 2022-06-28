import { ObjectOf } from '../types/general'

const isNullOrUndef = function(val: any) {
  return val === undefined || val === null
}
const sget = function(instance: ObjectOf<any>, path: string) {
  return path.split('.').reduce(function(p, c) {
    return !isNullOrUndef(p) ? getValue(p, c) : undefined
  }, instance)
}
const findArrayOperator = /([^\[]*)\[([0-9]*)\]/

function getValue(parent: ObjectOf<any>, childProperty: string) {
  const matches = findArrayOperator.exec(childProperty)
  if (matches) {
    const name = matches[1]
    const arrayIndex = matches[2]
    if (!isNullOrUndef(parent[name])) {
      return parent[name][arrayIndex]
    } else {
      return undefined
    }
  } else {
    return parent[childProperty]
  }
}
export default sget
