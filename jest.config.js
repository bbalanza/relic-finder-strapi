require("dotenv").config()

module.exports = {
    verbose: true,
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
    testRegex: "tests/app.test.js",
    globals: {
        QR_CODE_API_KEY: process.env.QR_CODE_API_KEY
    },
};
