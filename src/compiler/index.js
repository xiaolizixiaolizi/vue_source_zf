export function compileToFunctions(template) {
  //把html模板->ast语法树->
  //ast树来描述代码的
  //数据结构：树。
  console.log("🚀 ~ file: index.js ~ line 2 ~ compileTo Functions ~ template", template)

  const ast = parseHTMl(template)

}

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // <aa-aa></aa-aa>  标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // ?:匹配不捕获 <my:xxx></my:xxx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)  //匹配标签结尾的</div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //匹配属性
const startTagClose = /^\s*(\/?)>/; //匹配标签结束的
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{}}

function start(tagName,attrs){
  console.log(tagName);
  console.log(attrs);

}
function end(){}
function chars(text){}

function parseHTMl(html) {
  // < id="app"> hello {{name}} <span>world</span>  </div>
  //只要html字符串不为空 就一直解析 因为我会截取一点 删除一点
  while(html){
    let textEnd=html.indexOf('<')
    //标签
    if(textEnd===0){
      const startTagMatch=parseStartTag();
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs);
      }
      // console.log(html);
      break

    }

  }
  //截取html内容 然后再更新html内容
  function advance(n){
    html=html.slice(n)
  }
  function parseStartTag(){
    const start=html.match(startTagOpen)
    if(start){
      const match={
        tagName:start[1],
        attrs:[],

      }
      advance(start[0].length) //删除开始标签
      // 如果直接是闭合标签 说明没有属性
      let end
      let attr
      //不是结尾标签 能匹配到属性
      while(!(end=html.match(startTagClose))&&(attr=html.match(attribute))){
        console.log(attr);
        match.attrs.push({name:attr[1],value:attr[3]||attr[4]||attr[5]})
        // console.log(match.attrs);
        advance(attr[0].length)
        

      }
      if(end){
        advance(end[0].length)
        return match
      }
    }
      
  }

}