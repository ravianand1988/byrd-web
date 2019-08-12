module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
   parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  'overrides': [
    {
      'files': [
        '**/*.spec.js'
      ],
      'parserOptions': {
        'parser': 'babel-eslint',
        'sourceType': 'module'
      },
      'env': {
        'jest': true
      },
      'globals': {
        'mount': false,
        'shallowMount': false,
        'mountingOptions': false,
      }
    }
  ]
}
