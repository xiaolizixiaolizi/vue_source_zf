{
  const obj={name:'zs'}
  const obj1=Object.create(obj)
  console.log(obj1);
  console.log(obj1.__proto__);
}

{
  const arr=[1,2,3]
  arr.push(3,4,5,6,7)
  console.log(arr);
}