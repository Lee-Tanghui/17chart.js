import { deepAssign } from '../../tools'
import { ObjectOf } from '../../../types/general'
import get from '../../safe-get'
import set from '../../safe-set'

/**
 * 极坐标系的统一处理函数
 */
export const handler = (
  defaultOption: ObjectOf<any>,
  userOption: ObjectOf<any>,
  chartInstance?: any,
) => {
  // 删除非echarts的options字段
  const copyUserOption = deepAssign({}, userOption)
  Reflect.deleteProperty(copyUserOption, 'data')
  Reflect.deleteProperty(copyUserOption, 'nameField')
  Reflect.deleteProperty(copyUserOption, 'valueField')

  // legend位置判断
  if (
    get(userOption, 'legend.right') &&
    (get(userOption, 'legend.orient') as unknown) === 'vertical' &&
    !get(userOption, 'legend.top') &&
    chartInstance
  ) {
    /**这种情况是用户设置了图例靠右，同时设置是vertical类型，又没有设置legend.top
     * 此时的话，需要计算top的值*/
    const LENGEND_HEIGHT = 25
    const offsetHeight = chartInstance.container.offsetHeight
    const dataLength = userOption.data.length
    const percentPerLengend =
      ((dataLength * LENGEND_HEIGHT) / offsetHeight / 2) * 100
    set(copyUserOption, 'legend.top', `${50 - percentPerLengend}%`)
  }
  console.log(copyUserOption)
  // merge数据
  deepAssign(defaultOption, copyUserOption)
}
