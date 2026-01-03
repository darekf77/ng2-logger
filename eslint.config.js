// eslint.config.js
const angularEslintRecommended = require('@angular-eslint/eslint-plugin').configs.recommended;
const angularTemplateProcessInlineTemplates = require('@angular-eslint/eslint-plugin-template').configs['process-inline-templates'];
const prettierConfig = require('eslint-config-prettier');
const tsRecommended = require("@typescript-eslint/eslint-plugin").configs.recommended;

// eslint.config.js
module.exports = [
  {
    ignores: [
      "projects/**/*",
      "dist/**/*",
      "dist-nocutsrc/**/*",
      "node_modules/**/*",
      "tmp-*/**/*",
      "taon.json",
      "tsconfig*",
      ".vscode/**/*",
      "taon-config-standalone.schema.json",
      "taon-config-container.schema.json",
      "run.js",
    ], // Optional: ignore specific folders
  },
  {
    files: ["src/**/*.ts"], // Specify the source folder explicitly
    languageOptions: {
      parser: require("@typescript-eslint/parser"), // Correct parser import
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "import": require("eslint-plugin-import"),
      "@angular-eslint": require("@angular-eslint/eslint-plugin"),
    },
    rules: {
      // @UNCOMMENT LINE BELOW TO ENABLE TYPESCRIPT RECOMMENDED RULES (STRICT)
      // ...tsRecommended.rules,
      ...angularEslintRecommended.rules,
      ...angularTemplateProcessInlineTemplates.rules,
      ...prettierConfig.rules,
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'warn',
      "@angular-eslint/no-empty-lifecycle-method": "off",
      // '@angular-eslint/component-class-suffix': [
      //   'warn',
      //   {
      //     suffixes: ['Page', 'Component','Container'],
      //   },
      // ],
      "@typescript-eslint/no-implicit-any-catch": "error",
      "lines-between-class-members": [
        "warn",
        "always",
        { exceptAfterSingleLine: false }
      ],

      // "padding-line-between-statements": [
      //   "warn",
      //   { "blankLine": "always", "prev": "export", "next": "export" }
      // ],

      // '@angular-eslint/component-selector': [
      //   'warn',
      //   {
      //     type: 'element',
      //     prefix: 'app',
      //     style: 'kebab-case',
      //   },
      // ],
      // '@angular-eslint/directive-selector': [
      //   'warn',
      //   {
      //     type: 'attribute',
      //     prefix: 'app',
      //     style: 'camelCase',
      //   },
      // ],
       // TO EXPENSIVE
      // '@typescript-eslint/member-ordering': [
      //   'warn',
      //   {
      //     default: [
      //       'signature',
      //       'call-signature',

      //       'public-static-field',
      //       'protected-static-field',
      //       'private-static-field',
      //       '#private-static-field',

      //       'public-decorated-field',
      //       'protected-decorated-field',
      //       'private-decorated-field',

      //       'public-instance-field',
      //       'protected-instance-field',
      //       'private-instance-field',
      //       '#private-instance-field',

      //       'public-abstract-field',
      //       'protected-abstract-field',

      //       'public-field',
      //       'protected-field',
      //       'private-field',
      //       '#private-field',

      //       'static-field',
      //       'instance-field',
      //       'abstract-field',

      //       'decorated-field',

      //       'field',

      //       'static-initialization',

      //       'public-constructor',
      //       'protected-constructor',
      //       'private-constructor',

      //       'constructor',
      //       'public-static-method',
      //       'protected-static-method',
      //       'private-static-method',
      //       '#private-static-method',

      //       'public-decorated-method',
      //       'protected-decorated-method',
      //       'private-decorated-method',

      //       'public-instance-method',
      //       'protected-instance-method',
      //       'private-instance-method',
      //       '#private-instance-method',

      //       'public-abstract-method',
      //       'protected-abstract-method',

      //       'public-method',
      //       'protected-method',
      //       'private-method',
      //       '#private-method',

      //       'static-method',
      //       'instance-method',
      //       'abstract-method',

      //       'decorated-method',

      //       'method',
      //     ],
      //   },
      // ],
      // '@typescript-eslint/explicit-function-return-type': 0,
      // 'no-void': 'error',
      // "no-unused-vars": "warn",
      // TODO modify in future for TAON use case
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true, // Allow function expressions (like anonymous functions) without return type
            allowTypedFunctionExpressions: true, // Allow functions in type declarations (like in interfaces)
            allowDirectConstAssertionInArrowFunctions: true, // Allow direct assertions
            allowHigherOrderFunctions: true, // Allow higher-order functions without explicit return type
            allowedNames: [], // List of getter names that are allowed to not have a return type
            // enforceForGetters: true, // Enforce return type for getters
            // enforceForSetters: false, // No need to enforce return type for setters (setters don't have return types)
          },
        ],
        // '@typescript-eslint/typedef': [
        //   'warn',
        //   {
        //     memberVariableDeclaration: true,
        //     parameter: true,
        //     propertyDeclaration: true,
        //   },
        // ],
    },
  },
  // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
  {
    files: ['*.html'],
    extends: ['plugin:@angular-eslint/template/recommended'],
    rules: {},
  },
  // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
  {
    files: ['*.html'],
    excludedFiles: ['*inline-template-*.component.html'],
    extends: ['plugin:prettier/recommended'],
    rules: {
      // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
];