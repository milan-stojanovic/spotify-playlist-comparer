module.exports = {
	root: true,
	ignorePatterns: ["projects/**/*"],
	overrides: [
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				sourceType: "module",
			},
			plugins: ["@typescript-eslint", "prettier", "@angular-eslint"],
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@angular-eslint/recommended",
				"plugin:prettier/recommended",
			],
			rules: {
				"prettier/prettier": "error",
			},
		},
		{
			files: ["*.html"],
			extends: ["plugin:@angular-eslint/template/recommended"],
			rules: {},
		},
	],
};
