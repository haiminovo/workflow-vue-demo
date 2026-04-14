
import { HtmlNode, HtmlNodeModel, h } from '@logicflow/core'
import { NODE_WIDTH, NODE_HEIGHT } from '../util/constant'
import baseNode from './baseNode.vue'
import { createElementApp } from '../util/vueMount'

const NEXT_X_DISTANCE = 200
const NEXT_Y_DISTANCE = 100

class BaseNodeView extends HtmlNode {
  constructor(props) {
    super(props)
    this.root = document.createElement('div')
    this.vm = createElementApp(baseNode)
  }
  shouldUpdate() {
    const data = {
      ...this.props.model.properties,
      isSelected: this.props.model.isSelected,
      isHovered: this.props.model.isHovered
    }
    if (this.preProperties && this.preProperties === JSON.stringify(data)) return
    this.preProperties = JSON.stringify(data)
    return true
  }
  setHtml(rootEl) {
    if (!rootEl.contains(this.root)) {
      rootEl.innerHTML = ''
      rootEl.appendChild(this.root)
    }
    rootEl.style.width = `${this.props.model.width}px`
    rootEl.style.height = `${this.props.model.height}px`
    this.root.style.width = '100%'
    this.root.style.height = '100%'
    this.root.style.display = 'block'
    this.vm.update({
      model: this.props.model,
      graphModel: this.props.graphModel,
      disabled: this.props.graphModel.editConfigModel.isSilentMode,
      isSelected: this.props.model.isSelected,
      isHovered: this.props.model.isHovered,
      properties: this.props.model.getProperties()
    })
    this.vm.mount(this.root)
  }
  getAnchorShape(anchorData) {
    const { x, y, type } = anchorData
    return h('rect', {
      x: x - 3,
      y: y - 3,
      width: 6,
      height: 6,
      className: `custom-anchor ${type === 'incomming' ? 'incomming-anchor' : 'outgoing-anchor'}`
    })
  }
}

class BaseNodeModel extends HtmlNodeModel {
  setAttributes() {
    this.width = NODE_WIDTH
    this.height = NODE_HEIGHT + 13 * 2
    this.setZIndex(1000)
    this.text.editable = false
    this.sourceRules.push({
      message: '只允许从右边的锚点连出',
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return sourceAnchor.type === 'outgoing' && targetAnchor.type === 'incomming'
      }
    })
    this.targetRules.push({
      message: '只允许连到左边的锚点',
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return sourceAnchor.type === 'outgoing' && targetAnchor.type === 'incomming'
      }
    })
  }
  setHeight(val) {
    this.height = val
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle()
    style.stroke = 'none'
    style.hover.stroke = 'none'
    return style
  }
  getDefaultAnchor() {
    const { id, x, y, width, height } = this
    const anchors = []
    anchors.push({
      x: x - width / 2,
      y,
      id: `${id}_incomming`,
      edgeAddable: false,
      type: 'incomming'
    })
    anchors.push({
      x: x + width / 2,
      y,
      id: `${id}_outgoing`,
      type: 'outgoing'
    })
    return anchors
  }
  addNode(node, nextY = 0) {
    const nodeModel = this.graphModel.getNodeModelById(node.sourceId)
    const leftTopX = node.x + NEXT_X_DISTANCE - 50 - 10
    const leftTopY = node.y + nextY - 40 - 8
    const rightBottomX = node.x + NEXT_X_DISTANCE + 50 + 10
    const rightBottomY = node.y + nextY + 40 + 8
    const existElements = this.graphModel.getAreaElement(
      this.getHtmlPoint([leftTopX, leftTopY]),
      this.getHtmlPoint([rightBottomX, rightBottomY])
    )
    if (existElements.length) {
      this.addNode(node, nextY + NEXT_Y_DISTANCE)
      return
    }
    const newNode = this.graphModel.addNode({
      type: node.type,
      x: node.x + NEXT_X_DISTANCE,
      y: node.y + nextY,
      properties: node.properties
    })
    this.graphModel.addEdge({
      sourceNodeId: node.sourceId,
      targetNodeId: newNode.id,
      sourceAnchorId: `${node.sourceId}_outgoing`,
      targetAnchorId: `${newNode.id}_incomming`,
      startPoint: {
        x: node.x + nodeModel.width / 2,
        y: node.y
      },
      endPoint: {
        x: newNode.x - newNode.width / 2,
        y: newNode.y
      }
    })
    this.graphModel.selectElementById(newNode.id)
    this.graphModel.showContextMenu(newNode)
  }
}

export default {
  type: 'base-node',
  model: BaseNodeModel,
  view: BaseNodeView
}
