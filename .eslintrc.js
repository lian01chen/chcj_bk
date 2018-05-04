module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "plugins": [
    "html"
  ],
  "settings": {
    "html/html-extensions": [
      ".html", ".vue", ".wpy"
    ]
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    "semi": [
      "error",
      "never"
    ],
    'no-unused-vars': ["error", {
      "args": "none"
    }],
    'no-control-regex':'off'
  },
  "globals": {
    "WeixinJSBridge": false
  }
};