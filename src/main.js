import { createApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'

import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$message = ElMessage
app.mount('#app')
