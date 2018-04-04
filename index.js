var fs = require('fs');
var path = require('path');

function WebpackPluginInnerScript(options) {
    this.options = options || {};
}

WebpackPluginInnerScript.prototype.apply = function (compiler) {
    var self = this;
    if (compiler.hooks) {
        compiler.hooks.compilation.tap('HtmlWebpackReplace', function (compilation) {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackReplace', self.innerScript.bind(self));
        })
    } else {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-alter-asset-tags', self.innerScript.bind(self));
        })
    }

}

WebpackPluginInnerScript.prototype.innerScript = function (htmlPluginData, callback) {
    if (this.options.hasOwnProperty('innerScript') && this.options.innerScript) {
        for (var i = 0; i < htmlPluginData.body.length; i++) {
            let isIgnore = false;
            const url = htmlPluginData.body[i].attributes.src;
            if (this.options.hasOwnProperty('ignore') && this.options.ignore.length > 0) {
                this.options.ignore.map((item) => {
                    if (istype(item, 'RegExp') && item.test(url)) {
                        isIgnore = true;
                    }
                })
            }
            if (isIgnore) {
                break;
            }
            htmlPluginData.body[i].innerHTML = `
            var oHead = document.querySelector('body'),
                oScript = document.createElement('script');
            oScript.type = "text/javascript";
            oScript.src = "${url}";
            oHead.appendChild(oScript);
            `;
            htmlPluginData.body[i].attributes = {
                type: 'text/javascript'
            };
        }

    }
    callback(null, htmlPluginData);
}

function istype(o, type) {
    return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
}


module.exports = WebpackPluginInnerScript