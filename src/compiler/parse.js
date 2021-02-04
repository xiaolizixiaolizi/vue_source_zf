
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // <aa-aa></aa-aa>  标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // ?:匹配不捕获 <my:xxx></my:xxx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)  //匹配标签结尾的</div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //匹配属性
const startTagClose = /^\s*(\/?)>/; //匹配标签结束的


export function parseHTMl(html) {


  function createASTElement(tagName, attrs) {
    return {
      tag: tagName, //标签名
      type: 1, //元素名
      children: [],
      attrs: attrs, //属性集合
      parent: null //父元素
    }
  }
  let root;
  let currentParent
   let stack=[]
  //栈方法判定标签是否符合合法 <div><span></span></div>

  function start(tagName, attrs) {
    let element = createASTElement(tagName, attrs)
    if(!root){
      root=element
    }
    currentParent=element //当前解析的标签 保存起来 模拟树操作
    stack.push(element) //
 
  }
  function end(tagName) { //在结尾标签地方创建父子关系
    // console.log(tagName);
    let element=stack.pop()//取出栈顶元素
    currentParent=stack[stack.length-1] 
    if(currentParent){
      element.parent=currentParent
      currentParent.children.push(element)
    }
  }
  function chars(text) {
    // console.log(text);
    text=text.replace(/\s/g,'')
    if(text){
      currentParent.children.push({ 
        type:3, //文本节点是3
        text:text
      })
    }
  }
  // < id="app"> hello {{name}} <span>world</span>  </div>
  //只要html字符串不为空 就一直解析 因为我会截取一点 删除一点
  while (html) {
    let textEnd = html.indexOf('<')
    //标签
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])//将结束标签传入
        continue;
      }
      // break

    }
    let text
    //文本
    if (textEnd > 0) {
      text = html.slice(0, textEnd)
    }
    if (text) {
      advance(text.length)
      chars(text)
      // console.log(html);
    }
    // break

  }
  //截取html内容 然后再更新html内容
  function advance(n) {
    html = html.slice(n)
  }
  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],

      }
      advance(start[0].length) //删除开始标签
      // 如果直接是闭合标签 说明没有属性
      let end
      let attr
      //不是结尾标签 能匹配到属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // console.log(attr);
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
        // console.log(match.attrs);
        advance(attr[0].length)


      }
      if (end) {
        advance(end[0].length)
        return match
      }
    }

  }

  return root

}