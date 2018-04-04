# a plugin for webpack 

# config 

- innerScript<Boolean>   true | false  (True is start innerScript)
- ignore<RegExp><Array>   Array   (Ignore url, if you don't need inner)

# example 

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPluginInnerScript = require('WebpackPluginInnerScript');

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
      ignore: []
    })
  ]
}
```