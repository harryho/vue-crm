// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "indent": 0,
    "quotes":0,
    "space-in-parens": 0,
    // "key-spacing":0,
    "no-unused-vars": 0,
    "comma-dangle": 0,
    "semi": 0,
    "no-multi-spaces": 0,
    "brace-style": 0,
    "comma-style": 0,
    "space-before-blocks": 0,
    // customerized eslint
    "no-multiple-empty-lines": "off",
    "padded-blocks": "off",
    "block-spacing": "off",
    "object-property-newline": "off",
    "operator-linebreak":"off",
    "space-before-function-paren": "off",
    "eol-last":"off",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'comma-spacing': 1,
    // "object-curly-even-spacing": 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0

  }
}
