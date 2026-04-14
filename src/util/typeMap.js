export const valueCollectorMap = {
  option: {
    label: '默认选项',
    value: 'option',
    icon: 'option'
  },
  input: {
    label: '手动输入',
    value: 'input',
    icon: 'input'
  },
  component: {
    label: '页面组件值',
    value: 'component',
    icon: 'component'
  },
  componentProp: {
    label: '页面组件属性值',
    value: 'componentProp',
    icon: 'component-prop'
  },
  dataSource: {
    label: '数据节点返回值',
    value: 'dataSource',
    icon: 'data-source'
  },
  dataConvert: {
    label: '转换节点返回值',
    value: 'dataConvert',
    icon: 'data-convert'
  },
  urlParam: {
    label: '路由参数属性值',
    value: 'urlParam',
    icon: 'url-param'
  },
  initParam: {
    label: '宿主系统变量属性值',
    value: 'initParam',
    icon: 'init-param'
  }
}

export const commonNodeMap = {
  triggerEvent: {
    label: '触发事件',
    value: 'triggerEvent',
    logo: 'Bell'
  },
  dataSource: {
    label: '请求数据',
    value: 'dataSource',
    logo: 'DataAnalysis'
  },
  pageJump: {
    label: '页面跳转',
    value: 'pageJump',
    logo: 'Promotion'
  },
  dataConvert: {
    label: '数据转换',
    value: 'dataConvert',
    logo: 'SwitchButton'
  },
}

export const eventNodeMap = {
  pageInit: {
    label: '流程开始',
    value: 'pageInit',
    logo: 'Connection'
  }
}

export const toolMap = {
  undo: {
    name: 'undo',
    desc: '返回上一步',
    icon: 'Back'
  },
  redo: {
    name: 'redo',
    desc: '恢复下一步',
    icon: 'Right'
  },
  zoomIn: {
    name: 'zoomIn',
    desc: '画布放大',
    icon: 'ZoomIn'
  },
  zoomOut: {
    name: 'zoomOut',
    desc: '画布缩小',
    icon: 'ZoomOut'
  },
  fitView: {
    name: 'fitView',
    desc: '区域适应',
    icon: 'FullScreen'
  },
  selection: {
    name: 'selection',
    desc: '框选节点',
    icon: 'Pointer'
  },
  beautify: {
    name: 'beautify',
    desc: '美化布局',
    icon: 'MagicStick'
  },
  navigation: {
    name: 'navigation',
    desc: '全图导航',
    icon: 'Aim'
  }
}

export const defaultLogo = 'Operation'

export const requestMethodMap = [
  {
    value: 'GET',
    label: 'GET'
  },
  {
    value: 'POST',
    label: 'POST'
  }
]
