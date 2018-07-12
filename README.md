#  inner script webpack plugin

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
      ignore: [],
      include: [/index/]
    })
  ]
}
```
# desc

```
normal
<script type="text/javascript" src="index_bundle.js"></script>

now
<script type="text/javascript">
var oHead = document.querySelector('body'),
    oScript = document.createElement('script');
oScript.type = "text/javascript";
oScript.src = "index_bundle.js";
oHead.appendChild(oScript);
</script>

```