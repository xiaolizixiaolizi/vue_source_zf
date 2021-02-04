export function patch(oldVnode,vnode){
//oldVnode=>#app 
  //将虚拟节点 变为真实节点
  let el=createElm(vnode) //产生真实的dom
  //拿到原来的节点
  let parentElm=oldVnode.parentNode //body
  parentElm.insertBefore(el,oldVnode.nextSibling) //
  parentElm.removeChild(oldVnode)

}

  //将虚拟节点 变为真实节点
function createElm(vnode){
  let {tag,children,key,data,text}=vnode
  if(typeof tag=="string"){ //元素节点
    vnode.el=document.createElement(tag)
    //只有元素节点才有属性
    updateProperties(vnode)
    children.forEach(child=>{
      vnode.el.appendChild(createElm(child)) //递归
    })
  }else{
    //创建文本节点
    vnode.el=document.createTextNode(text)
  }
  return vnode.el
}

//放属性
function updateProperties(vnode){
  let el=vnode.el
  let newProps=vnode.data||{}
  for(let key in newProps){
    if(key==='style'){
      for(let styleName in newProps.style){
        el.style[styleName]=newProps.style[styleName]
      }
    }
    else if(key==='class'){
      el.className=el.class
    }else{
      el.setAttribute(key,newProps[key]) //这里设置标签身上自定义属性 <div a=1 b=2></div>

    }

  }
}