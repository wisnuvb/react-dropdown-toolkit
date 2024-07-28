module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index\\.tsx$',
    'src/utils/index\\.ts$',
    'src/PortalWrapper\\.tsx$',
    'src/.*\\.stories\\.tsx$',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!your-library-to-transform).+\\.js$'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
};
