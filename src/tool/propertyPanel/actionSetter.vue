<template>
  <div class="action-panel-wrapper">
    <action-item
      v-for="(item, index) in actions"
      :title="`行为${index+1}`"
      :key="index"
      :value="item"
      :context="context"
      :current="current"
      :lf="lf"
      @change="handleActionChange($event, index)"
      @delete="handleActionDelete(index)"
      class="action-item"
    ></action-item>
    <el-link 
      type="primary" 
      :underline="false"
      class="add-button"
      @click="addAction"
    >
      <span class="action-add-icon">+</span>
      添加行为
    </el-link>
  </div>
</template>

<script>
import actionItem from './actionItem.vue'
import { emitModelValue, getModelValue } from '../../util/modelValue'
export default {
  props: {
    lf: Object,
    context: Object,
    current: Object,
    modelValue: [String, Number, Boolean, Object, Array],
    value: [String, Number, Boolean, Object, Array]
  },
  data () {
    return {
      propName: '',
      actions: [],
    }
  },
  watch: {
    modelValue: {
      deep: true,
      immediate: true,
      handler() {
        const nv = getModelValue(this.$props)
        if (nv && nv.length) {
          this.actions = nv
        } else {
          this.actions = [
            {
              key: '',
              keyDefine: '',
              keyType: '',
              valueDefine: '',
              value: {},
            }
          ]
        }
      }
    },
    value: {
      deep: true,
      immediate: true,
      handler (nv) {
        if (this.modelValue !== undefined) return
        if (nv && nv.length) {
          this.actions = nv
        } else {
          this.actions = [
            {
              key: '',
              keyDefine: '',
              keyType: '',
              valueDefine: '',
              value: {},
            }
          ]
        }
      }
    }
  },
  methods: {
    handleActionChange(e, index) {
      this.actions[index] = e
      emitModelValue(this, this.actions)
    },
    handleActionDelete(index) {
      this.actions.splice(index, 1)
      emitModelValue(this, this.actions)
    },
    addAction() {
      if (this.actions.length >= 6) {
        this.$message.warning('一个节点最多允许添加6个响应行为！')
        return
      }
      const tempAction = {
        key: '',
        keyDefine: '',
        keyType: '',
        valueDefine: '',
        value: {},
      }
      this.actions.push(tempAction)
      emitModelValue(this, this.actions)
    }
  },
  components: {
    actionItem
  }
}
</script>

<style scoped lang="less">
.action-panel-wrapper {
  width: 100%;
}
.action-item {
  margin-bottom: 10px;
}
.action-add-icon {
  display: inline-block;
  width: 14px;
  margin-right: 4px;
  font-weight: 700;
  text-align: center;
}
</style>
