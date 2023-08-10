import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*) : (AUTH-\d{4}) (.+)/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  rules: {
    'header-max-length': [1, 'always', 72],
    'subject-case': [1, 'always', 'sentence-case'],
    'scope-case': [1, 'always', 'upper-case'],
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'perf',
        'chore',
        'revert'
      ]
    ]
  }
};

module.exports = Configuration;
