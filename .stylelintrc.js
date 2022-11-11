module.exports = {
  // extends: ['stylelint-config-standard','stylelint-config-rational-order','stylelint-config-prettier'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': false,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['/^global/'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'dist/**/*'],
};
