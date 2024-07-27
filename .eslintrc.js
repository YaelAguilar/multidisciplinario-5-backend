module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'hexagonal-architecture'
    ],
    overrides: [
        {
            files: ["src/**/*.ts"],
            rules: {
                "hexagonal-architecture/enforce": ["error"],
            },
        },
    ]
};
