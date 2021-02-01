const  _toString=Object.prototype.toString
export function isFunction(data){
  return  _toString.call(data).slice(8,-1)==='Function'
}

export function isUndef(data){
  return  data==undefined
}

export function pureObject(data){
  return _toString.call(data).slice(8,-1)==='Object'
}
export function isArray(data){
  return _toString.call(data).slice(8,-1)==='Array'
}


export function proxy(vm,data,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[data][key] //vm.a==>vm._data.a
    },
    set(newValue){
      vm[data][key]=newValue //vm.a=10==>vm._data.a=10
    }
  })
}