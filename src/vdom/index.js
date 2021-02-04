export function renderMixin(Vue) {
  //_render往vue实例身上挂载 其实是从vm.$options.render取出来的 

  // vnode 用js对象来描述dom
  //_c创建虚拟元素
  Vue.prototype._c = function () { 
    return createElement(...arguments);
  }
  //_s stringify
  Vue.prototype._s = function (val) {
    return val == null ? "" : typeof val === 'object' ? JSON.stringify(val) : val
  }
  //_v 创建虚拟dom文本元素
  Vue.prototype._v = function () {
    return createTextVnode(...arguments);
   }
  Vue.prototype._render = function () {
    //this 是vm调用的
    const vm = this
    const render = vm.$options.render
    let vnode = render.call(vm)

    console.log(vnode);
    return vnode

  }

}

function createElement(tag,data={},...children){
  return vnode(tag,data,data.key,children)
  

}
function createTextVnode(text){
  return vnode(undefined,undefined,undefined,undefined,text)
}

// 虚拟节点和ast很想，但是不是同一回事 操作真实DOM浪费性能 
function vnode(tag,data,key,children,text){

  return {
    tag,
    data,
    key,
    children,
    text,
    
  }
}