const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{}}

//语法层次的转移
export function generate(ast) {
  let children = getChildren(ast);
  console.log("🚀 ~ file: generate.js ~ line 4 ~ generate ~ ast", ast)
  let code = `_c('${ast.tag}',${ast.attrs.length ? `${genProps(ast.attrs)}` : 'undefined'
    }${children ? `,${children}` : ''})`
  console.log('code', code);
  return code


}

//attrs属性处理
function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':')
        obj[key] = value

      })
      attr.value = obj

    }
    str += `${attr.name}:${ JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}` //去掉最后一个,

}

function getChildren(ast) {
  const children = ast.children
  if (children) {//将所有转化后的儿子用逗号拼接起来
    return children.map(child => gen(child)).join(',')

  }
}

//
function gen(node) {
  //元素节点
  if (node.type === 1) {
    return generate(node) //生成元素节点字符串 （递归）
  }
  else {
    const text = node.text //文本也分普通文本和{{variable}}大括号文本
    //如果是普通文本 不带大括号的
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }
    let tokens = [] //
    let lastIndex = defaultTagRE.lastIndex = 0 //如果正则是全局模式 ，需要每次使用前 重置为0
    let match
    let index
    while (match = defaultTagRE.exec(text)) {
      index = match.index //保存匹配的索引
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length

    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`



    // return `_v(${text})`

  }


}