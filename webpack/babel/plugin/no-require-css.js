module.exports = function ({ types: babelTypes }) {
  console.log('no-require-css 执行');
  return {
    name: 'no-require-css',
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (/\.(le|c)ss$/.test(importFile)) {
          path.remove();
        }
      },
    },
  };
};
