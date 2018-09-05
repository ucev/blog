module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "$": false,
    "React": true,
    "ReactDOM": true
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "prettier",
  ],
  "rules": {
    "arrow-spacing": "error",
    "indent": [
      "error",
      2, {
        "SwitchCase": 1
      }
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": "off",
    "quotes": [
      "error",
      "single"
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "semi": [
      "error",
      "never"
    ],
    "space-before-blocks": "error",
    "space-before-function-paren": "error",
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": "error"
  }
};
