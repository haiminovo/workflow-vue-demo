import { createApp, h, reactive } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'

export const createElementApp = (component, initialProps = {}) => {
  const props = reactive({ ...initialProps })
  let app = null
  let mountTarget = null

  const renderApp = () => {
    app = createApp({
      render: () => h(component, { ...props })
    })
    app.use(ElementPlus)
    app.config.globalProperties.$message = ElMessage
    app.mount(mountTarget)
  }

  return {
    mount(rootEl) {
      mountTarget = rootEl
      if (app || !mountTarget) {
        return
      }
      renderApp()
    },
    update(nextProps = {}) {
      Object.keys(props).forEach((key) => {
        delete props[key]
      })
      Object.assign(props, nextProps)
    },
    unmount() {
      if (!app) {
        return
      }
      app.unmount()
      app = null
      mountTarget = null
    }
  }
}
