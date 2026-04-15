// const { PolylineEdge, PolylineEdgeModel, h} = window;

import { PolylineEdge, PolylineEdgeModel, h } from '@logicflow/core'
import logicLineNode from './logicLineNode.vue'
import { pointFilter, createOrthogonalRoute } from '../util/edge'
import { NODE_HEIGHT, LINE_OFFSET, NODE_WIDTH } from '../util/constant'
import { createElementApp } from '../util/vueMount'

const DISTANCE = 12
const ICON_HEIGHT = 16
const ICON_WIDTH = 16
const WORD_HEIGHT = 16
class LogicPolyline extends PolylineEdge {
  constructor(props) {
    super(props)
    this.root = document.createElement('div')
    this.vm = createElementApp(logicLineNode)
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
  getText() {
    // 几种情况的处理：1.一个节点连出多条边 2.一个节点的入口连入多条边 3.线的回连
    const { graphModel } = this.props
    const { pointsList, text, sourceNodeId, targetNodeId } = this.props.model
    if (!pointsList || pointsList.length === 0) return null
    let width = 0
    let height = 0
    let direction = ''
    const positionData = {}
    const targetInlines = graphModel.getNodeIncomingEdge(targetNodeId)
    // 如果后一个节点入口有多条线
    if (targetInlines.length && targetInlines.length > 1) { 
      let lastPoint = {}, lastPrePoint = {}
      if (pointsList.length >= 4) {
        lastPoint = pointsList[pointsList.length - 2]
        lastPrePoint = pointsList[pointsList.length - 3]
      } else {
        lastPoint = {
          x: pointsList[0].x + LINE_OFFSET,
          y: pointsList[0].y
        }
        lastPrePoint = pointsList[0]
      }
      width = Math.abs(lastPoint.x - lastPrePoint.x)
      height = Math.abs(lastPoint.y - lastPrePoint.y)
      direction = ''
      positionData.x = (lastPoint.x + lastPrePoint.x)/2 - ICON_HEIGHT / 2
      positionData.y = (lastPoint.y + lastPrePoint.y)/2 - ICON_HEIGHT / 2
    } else {
      const lastPoint = pointsList[pointsList.length - 1]
      const lastPrePoint = pointsList[pointsList.length - 2]
      width = Math.abs(lastPoint.x - lastPrePoint.x)
      height = Math.abs(lastPoint.y - lastPrePoint.y)
      direction = ''
      if (lastPoint.x < lastPrePoint.x) {
        direction = 'row'
        positionData.x = lastPoint.x + DISTANCE
        positionData.y = lastPoint.y - ICON_HEIGHT / 2
      } else if (lastPoint.y < lastPrePoint.y) {
        direction = 'column'
        positionData.x = lastPoint.x - ICON_WIDTH / 2
        positionData.y = lastPoint.y + DISTANCE + ICON_HEIGHT / 2
      } else if (lastPoint.y > lastPrePoint.y) {
        direction = 'column-reverse'
        positionData.x = lastPoint.x - ICON_WIDTH / 2
        positionData.y = lastPoint.y - DISTANCE - ICON_HEIGHT / 2 - WORD_HEIGHT
      } else {
        direction = 'row-reverse'
        positionData.x = lastPoint.x - DISTANCE - width
        positionData.y = lastPoint.y - ICON_HEIGHT / 2
      }
    }

    const { model } = this.props
    const id = model.id
    setTimeout(() => {
      const wrapper = document.querySelector('#' + 'line_' + id)
      const addContainer = wrapper && wrapper.querySelector('.add-wrapper')
      if (!addContainer) {
        return
      }
      if (!addContainer.contains(this.root)) {
        addContainer.innerHTML = ''
        addContainer.appendChild(this.root)
      }
      this.vm.update({
        model: this.props.model,
        graphModel: this.props.graphModel,
        properties: this.props.model.getProperties(),
        isSelected: this.props.model.isSelected,
        isHovered: this.props.model.isHovered
      })
      this.vm.mount(this.root)
    }, 0)
    return h(
      'foreignObject',
      { ...positionData, id: 'line_' + id, style: `z-index: 20; width: ${width ? width : height}px` },
      [
        h(
          'div',
          {
            style: `display:flex;width: 100%;flex-direction: ${direction};`
          },
          [
            h('div', {
              className: 'add-wrapper'
            })
          ]
        )
      ]
    )
  }
}

class LogicPolylineModel extends PolylineEdgeModel {
  normalizeAnchoredPoints(pointsList = []) {
    const normalized = []
    const appendPoint = (point) => {
      if (!point) return
      const lastPoint = normalized[normalized.length - 1]
      if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) return
      normalized.push({
        x: point.x,
        y: point.y
      })
    }

    appendPoint(this.startPoint)
    pointsList.forEach((point) => appendPoint(point))
    appendPoint(this.endPoint)

    return pointFilter(normalized)
  }

  initEdgeData(data) {
    super.initEdgeData(data)
    this.offset = LINE_OFFSET
  }
  setAttributes() {
    this.offset = LINE_OFFSET
    if (this.properties.executeStatus === 'executed') {
      this.setZIndex()
    } else {
      this.setZIndex(0)
    }
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    style.stroke = '#8790A0'
    style.strokeDasharray = '3 2'
    style.strokeWidth = 1
    if (this.isHovered || this.isSelected) {
      style.stroke = '#33DD89'
    }
    return style
  }
  getEdgeAnimationStyle() {
    const style = super.getEdgeAnimationStyle()
    style.animationDuration = '20s'
    const { executeStatus } = this.properties
    if (executeStatus) {
      style.strokeDasharray = '8 3'
      style.stroke = executeStatus === 'executed' ? 'rgb(79 235 151 / 80%)' : 'red'
      if (executeStatus === 'execute-failed') {
        style.strokeDasharray = null
      }
    } else {
      style.strokeDasharray = '8 3'
      style.stroke = '#33DD89'
    }
    return style
  }
  setHovered(flag) {
    super.setHovered(flag)
    this.setZIndex(flag ? 999 : 0)
  }
  setSelected(flag) {
    super.setSelected(flag)
    this.setZIndex(flag ? 999 : 0)
  }
  setZIndex(index) {
    if (this.isHovered || this.isSelected || this.properties.executeStatus) {
      super.setZIndex(999)
      this.openEdgeAnimation()
    } else {
      this.closeEdgeAnimation()
      super.setZIndex(index)
    }
  }
  initPoints() {
    if (this.pointsList && this.pointsList.length > 0) {
      this.pointsList = this.normalizeAnchoredPoints(this.pointsList)
      this.points = this.pointsList.map((point) => `${point.x},${point.y}`).join(' ')
      return
    }
    const { startPoint, endPoint } = this
    const { x: x1, y: y1 } = startPoint
    const { x: x2, y: y2 } = endPoint
    const sourceNode = this.graphModel.getNodeModelById(this.sourceNodeId)
    const targetNode = this.graphModel.getNodeModelById(this.targetNodeId)
    this.pointsList = createOrthogonalRoute({
      startPoint,
      endPoint,
      sourceNode,
      targetNode,
      offset: this.offset,
      fallbackHeight: NODE_HEIGHT
    })
    this.points = this.pointsList.map((point) => `${point.x},${point.y}`).join(' ')
  }
}

export default {
  type: 'logic-line',
  model: LogicPolylineModel,
  view: LogicPolyline
}
