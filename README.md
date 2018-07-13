#  inner script webpack plugin

# Basic 

```javascript
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
    new WebpackPluginInnerScript()
  ]
}

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

# Params

## innerScript <true | false>  default: true

Used to set introversion

## include <RegExp | "*">  default: '*'

Used to set match src of script

## attr <Object>

Used to set the attributes of the script

like: 
```
attr: {
  defer: "defer"
}
```

# Example 

## Only set attributes

```javascript
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
      innerScript: false,
      attr: {
        async: "async"
      }
    })
  ]
}

normal
<script type="text/javascript" src="index_bundle.js"></script>

now
<script type="text/javascript" src="index_bundle.js" async="async"></script>

```

## Both set attributes and innerScript

```javascript
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
      attr: {
        async: "async"
      }
    })
  ]
}

normal
<script type="text/javascript" src="index_bundle.js"></script>

now
<script type="text/javascript">
var oBody = document.querySelector('body'),
oScript = document.createElement('script');
oScript.type = "text/javascript";
oScript.src = "index_bundle.js";
oScript.async = "async";
oBody.appendChild(oScript);
</script>

```

## let the file containing the 'index'

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new WebpackPluginInnerScript({
    innerScript: true,
    include: [/index/],
    attr: {
      async: "async"
    }
  })
]

normal
<script type="text/javascript" src="index_bundle.js"></script>
<script type="text/javascript" src="cc_bundle.js"></script>

now
<script type="text/javascript">
var oBody = document.querySelector('body'),
oScript = document.createElement('script');
oScript.type = "text/javascript";
oScript.src = "index_bundle.js";
oScript.async = "async";
oBody.appendChild(oScript);
</script>
<script type="text/javascript" src="cc_bundle.js"></script>
```