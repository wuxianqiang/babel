let code = `
class Person {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}
`

let t = require('@babel/types')
let babel = require('@babel/core')

let transformClass = {
  visitor: {
    ClassDeclaration (path) {
      let node = path.node;
      let bodys = node.body.body;
      let id = node.id;
      bodys = bodys.map(body => {
        if (body.kind === 'constructor') {
          return t.functionDeclaration(
            id,
            body.params,
            body.body
          )
        } else {
          let left = t.memberExpression(id, t.identifier('prototype'))
          left = t.memberExpression(left, body.key)
          let right = t.functionExpression(null, body.params, body.body)
          return t.assignmentExpression('=', left, right)
        }
      })
      path.replaceWithMultiple(bodys)
    }
  }
}


let newCode = babel.transform(code, {
  plugins: [
    transformClass
  ]
})

console.log(newCode.code)
