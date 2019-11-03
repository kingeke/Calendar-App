module.exports = {
    roots: [
        "<rootDir>/resources/js/src/"
    ],
    testRegex: 'resources/js/src/__tests__/.*.test.js$',
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    },
    setupFilesAfterEnv: [
        "<rootDir>/resources/js/src/setupTests.js"
    ],
}