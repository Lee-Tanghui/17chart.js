import { ObjectOf } from '../types/general'
/**
 * 是否是一个二维数组(内部每个元素都应该是一个数组)
 * @param array
 * @returns Boolean
 */
export const is2Array = (array: any[]) => {
  return array.every(i => {
    return Array.isArray(i)
  })
}

/**
 * 是否是一个数组类型
 * @param value
 * @returns boolean
 */
export const isArray = (value: any): boolean => {
  return Array.isArray(value)
}

/**
 * 是否是字符类型
 * @param value
 * @returns  boolean
 */
export const isString = (value: any): boolean => {
  return typeof value === 'string'
}

/**
 * 是否是布尔类型
 * @param value
 * @returns boolean
 */
export const isBoolean = (value: any): boolean => {
  return typeof value === 'boolean'
}

/**
 * 判断是否是中文字符
 * @param str 字符
 */
export const isCN = (str: string): boolean => {
  const cnReg = new RegExp(
    '([\u4e00-\u9fff]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u3010\u3011\uffe5])+',
    'g',
  )
  return cnReg.test(str)
}

/**
 * 获取字符的长度
 * @param str 字符
 * @param fontSize 中文字符所占宽度
 */
export const getStrLength = (str: string, fontSize: number): number => {
  let cnCount = 0 // 中文字符数
  let enCount = 0 // 英文字符数

  str.split('').forEach(s => {
    isCN(s) ? cnCount++ : enCount++
  })

  return Math.ceil(cnCount * fontSize + enCount * (fontSize / 2))
}

/**
 * 字符过长时，以每10个中文字符为一行，插入新的一行
 * 最多只有2行, 超过2行的时候，第二行末尾....
 * @param value 字符
 * @returns
 */
export const insertNewlineEveryTen = (value: string) => {
  let count = 0 // 长度的累加值（中文字符1，非英文字符0.5）
  let pivotIndex10 = 0
  let pivotIndex20 = 0

  value.split('').forEach((s, i) => {
    count = isCN(s) ? count + 1 : count + 0.5

    if (count >= 10 && pivotIndex10 === 0) {
      pivotIndex10 = i
    }

    if (count >= 20 && pivotIndex20 === 0) {
      pivotIndex20 = i
    }
  })

  if (count >= 10) {
    return pivotIndex20
      ? `${value.slice(0, pivotIndex10)}\n${value.slice(
          pivotIndex10,
          pivotIndex20 - 2,
        )}...`
      : `${value.slice(0, pivotIndex10)}\n${value.slice(
          pivotIndex10,
          value.length,
        )}`
  } else {
    return value
  }
}

export const deepAssign = (objTo: ObjectOf<any>, ...objs: ObjectOf<any>[]) => {
  objs.forEach(obj => {
    obj && deepAssignSingle(objTo, obj)
  })
  return objTo
}

export const deepAssignSingle = (objTo: ObjectOf<any>, obj: ObjectOf<any>) => {
  if (obj instanceof Array) {
    objTo = []
    obj.forEach(item => {
      objTo.push(deepAssignSingle({}, item))
    })
    return
  }
  let keys = Object.keys(obj)
  keys.forEach(key => {
    if (typeof obj[key] == 'object') {
      if (obj[key] instanceof Array) {
        objTo[key] = []
        obj[key].forEach((item: any) => {
          if (Object.prototype.toString.call(item) === '[object Object]') {
            let temp = {}
            deepAssignSingle(temp, item)
            objTo[key].push(temp)
          } else {
            objTo[key].push(item)
          }
        })
      } else {
        if (typeof objTo[key] != 'object' || objTo[key] instanceof Array) {
          objTo[key] = {}
        }
        deepAssignSingle(objTo[key], obj[key])
      }
    } else {
      objTo[key] = obj[key]
    }
  })
}

/**
 * 数组去重
 */
export const getSetArray = (array: any[]) => {
  return Array.from(new Set(array))
}

/**
 * 删除属性
 */
export const deleteProperty = (object: ObjectOf<any>, prop: string) => {
  Reflect.deleteProperty(object, prop)
}
