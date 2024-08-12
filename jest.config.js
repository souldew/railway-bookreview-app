/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/jest-tests/**/*.test.tsx"],
  preset: "ts-jest",
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // CSSファイルをモック
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // 拡張子のサポート
};