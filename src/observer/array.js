
const oldArrayProtoMethods = Array.prototype

// 继承
// arrayMethods.forEach  =>arrMethods.__proto__.forEach 直接使用原来的。为什么不用自己的 因为自己没有forEach方法啊
export const arrayMethods = Object.create(oldArrayProtoMethods) //arrayMethods={} arrayMethods.__proto__=oldArrayProtoMethods
//只写可以改变数据本身的7个方法 其他方法都不用重写 其他直接继承concat
const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']
//大一统
//往arrayMethods空对象身上挂载7个改变数组的方法 其他方法直接继承
//为什么要这样做呢？ 劫持数组干嘛呢 -》更新视图
//method又是闭包？
methods.forEach(method => {
  //剩余参数 自动是数组
  arrayMethods[method] = function (...args) {

    //谁调用push this就是谁 this可不是vm实例
    const res = oldArrayProtoMethods[method].apply(this, args)
    const ob=this.__ob__ //ob是Observer类的实例
    let inserted
    switch (method) {
      //arr.push({a:1},{b:2})
      case 'push':
      case "unshift":
        inserted=args
        break;
      //arr.splice(0,1,{a:1}) 你是这样调用的=>rest=[0,1,{a:1}]
      case 'splice':
        inserted=args.slice(2)
        break;
    
      default:
        break;
    }
    if(inserted) ob.observeArray(inserted) //给数组新增的对象值也需要劫持
    return res
  }

})