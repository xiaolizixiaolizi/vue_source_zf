{
  const obj = { name: 'zs' }
  const obj1 = Object.create(obj)
  console.log(obj1);
  console.log(obj1.__proto__);
}

{
  const arr = [1, 2, 3]
  arr.push(3, 4, 5, 6, 7)
  console.log(arr);
}





{
  console.log('........................');
  /*
  Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
  */
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
}

{
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
  const obj = {
    name: 'zs',
    age: 10,
    sex: 'male'
  }
  const keys = Object.keys(obj)
  keys.forEach(key => {
    defineReactive(obj, key, obj[key])
  })


}

{
  const arr = [1, 2, 3, 4]
  const keys = Object.keys(arr)
  console.log(keys);

  function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
      get() {
        console.log(key, 'key')
        return value;
      },
      set(newValue) { 
        console.log('key setter',key);
        value = newValue }
    })
  }
  keys.forEach(key => {
    defineReactive(arr, key, arr[key])
  })
  https://jingdezhen.eshimin.com/newborn-onething-manager/a/login
  
  console.log(arr[0])
  arr[2]=100

}

{
  const obj={}
  Object.defineProperty(obj,'__ob__',{
    enumerable:true,
    
    value:277
  })
  // console.log(obj.__ob__);
  for(let key in obj){
    console.log(key,obj[key]);
  }
  delete obj.__ob__
  console.log(obj.__ob__)
}

{
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

{
  const arr=['push', 'pop', 'unshift', 'shift', 'reverse','sort', 'splice']
  const obj={}
  for(let i=0;i<arr.length;i++){
    obj[arr[i]]=function(){
      console.log(i,arr[i])
    }

  }
  console.log(obj);
  obj.push()
  obj.pop()
}

{
  const arr=['push', 'pop', 'unshift', 'shift']

  const obj=Object.create(Array.prototype) //obj.__proto__==Array.prototype
  arr.__proto__=obj //arr.__proto__=obj  arr.__proto__.__proto__=Array.prototype  本来是arr.__proto__==Array.prototype 自己再中间拦截了一次
  arr.forEach((method,index)=>{
    obj[method]=function(){
      console.log(method,index);
    }
  })
  console.log('00000000000000000000000');
  arr.push()
  arr.unshift()
  arr.reverse()

}