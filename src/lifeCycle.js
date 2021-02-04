import {patch} from './vdom/patch'
export function lifecycleMinxin(Vue){
  Vue.prototype._update=function(vnode){
    const vm=this
    patch(vm.$el,vnode)

  }
}

export function mountComponent(vm,el){
  //先调用render方法去创建虚拟节点，然后将虚拟节点渲染到页面上
  vm._update(vm._render())

}