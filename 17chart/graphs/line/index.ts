import Graph from '../../core/graphs'

import { ObjectOf } from '../../types/general'
import { GRAPH_TYPES } from '../../utils/types'
import { handler as rectCoorHandler } from '../../utils/coordinate/rectCoor/handler'
import { handler } from '../../utils/option'

import { getDefaultOption } from './default'
import { merge } from './merge'

export default class Line extends Graph {
  /**图表选项 */
  public option: ObjectOf<any>
  /**图表类型 */
  type: string

  constructor(container: string, userOption: object) {
    super(container, userOption)

    this.type = GRAPH_TYPES.LINE
    const defaultOption = getDefaultOption()
    // 折线图自定义merge
    merge(defaultOption, userOption)
    // 直角坐标系处理
    rectCoorHandler(defaultOption, userOption)
    // 统一处理
    handler(defaultOption, userOption)

    this.option = defaultOption
  }
}
