import {isFunction,proxy} from './utils';
import {observe}from './observer/index.js';
export function initState(vm){ //vm.options
   const opts=vm.$options //每个Vue实例对象
   if(opts.props) initProps(vm)
   if(opts.methods) initMethods(vm)
   if(opts.data) initData(vm)
   if(opts.computed) initComputed(vm)
   if(opts.watch) initWatch(vm)


}

function initProps(vm){}
function initMethods(vm){}

function initData(vm){
  let data=vm.$options.data //数据的初始化
  //如果传入的是函数  把函数执行的返回值重新赋值给data 
  if(isFunction(data)){
    data= data.call(vm) //  data里面如果出现了this 还是只向vm当前实例 。并且注意这里：data刚开始指向vm.$options.data的引用 后来指向data函数执行的返回值，但是vm.$options.data指向一直没变
  }
  vm._data=data //没有覆盖 第二部往vm实例挂载了_data属性
  //数据劫持方案 Object.defineProperty 纯对象
  //当我去vm上去属性值，将取到的值代理到vm._data上  实现vm._data.a==vm.a  就是说 vm.a实际上取得是vm._data.a 
  //data {name:'zs',age:10}

  for(let key in vm._data){
    proxy(vm,'_data',key)
  }
  observe(data)

  

}
function initComputed(vm){}
function initWatch(vm){}