module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/index\\.tsx$",
    "src/utils/index\\.ts$",
    "src/PortalWrapper\\.tsx$",
    "src/.*\\.stories\\.tsx$",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
};
