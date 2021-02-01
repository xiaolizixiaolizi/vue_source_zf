import {initMixin} from './init'
function Vue(options) {
  this._init(options)


}
// Vue.prototype._init// 把Vue看作成一个对象
initMixin(Vue)

export default Vue
