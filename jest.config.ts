export default {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/database',
    'src/test',
    'src/types',
  ],
  reporters: ['default'],
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
