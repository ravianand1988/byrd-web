const _ = require('lodash')
// Use a random port number for the mock API by default,
// to support multiple instances of Jest running
// simultaneously, like during pre-commit lint.
process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup'],
  setupTestFrameworkScriptFile: '<rootDir>/tests/unit/matchers',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/assets/svg/(.*)\\.svg\\?inline$': '<rootDir>/src/assets/svg/$1.svg', // Remove inline query from svg
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vuetify)'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/tests/e2e/**',
    '!src/main.js',
    '!src/app.vue',
    '!src/api/index.js',
    '!src/router.js',
    '!src/store/store.js',
    '!src/store/modules/customer.js',
    '!src/store/modules/order.js'
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#testurl-string
  // Set the `testURL` to a provided base URL if one exists, or the mock API base URL
  // Solves: https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
  testURL: process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`
}
