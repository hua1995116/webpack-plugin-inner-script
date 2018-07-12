#  inner script webpack plugin

# basic 

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
      ignore: [],
      include: [/index/]
    })
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

# params

## innerScript <true | false>

Used to set introversion

## include <RegExp | "*">

Used to set match src of script

## attr <Object>

Used to set the attributes of the script

like: 
```
attr: {
  defer: "defer"
}
```

# example 

## only set attributes

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
      include: '*',
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

## both set attributes and innerScript

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
      include: '*',
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