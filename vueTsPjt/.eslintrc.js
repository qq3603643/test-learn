module.exports = {
  /* ESLint will stop looking in parent folders once it finds a configuration with "root": true */
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'flowtype-errors'
  ],
  globals: {
    $: false
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  /*
   * custom rules
   *
   * "off"   or 0 - turn the rule off
   * "warn"  or 1 - turn the rule on as a warning (doesn’t affect exit code)
   * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
   */
  rules: {
    // don't require .vue extension when importing
    'import/extensions': 0,
    // allow optional dependencies
    'import/no-extraneous-dependencies': 0,
    /* to configure a rule which is defined within a plugin you have to prefix the rule id with the plugin name and a '/' */
    'import/no-unresolved': 0,
    'import/imports-first': 0,
    'import/prefer-default-export': 0,
    'import/no-dynamic-require': 0,
    /* allow debug during development */
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'linebreak-style': [0, 'unix'],
    'max-len': 0,
    'dot-notation': 0,
    'new-cap': 0,
    'global-require': 0,
    'no-unused-vars': 0,
    /* assignment to property of function parameter */
    'no-param-reassign': 0,
    /* unexpected console statement */
    'no-console': 0,
    /* do not nest ternary expressions */
    'no-nested-ternary': 0,
    /* unary operator '--' used */
    'no-plusplus': 0,
    /* do not use 'new' for side effects */
    'no-new': 0,
    /* expected '===' and instead saw '=='   */
    'eqeqeq': 0,
    'quote-props': 0,
    /* expected exception block, space or tab after '//' in comment */
    'spaced-comment': 0,
    /* unexpected if as the only statement in an else block */
    'no-lonely-if': 0,
    // 'flowtype-errors/show-errors': 2
  }
};
