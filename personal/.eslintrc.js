module.exports = {
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
        'plugin:cypress/recommended'
    ],
    parser: 'babel-eslint',
    ignorePatterns: ['src/serviceWorker.js', 'build/**/*.js'],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single', { 'avoidEscape': true }],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-no-literals': ['error'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'max-lines': ['warn', 80],
        'global-require': 'off',
        'import/no-dynamic-require': 'off'
    },
    env: {
        browser: true,
        jest: true
    }
};
