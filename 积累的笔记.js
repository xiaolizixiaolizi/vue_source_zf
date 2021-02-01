
{
  /*
   vue实例数据挂载过程
   options={el:'#app',data(){return {name:'zs',age:10}}}
   1首先在实例身上挂载了 vm.$options=options
   2在实例身上挂载了 vm._data={name:'zs',agee:10}
   3对{name:'zs',agee:10}进行数据劫持 ：无论多深都会对象劫持；重新赋值也会劫持变为get/set  .
   4 如果是数组 需要重写改变数组的7个方法 其他方法继续继承 push pop shift unshift sort reverse splice 
  */
}
{
  // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
  const obj = {}
  let temp
  Object.defineProperty(obj, 'a', {
    //  enumerable:true, 是否可以被枚举 默认是false  默认值是false有一个小细节  console.log(obj); obj={}  
    configurable: false, //是否可以被删除 delete obj.a  默认是不能删除的 即使使用了 delete obj.a 其实还是删除不掉 

    get() {
      console.log('getter');
      return temp
    },
    set(newValue) {
      console.log('setter');
      temp = newValue
    }

  })

  obj.a = 9
  console.log(obj.a);
  console.log(obj); //{} 是因为enumerable：false 默认值
  console.log(obj.hasOwnProperty('a')); //true
 console.log('--------------------------------------------------------------------------------');
  function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
      //本质是get set数据劫持 get setter函数其实是闭包 发现没
      get() {
        console.log('key-getter', key);
        return value;
      },
      set(newValue) {
        console.log('key-setter', newValue);
        value = newValue
      }
    })
  }
  const obj = {}
  defineReactive(obj, 'a', 1)
  console.log(obj.a); //获取值
  obj.a = 10 //设置值
  console.log(obj.a); //
}

{
//  proxy代理
  const info={_a:{name:'zs',age:10}}
  console.log(info._a.name);
  for(let key in info._a){
    proxy(info,'_a',key)
  }

  //info.name=>info._a.name 
  function proxy(obj,data,key){
    Object.defineProperty(obj,key,{
      get(){
        return obj[data][key]
      },
      set(newValue){
        obj[data][key] = newValue
      }
    })
  }
  console.log(info.name); //info.name=>info._a.name 
  console.log(info.age);
}