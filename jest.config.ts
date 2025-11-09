// /** @type {import('jest').Config} */

module.exports = {
	// globalTeardown: "<rootDir>/test/jest.teardown.ts",
	testTimeout: 15000, // 15detik,
	preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	forceExit:false,
	testMatch: ["**/**/*.test.ts"]
	// transformIgnorePatterns: ["node_modules/(?!uuid)"],
	// globalTeardown: "<rootDir>/test/jest.teardown.ts",
	// testTimeout: 15000, // 15 detik
};
