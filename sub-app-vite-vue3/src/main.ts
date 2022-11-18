import { createApp, App as AppInstance } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory, Router, RouterHistory} from 'vue-router'
import routes from './router'

declare global {
  interface Window {
    eventCenterForAppNameVite: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}

// 与基座进行数据交互
function handleMicroData(router: Router) {
  // eventCenterForAppNameVite 是基座添加到window的数据通信对象
  if (window.eventCenterForAppNameVite) {
    // 主动获取基座下发的数据
    console.log('child-vite getData:', window.eventCenterForAppNameVite.getData())
    console.log(window.eventCenterForAppNameVite)
    // 监听基座下发的数据变化
    window.eventCenterForAppNameVite.addDataListener((data: Record<string, unknown>) => {
      console.log('child-vite addDataListener:', data)
      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '')
        // 当基座下发path时进行跳转
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path as string)
        }
      }
    })
    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForAppNameVite.dispatch({myname: 'sub-app-vite-vue3'})
    }, 3000)
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

console.log('微应用child-vite渲染了')

handleMicroData(router)

// 监听卸载操作
window.addEventListener('unmount', function () {
  app.unmount()
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  console.log('微应用child-vite卸载了')
})
