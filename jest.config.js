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
};
