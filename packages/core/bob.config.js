module.exports = {
  source: 'src',
  output: 'lib',
  targets: [
    ['module', { esm: true }],
    'typescript'
  ],
  exclude: '**/{__tests__,__fixtures__,__mocks__}/**'
};
