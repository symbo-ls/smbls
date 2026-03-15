export default {
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.test.js',
    '<rootDir>/plugins/**/__tests__/**/*.test.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}
