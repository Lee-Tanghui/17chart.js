import Graph from '../../core/graphs'

import { ObjectOf } from '../../types/general'
import { GRAPH_TYPES } from '../../utils/types'
import { handler as rectCoorHandler } from '../../utils/coordinate/rectCoor/handler'
import { handler } from '../../utils/option'

import { getDefaultOption } from './default'
import { merge } from './merge'

export default class Bar extends Graph {
  /**图表选项 */
  public option: ObjectOf<any>
  /**图表类型 */
  type: string

  constructor(container: string, userOption: object) {
    super(container, userOption)

    this.type = GRAPH_TYPES.BAR
    const defaultOption = getDefaultOption()
    // 柱状图自定义merge
    merge(defaultOption, userOption)
    // 直角坐标系处理
    rectCoorHandler(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)
    // 设置this.option
    this.option = defaultOption
  }
}
