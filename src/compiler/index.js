import {parseHTMl} from './parse'
import {generate} from './generate'
export function compileToFunctions(template) {
  //把html模板->ast语法树-> render 函数
  //ast树来描述代码的
  //数据结构：树/栈 链表/队列
  console.log(template)

  const ast = parseHTMl(template)
  // console.log(ast);

  //2优化静态节点
  //3 通过这棵ast树，重新生成代码字符串

  const code=generate(ast) //语法层次的转义 code是字符串呢
 
  //将code字符串变为函数 new Function()
  //将来调用render函数可以改变this 让这个函数内部取到结果值 让{{message}} {{age}} 从this身上上取值 this不就是vm实例吗 看一下with函数
  const render=new Function(`with(this){return ${code}}`)
  return render


}
