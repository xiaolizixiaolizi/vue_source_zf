import { initState } from "./state"
export function initMixin(Vue){
  //写成一个个插件进行对原型的扩展
//初始化方法

  Vue.prototype._init=function(options) {
    const vm=this
    vm.$options=options //第一次往vm 实例身上挂载了$options属性
    //vue核心 响应式数据原理
    //数据变-》页面变
    //初始化状态（对数据进行劫持，当我改变数据时候视图应该更新） 
    //vue组件里面有很多状态 data props watch computed
    initState(vm)

    
    }
}
