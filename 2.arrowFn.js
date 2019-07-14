// 把箭头函数转换成普通函数

// presets是插件的集合

let babel = require('@babel/core')
let t = require('@babel/types')
let code = `let fn = (a, b) => a+b`

let arrowFunctions = {
  visitor: {
    // 匹配到箭头函数
    ArrowFunctionExpression(path) {
      // 生成一个函数表达式的树结构
      let node = path.node
      let body = node.body
      if (!t.isBlockStatement(node.body)) {
        body = t.blockStatement([t.returnStatement(node.body)])
      }
      let newNode = t.functionExpression(
        null,
        node.params,
        body
      )
      path.replaceWith(newNode)
    }
  }
}

let r = babel.transform(code, {
  plugins: [
    arrowFunctions
  ]
})

console.log(r.code)
