/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  collectCoverageFrom: [
    "{apps,components}**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",

  projects: [
    {
      displayName: 'apps/admin',
      testMatch: [
        '<rootDir>/apps/admin/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'apps/server',
      testMatch: [
        '<rootDir>/apps/server/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'packages/auth',
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/packages/auth/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'packages/database',
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/packages/database/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'packages/multi-theme',
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/packages/multi-theme/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'packages/rbac',
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/packages/rbac/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'packages/restful',
      preset: 'ts-jest',
      testMatch: [
        '<rootDir>/packages/restful/src/*.spec.(t|j)s'
      ]
    },
    {
      displayName: 'components/ui',
      testMatch: [
        '<rootDir>/components/ui/src/*.spec.(t|j)s'
      ]
    },
  ]
};
