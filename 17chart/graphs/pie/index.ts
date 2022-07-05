import Graph from '../../core/graphs'

import { ObjectOf } from '../../types/general'
import { GRAPH_TYPES } from '../../utils/types'
import { handler } from '../../utils/option'
import { merge } from './merge'
import { getDefaultOption } from './default'
import { handler as polarCoorHandler } from '../../utils/coordinate/polarCoor/handler'

export default class Pie extends Graph {
  /**图表选项 */
  public option: ObjectOf<any>
  /**图表类型 */
  type: string

  constructor(container: string, userOption: object) {
    super(container, userOption)

    this.type = GRAPH_TYPES.PIE
    const defaultOption = getDefaultOption()
    // 饼图自定义merge
    merge(defaultOption, userOption)
    // 极坐标系统一处理
    polarCoorHandler(defaultOption, userOption, this)
    // 统一处理
    handler(defaultOption, userOption, this)
    // 设置this.option
    this.option = defaultOption
  }
}
