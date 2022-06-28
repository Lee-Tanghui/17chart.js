/**
 * 验证是否合法
 * @param data option.data的数据
 * @returns
 */
export const checkIsValidData = (data: any) => {
  if (Array.isArray(data)) {
    return true
  } else {
    return false
  }
}
