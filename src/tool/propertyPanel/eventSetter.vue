<template>
  <div>
    <div class="event-panel-wrapper setter-wrap">
      <div class="event-label">触发后续行为的事件：</div>
      <el-select 
        :value="selectValue"
        clearable
        class="event-select" 
        size="small" 
        placeholder="请选择"
        @change="handleChange"
        >
        <el-option
          v-for="item in eventOptions"
          :key="item.value"
          :label="item.label"
          size="small"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { emitModelValue, getModelValue } from '../../util/modelValue'

const triggerEventOptions = [
  {
    label: 'curl触发',
    value: 'curlTrigger'
  }
]

export default {
  props: {
    lf: Object,
    context: Object,
    current: Object,
    modelValue: {
      type: Object,
      default: undefined
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    selectValue () {
      const value = getModelValue(this.$props) || {}
      return value.key
    },
    // 值选项
    eventOptions () {
      if (this.current?.properties?.componentName === 'triggerEvent') {
        return triggerEventOptions
      }
      const logic = this.current?.getLogic?.() || {}
      const events = logic.events
      const options = events && events.map(item => {
        return {
          label: item.description,
          value: item.name
        }
      }) || []
      return options
    },
  },
  methods: {
    handleChange (e) {
      const target = this.eventOptions.find(item => item.value === e) || {}
      const event = {
        keyDefine: target.label,
        key: target.value,
      }
      emitModelValue(this, event)
    }
  },
}
</script>

<style scoped lang="less">
.event-panel-wrapper {
  display: inline-flex;
  width: 100%;
}
.event-label {
  color: #333;
  line-height: 32px;
  height: 32px;
  margin-right: 8px;
}
.event-select {
  flex: 1;
}
.setter-wrap {
  background: #F3F6FA;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #303A51;
  line-height: 16px;
  font-weight: 400;
  padding: 9px 12px;
}
</style>
