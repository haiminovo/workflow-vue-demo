<template>
  <div class="line-content" :class="isSelected && 'selected'">
    <el-popover placement="right" width="200" trigger="click" v-model:visible="popVisible"
      v-if="properties.condition && properties.condition && properties.condition.conditions && properties.condition.conditions.length">
      <div class="popover-content">
        <div class="condition-wrap">
          <div class="condition-title">我配置的条件</div>
          <div class="condition-content">
            <div class="condition-item" v-for="(item, index) in properties.condition.conditions" :key="index">
              <el-icon class="icon"><Connection /></el-icon>
              <span>{{ getConditionItem(item) }}</span>
            </div>
            <div class="condition-button" @click="goCondition">去配置</div>
          </div>
        </div>
        <div class="popover-item" @click="insertNode">
          <el-icon class="icon"><Promotion /></el-icon>
          插入节点
        </div>
      </div>
      <template #reference>
        <div class="line-icon" :class="isSelected && 'selected'" @click.stop="handleIconClick">
          <el-icon class="icon"><Connection /></el-icon>
        </div>
      </template>
    </el-popover>
    <el-popover placement="right" width="100" trigger="click" v-model:visible="popVisible" v-else>
      <div class="popover-content">
        <div class="popover-item" @click="goCondition">
          <el-icon class="icon"><CirclePlus /></el-icon>
          添加条件
        </div>
        <div class="popover-item" @click="insertNode">
          <el-icon class="icon"><Promotion /></el-icon>
          插入节点
        </div>
      </div>
      <template #reference>
        <div class="line-icon" :class="isSelected && 'selected'" v-show="showLineIcon" @click.stop="handleIconClick">
          <span class="plus-icon" aria-hidden="true"></span>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { CirclePlus, Connection, Promotion } from '@element-plus/icons-vue'

export default {
  props: {
    model: Object,
    graphModel: Object,
    isSelected: Boolean,
    isHovered: Boolean,
    properties: Object
  },
  data() {
    return {
      popVisible: false
    }
  },
  computed: {
    showLineIcon() {
      return this.isSelected || this.isHovered || this.popVisible
    }
  },
  mounted() {
    this.graphModel.eventCenter.on('blank:click', () => {
      this.hidePop()
    })
    this.graphModel.eventCenter.on('node:click', () => {
      this.hidePop()
    })
    this.graphModel.eventCenter.on('edge:click', () => {
      this.hidePop()
    })
  },
  methods: {
    getConditionItem(item) {
      return this.formatValue(item.key)
    },
    formatValue(val) {
      switch (val.type) {
        case 'component':
          return `${val.componentName}的${val.propName}`
        case 'componentProp':
          return `${val.componentName}的${val.propName}`
        case 'dataSource':
          return `数据节点${val.nodeId}返回值`
        case 'initParam':
          return `初始化参数值为: ${val.value}`
      }
    },
    hidePop() {
      this.popVisible = false
      this.popoverItemKey && this.graphModel.popover && this.graphModel.popover.hide(this.popoverItemKey)
    },
    handleIconClick(e) {
      this.iconEvent = e
      this.graphModel.eventCenter.emit(`edge:update-model`, this.model)
    },
    goCondition() {
      this.graphModel.eventCenter.emit(`edge:option-click`, this.model)
      this.popVisible = false
    },
    insertNode() {
      const { clientX, clientY, offsetX, offsetY } = this.iconEvent
      const point = this.graphModel.getPointByClient({ x: clientX - offsetX + 16, y: clientY - offsetY + 6 })
      const canvasPoint = point.canvasOverlayPosition
      const nodeData = this.model.getData()
      this.popoverItemKey = this.graphModel.popover.show({
        type: 'tip1',
        delay: 100,
        key: this.model.id,
        placement: 'right',
        trigger: 'click',
        width: 16,
        height: 16,
        x: canvasPoint.x - 6,
        y: canvasPoint.y,
        props: {
          showConnectBlock: false
        }
      })
      this.popVisible = false
    }
  },
  components: {
    CirclePlus,
    Connection,
    Promotion
  }
}
</script>

<style scoped lang="less">
.line-content {
  background: #fff;
  border-radius: 50%;
  // margin-left: 32px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #303a51;
  --node-primary-color: #2961ef;
}

.line-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid var(--node-primary-color);
  color: var(--node-primary-color);
  background: rgba(41, 97, 239, 0.08);
  font-size: 8px;

  .icon {
    font-size: 10px;
    position: relative;
    z-index: 1;
  }
}

.plus-icon {
  position: relative;
  z-index: 1;
  display: block;
  width: 8px;
  height: 8px;
}

.plus-icon::before,
.plus-icon::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  background: var(--node-primary-color);
  border-radius: 1px;
  transform: translate(-50%, -50%);
}

.plus-icon::before {
  width: 8px;
  height: 2px;
}

.plus-icon::after {
  width: 2px;
  height: 8px;
}

.popover-item {
  --node-primary-color: #2961ef;
  background: #f3f6fa;
  border-radius: 2px;
  padding: 0 4px;
  cursor: pointer;
  height: 28px;
  color: var(--node-primary-color);
  text-align: center;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    margin-right: 4px;
    font-size: 16px;
  }

  &:hover {
    background: rgba(41, 97, 239, 0.08);
  }

  &:first-child {
    margin-bottom: 4px;
  }
}

.condition-content {
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 10px;
}

.condition-title {
  line-height: 16px;
  font-weight: 500;
  padding-bottom: 4px;
  border-bottom: 1px solid #e4e7ed;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #303a51;
  line-height: 16px;
  font-weight: 500;
}

.condition-item {
  font-weight: 400;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #303a51;
  font-weight: 400;

  .icon {
    margin-right: 4px;
    font-size: 12px;
  }

  span {
    display: inline-block;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.condition-button {
  --node-primary-color: #2961ef;
  margin-top: 8px;
  line-height: 24px;
  text-align: center;
  background: #ffffff;
  border: 1px solid var(--node-primary-color);
  border-radius: 2px;
  color: var(--node-primary-color);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>
