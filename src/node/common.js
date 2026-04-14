import base from './base'

class CommonNodeView extends base.view {}

class CommonNodeModel extends base.model {
  getNodeName () {
    if (this.properties && this.properties.event && this.properties.event.keyDefine) {
      return this.properties.name + this.properties.event.keyDefine
    } 
    return this.properties.name
  }
  getNodeAbstract () {
    let title = '数据请求'
    const content = []
    if (this.properties && this.properties.componentName === 'triggerEvent') {
      title = '节点事件'
      if (this.properties.event && this.properties.event.keyDefine) {
        content.push({
          desc: this.properties.event.keyDefine,
          type: 'event'
        })
      }
    } else if (this.properties && this.properties.ds) {
      content.push ({
        desc: this.properties.ds.name,
        type: 'common'
      })
    } 
    return {
      title,
      content,
      showButton: true
    }
  }
  getNodeLogo () {
    return this.properties && this.properties.logo
  }
  getNodeClassName () {
    return 'common'
  }
}

export default {
  type: 'common-node',
  model: CommonNodeModel,
  view: CommonNodeView
}
