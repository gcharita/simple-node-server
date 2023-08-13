module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["tsconfig.json"],
    },
    ignorePatterns: [".eslintrc.js"],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "no-console": "error",
        "object-literal-sort-keys": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
    },
}
