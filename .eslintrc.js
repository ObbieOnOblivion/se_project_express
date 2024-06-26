module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  // Add the necessary extensions.
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Add this rule to allow dangling underscores in identifiers like _id
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  },
};