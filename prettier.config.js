/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 100,
  singleQuote: true,
  semi: false,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    '^[.]',
    '',
    '^~/*(.*)$',
    '',
  ],
  importOrderCaseSensitive: false,
  importOrderTypeScriptVersion: '5.2.2',
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
}
