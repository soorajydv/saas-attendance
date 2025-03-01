import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    files: ["**/*.ts"],
    plugins: {
      import: eslintPluginImport // Register the import plugin
    },
    languageOptions: {
      ecmaVersion: 2021, // Use ES2021 features
      sourceType: "module", // Use "script" if CommonJS
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        Buffer: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly"
      }
    },
    rules: {
      // Best Practices
      "no-console": "warn", // Allow console logs but warn about them
      "consistent-return": "error", // Enforce consistent return statements in functions
      "eqeqeq": ["error", "always"], // Require strict equality (`===` and `!==`)

      // Code Style
      "semi": ["warn", "always"], // Warn about missing semicolons
      "quotes": ["error", "double", { "avoidEscape": true }], // Prefer double quotes, allow escape for single quotes
      "indent": ["error", 2], // Enforce 2-space indentation
      "no-multiple-empty-lines": ["error", { "max": 2 }], // Disallow more than 2 blank lines

      // Variables
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Ignore unused variables starting with `_`
      "no-var": "error", // Disallow `var` in favor of `let` and `const`
      "prefer-const": "error", // Prefer `const` when variables are not reassigned

      // Functions
      "arrow-body-style": ["error", "as-needed"], // Enforce concise arrow function syntax when possible
      "no-empty-function": "error", // Disallow empty functions
      "func-style": ["error", "expression"], // Enforce function expressions over declarations

      // Imports/Exports
      "import/order": ["error", { "groups": [["builtin", "external", "internal"]] }], // Enforce order for imports
      "no-duplicate-imports": "error", // Disallow duplicate imports
      "import/no-mutable-exports": "error", // Disallow exporting mutable bindings

      // Comments
      "spaced-comment": ["warn", "always", { "exceptions": ["-", "+"] }] // Enforce space after `//` in comments
    }
  }
];
