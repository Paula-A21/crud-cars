import type { Config } from 'jest';

const config: Config = {

  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/mocks/'],
};

export default config;
