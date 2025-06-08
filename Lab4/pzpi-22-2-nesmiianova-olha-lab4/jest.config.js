module.exports = {
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.test\\.js$',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 10000
}; 