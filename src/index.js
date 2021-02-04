import {initMixin} from './init'
import {lifecycleMinxin} from './lifeCycle'
import {renderMixin} from './vdom/index'
function Vue(options) {
  this._init(options)

}
// Vue.prototype._init// 把Vue看作成一个对象
initMixin(Vue) //初始化数据
lifecycleMinxin(Vue) //注入声明周期 说白了就是渲染
renderMixin(Vue)  


export default Vue
/*
vue的渲染流程-》初始化数据-》将模板进行编译-》render函数-》生成虚拟节点-》生成真实的dom渲染到dom上
*/