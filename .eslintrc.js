module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },

  "plugins": [
    "import",
    "react"
  ],

  "extends": [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended"
  ],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },

  "rules": {
    "no-console": 1
  }
};