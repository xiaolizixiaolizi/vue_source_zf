import {pureObject,isArray} from '../utils'
import {arrayMethods}from './array'
export function observe(data) {
  //只能纯是对象我才能进行观测  ata(){return { name:'zs',age:10 }} data=>{name:'zs',age:10}
  // if(!pureObject(data))return
  if(typeof data !=='object' ||data==null) return
  return new Observer(data)

}


class Observer {
  constructor(data) {
    //{a:[]} //形如这样的数据
    if(!isArray(data)) this.walk(data)
    // else this.walk(data)
    //反之就是数据了 重写数组的方法 push pop unshift shift sort reverse splice 函数劫持/切片编程
    else{
      //data是数组实例
     data.__proto__=arrayMethods

    }
    
  }
  //使用defineProperty重新定义对象 对象劫持 对象如果嵌套 则需要递归劫持喔
  walk(data) {
     let keys=Object.keys(data)
     keys.forEach(key=>{
       defineReactive(data,key,data[key]) //对象 key value defineReactive复习一下
     })
    
  }
}

function defineReactive(data,key,value){
  Object.defineProperty(data,key,{
    get(){
      console.log('用户获取值');
      return value
    },
    //data.key='zs'
    set(newValue){
      console.log('用户设置值');
      if(newValue===value)return
      observe(newValue) //赋值操作 如果重新赋值也应该是响应式的
      value=newValue
    }
  })
  observe(value) //递归 只要是对象 无论嵌套多少层 都会默认去递归，层次很深就会性能差


}