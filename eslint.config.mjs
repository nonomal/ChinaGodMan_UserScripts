import js from '@eslint/js'
import globals from 'globals'
import json from 'eslint-plugin-json'

export default [
    js.configs.recommended,
    {
        rules: {
            indent: 'off',
            'no-unexpected-multiline': 'off',
            'key-spacing': 'off', // allow whitespace anywhere
            quotes: ['error', 'single'], // enforce single quotes for string literals
            'comma-dangle': ['error', 'never'], // enforce no trailing commas in arrays or objects
            'no-async-promise-executor': 'off', // allow promise executor functions to be async (to accomodate await lines)
            'no-constant-condition': 'off', // allow constant conditions
            'no-empty': 'off', // allow empty blocks
            'no-inner-declarations': 'off', // allow function declarations anywhere
            'no-useless-escape': 'off', // allow all escape chars cause ESLint sucks at detecting truly useless ones
            //  'no-unused-vars': ['error', { 'caughtErrors': 'none' }],// allow unused named args in catch blocks
            'no-unused-vars': 'off', // 禁用未使用变量的检查
            'no-undef': 'off', //禁用未定义变量的检查
            'no-irregular-whitespace': 'error' // 启用不规则空白字符规则
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.greasemonkey,
                Toast: 'readonly',
                chatgpt: 'readonly'
            }
        }
    },
    { files: ['**/*.mjs'], languageOptions: { sourceType: 'module' } },
    { files: ['**/*.json'], ...json.configs['recommended'] }
]
