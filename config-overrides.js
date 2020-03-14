// eslint-disable-next-line import/no-extraneous-dependencies
const { override, addBabelPlugin, fixBabelImports, addLessLoader } = require('customize-cra');

const isDev = process.env.NODE_ENV === 'development';

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addBabelPlugin([
    'styled-components',
    {
      displayName: isDev,
      minify: !isDev,
      transpileTemplateLiterals: !isDev
    }
  ]),
  addBabelPlugin(['polished', {}])
);
