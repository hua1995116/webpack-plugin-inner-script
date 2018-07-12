const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPluginInnerScript = require('../index');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackPluginInnerScript({
      innerScript: true,
      include: '*',
      attr: {
        async: "async"
      }
    })
  ]
}