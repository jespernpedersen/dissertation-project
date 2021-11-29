module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ["./tests/setup.js"],
  testMatch: [
    '**/tests/**/*.test.js']
}