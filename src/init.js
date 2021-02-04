import { initState } from "./state"
import {compileToFunctions} from './compiler/index'
import {mountComponent} from './lifeCycle'
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
    
    //渲染 https://vuejs.bootcss.com/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
    //如果当前有el属性 说明要渲染模板
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }

    
    }
     
    Vue.prototype.$mount=function(el){
      //渲染的操作 默认会先找render方法， 如果没有写render方法，会查找template html模板，如果连template都没有 找当前el指定元素的内容进行渲染
      //
      const vm=this
      const options=vm.$options
      el=document.querySelector(el)
      vm.$el=el
      const render=options.render
      //如果没有render 需要将template转为render方法
      if(!render){
        let template=vm.$options.template
        //如果没有定义模板就用外部#app的outerHTml了
        if(!template && el){
          template=el.outerHTML
          //把模板字符串编译成render函数
          const render=compileToFunctions(template)
          options.render=render //最总渲染时候都用这个render方法
          
        }
      }

      //需要挂载这个组件
      mountComponent(vm,el)


     
      

    }
}

