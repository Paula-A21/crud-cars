import type { Config } from 'jest';

const config: Config = {

  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",

};

export default config;
