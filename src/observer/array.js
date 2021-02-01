
const oldArrayProtoMethods = Array.prototype

// 继承
// arrayMethods.forEach  =>arrMethods.__proto__.forEach 直接使用原来的。为什么不用自己的 因为自己没有forEach方法啊
export const arrayMethods = Object.create(oldArrayProtoMethods) //arrayMethods={} arrayMethods.__proto__=oldArrayProtoMethods
//只写可以改变数据本身的7个方法 其他方法都不用重写 其他直接继承
const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']
//大一统
methods.forEach(method => {
  arrayMethods[method] = function () {
    //谁调用push this就是谁 this可不是vm实例
    
    const res = oldArrayProtoMethods[method].apply(this, arguments)
    return res
  }

})