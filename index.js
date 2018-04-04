function WebpackPluginInnerScript(options) {
    this.options = options || {};
}

WebpackPluginInnerScript.prototype.apply = function (compiler) {
    var self = this;
    if (compiler.hooks) {
        compiler.hooks.compilation.tap('HtmlWebpackReplace',
            function (compilation) {
                compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackReplace', self.innerScript.bind(self));
            });
    } else {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('html-webpack-plugin-alter-asset-tags', self.innerScript.bind(self));
        });
    }
};

WebpackPluginInnerScript.prototype.innerScript = function (htmlPluginData, callback) {
    if (this.options.hasOwnProperty('innerScript') && this.options.innerScript) {
        ['head', 'body'].map(position => {
            for (var i = 0; i < htmlPluginData[position].length; i++) {
                let isIgnore = false; // js
                const url = htmlPluginData[position][i].attributes.src;
                const template = htmlPluginData.outputName;
                if (this.options.hasOwnProperty('ignore') && this.options.ignore.length > 0) {
                    this.options.ignore.map(item => {
                        if (istype(item, 'RegExp') && item.test(url)) {
                            isIgnore = true;
                        }
                    });
                }
                if (isIgnore) {
                    break;
                }

                let isInclude = false; // html
                const hasInclude = this.options.hasOwnProperty('include');
                if (hasInclude && this.options.include.length > 0) {
                    this.options.include.map(item => {
                        if (istype(item, 'RegExp') && template.match(item)) {
                            isInclude = true;
                        }
                    });
                } else if(!hasInclude || this.options.include.length === 0) {
                    isInclude = true;
                }
                if (isInclude) {
                    htmlPluginData[position][i].innerHTML = `
                    var oHead = document.querySelector('body'),
                    oScript = document.createElement('script');
                    oScript.type = "text/javascript";
                    oScript.src = "${url}";
                    oHead.appendChild(oScript);`;
                    htmlPluginData[position][i].attributes = {
                        type: 'text/javascript'
                    };
                }
            }
        });
    }
    callback(null, htmlPluginData);
};

function istype(o, type) {
    return (Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']');
}

module.exports = WebpackPluginInnerScript;