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