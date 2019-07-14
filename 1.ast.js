// 把源代码转换成树 esprima
// 深度优先遍历树 estraverse
// 生成树 escodegen

let estraverse = require('estraverse')
let esprima = require('esprima')
let escodegen = require('escodegen')

let code = `
function code () {}
`

// 解析
let ast = esprima.parseScript(code)
// 遍历
estraverse.traverse(ast, {
  enter (node) {
    console.log('enter' + node.type)
    if (node.type === 'enterIdentifier') {
      node.name = 'hello'
    }
  },
  leave (node) {
    console.log('enter' + node.type)
  }
})
// 生成
let newCode = escodegen.generate(ast)
