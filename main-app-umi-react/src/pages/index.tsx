import React, {useState} from 'react'
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import microApp, {EventCenterForMicroApp} from '@micro-zoe/micro-app'
import config from '@/config/micro-app'

// @ts-ignore 因为vite子应用关闭了沙箱，需要为子应用创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppNameVite = new EventCenterForMicroApp('sub-app-vite-vue3')

export default function HomePage() {
  const [microAppData, changeMicroAppData] = useState({msg: '来自基座的数据'})
  const [status, setStatus] = useState(false)

  function handleCreate() {
    console.log('子应用创建了')
  }

  function handleBeforeMount() {
    console.log('子应用即将被渲染')
  }

  function handleMount() {
    console.log('子应用已经渲染完成')
    setTimeout(() => {
      changeMicroAppData({msg: '来自基座的新数据'})
    }, 1000)
  }

  function handleUnmount() {
    console.log('子应用卸载了')
  }

  function handleError() {
    console.log('子应用加载出错了')
  }

  function handleDataChange(e: CustomEvent) {
    console.log('来自子应用 子应用的数据:', e.detail.data)
  }

  // 动态插入子应用的示例
  setTimeout(() => {
    if (!status) {
      setStatus(true)
      microApp.renderApp({
        name: 'sub-app-vite-vue3',
        url: `${config['vite-vue3']}/subapp/`,
        container: '#subAppContainer',
        inline: true,
        disablesandbox: true,
        data: microAppData,
        // @ts-ignore
        lifeCycles: {
          created: handleCreate,
          beforemount: handleBeforeMount,
          mounted: handleMount,
          unmount: handleUnmount,
          error: handleError
        },
        onDataChange: handleDataChange
      })
    }
  }, 500)

  return (
    <>
      <div>
        <h1>主应用 - React+Umi</h1>
      </div>
      <div id="subAppContainer">
        {
          status ? <></> : <h2>即将动态渲染子应用...</h2>
        }
        {/* 下面这个是组件化插入子应用的示例 */}
        {/*<micro-app*/}
        {/*  name="sub-app-vite-vue3"*/}
        {/*  url={`${config['vite-vue3']}/basename/`}*/}
        {/*  inline*/}
        {/*  disablesandbox*/}
        {/*  data={microAppData}*/}
        {/*  onCreated={handleCreate}*/}
        {/*  onBeforemount={handleBeforeMount}*/}
        {/*  onMounted={handleMount}*/}
        {/*  onUnmount={handleUnmount}*/}
        {/*  onError={handleError}*/}
        {/*  onDataChange={handleDataChange}*/}
        {/*></micro-app>*/}
      </div>
    </>
  );
}
