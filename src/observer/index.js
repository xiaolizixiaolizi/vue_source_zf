import {pureObject,isArray} from '../utils'
import {arrayMethods}from './array'
export function observe(data) {
  //只能纯是对象我才能进行观测  data(){return { name:'zs',age:10 }} data=>{name:'zs',age:10}
  // if(!pureObject(data))return
  if(typeof data !=='object' ||data==null) return data
  if(data.__ob__) return data
  return new Observer(data)

}


class Observer {
  constructor(data) {
    //判断一个对象是否被观测过 看他有没有自定义__ob__属性 __ob__是Observer类的实例
    Object.defineProperty(data,'__ob__',{
      enumerable:false, //不可被枚举 默认值就是false
      configurable:false, //不可被删除 默认也是false
      value:this
    })
    //{a:[]} //形如这样的数据
    if(!isArray(data)) this.walk(data)
    // else this.walk(data)
    //反之就是数据了 重写数组的方法 push pop unshift shift sort reverse splice 函数劫持/切片编程
    else{
      //data是数组实例 所以这里解释了 数组中通过索引
     data.__proto__=arrayMethods //对数组进行响应式监听（setter/setter）如果数组过大很消耗性能 如果拦截数组 arr[0] 其实等价于访问obj.a 就是在访问对象属性 自然会触发getter
     //观测数组中的对象类型 ，如果对象发生变化 也需要劫持 [1,2,{name:'xx}]  {name:'xx'}也需要被劫持
     this.observeArray(data)

    }
    
  }
  //data是数组 [1,2,{name:'xx}]  形如这样 需要找出里面的对象 然后将之劫持
  observeArray(array){
    array.forEach(item=>{
      if(pureObject(item)) observe(item) //观测数组中的对象类型
      
    })

    
  }
  //使用defineProperty重新定义对象 对象劫持 对象如果嵌套 则需要递归劫持喔
  walk(data) {
     let keys=Object.keys(data)
     keys.forEach(key=>{
       defineReactive(data,key,data[key]) //对象 key value defineReactive复习一下
     })
    
  }
}
//把data={name:'zs',age:10} 变为可以被get set劫持的data对象 
function defineReactive(data,key,value){
  observe(value) //递归 只要是对象 无论嵌套多少层 都会默认去递归，层次很深就会性能差
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
  


}