import ReactJson from 'react-json-view'
import { Drawer } from 'antd'

export default function ConfigPanel({ title, visible, onVisibleChange, json }) {
  const onClose = () => {
    onVisibleChange(false)
  }

  return (
    <Drawer
      title={title}
      width={800}
      placement={'right'}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <div className="config-panel_main">
        <h4>完整示例配置项</h4>
        <ReactJson
          src={json}
          name="option"
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={1}
        />
      </div>
    </Drawer>
  )
}
