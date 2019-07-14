// 消除没有用的代码

let code = `import _,{join} from 'lodash'`

// import join from 'lodash/join'

let babel = require('@babel/core')
let t = require('@babel/types')
let babelImport = {
  visitor: {
    ImportDeclaration(path) {
      let node = path.node;
      if (!(node.specifiers.length === 1 && t.isImportDefaultSpecifier(node.specifiers[0]))) {
        let specifiers = node.specifiers.map(specifier => {
          if (t.isImportDefaultSpecifier(specifier)) {
            return t.importDeclaration([specifier])
          } else {
            return t.importDeclaration([specifier])
          }
        })
        path.replaceWithMultiple(specifiers)
      }
    }
  }
}

babel.transform(code, {
  plugins: [
    babelImport
  ]
})

// scope-hoisting
// let r = 1+2+3
// let r = 6

// 作用域提升

// tree-shaking
// 
