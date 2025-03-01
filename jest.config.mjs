import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Fixed path mapping
  },
  // Add these new configurations
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        // ts-jest configuration
        tsconfig: './tsconfig.json'
      }
    ]
  },
  globals: {
    'ts-jest': {
      isolatedModules: true // Faster tests
    }
  }
};

export default createJestConfig(config);
