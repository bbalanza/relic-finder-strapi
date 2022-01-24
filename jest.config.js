require("dotenv").config()

module.exports = {
    verbose: true,
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    testPathIgnorePatterns: [
        "/node_modules/",
        ".tmp",
        ".cache"
    ],
    modulePaths: [
        "/node_modules/",
        "<rootDir>/src"
    ],
    testEnvironment: "node",
    globals: {
        QR_CODE_API_KEY: process.env.QR_CODE_API_KEY
    },
};
