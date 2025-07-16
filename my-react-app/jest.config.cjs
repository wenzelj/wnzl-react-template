/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // If you have module aliases in tsconfig.json, you need to map them here
    // Example: '^@components/(.*)$': '<rootDir>/src/components/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      // ts-jest configuration options
      tsconfig: 'tsconfig.json', // Or your specific tsconfig file for tests
    }],
  },
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};
