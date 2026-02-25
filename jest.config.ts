/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

// const config: Config = {
const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  transform: {
          // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
          // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              // настройки для ts-jest
            },
          ],
        },
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts', // или правильный путь к вашему API файлу
    '^@utils-types$': '<rootDir>/src/utils/types.ts', // если нужно
    // добавьте другие алиасы по необходимости
  },
  // moduleDirectories: ['node_modules', 'src'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // roots: ['<rootDir>/src'],
  // testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
