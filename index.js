function WebpackPluginInnerScript(options) {
    this.options = options || {};
}

WebpackPluginInnerScript.prototype.apply = function (compiler) {
    var self = this;
    if (compiler.hooks) {
        compiler.hooks.compilation.tap('HtmlWebpackReplace', function (compilation) {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
                'HtmlWebpackReplace',
                self.innerScript.bind(self)
            );
        });
    } else {
        compiler.plugin('compilation', compilation => {
            compilation.plugin(
                'html-webpack-plugin-alter-asset-tags',
                self.innerScript.bind(self)
            );
        });
    }
};

WebpackPluginInnerScript.prototype.innerScript = function (
    htmlPluginData,
    callback
) {
    const options = Object.assign({
        innerScript: true,
        include: '*',
        attr: {}
    }, this.options);
    ['head', 'body'].map(position => {
        for (var i = 0; i < htmlPluginData[position].length; i++) {
            const url = htmlPluginData[position][i].attributes.src;
            const template = htmlPluginData.outputName;

            let isInclude = false;
            // 全量进行覆盖
            if(options.include === '*') {
                isInclude = true
            } else {
                options.include.map(item => {
                    if (istype(item, 'RegExp') && template.match(item)) {
                        isInclude = true;
                    }
                });
            }
            // 确保作用的是script
            if (isInclude && htmlPluginData[position][i].attributes.type === 'text/javascript') {
                const attrs = [];
                const attrsName = Object.keys(options.attr);
                attrsName.map(item => {
                    const obj = {};
                    obj["key"] = item;
                    obj["value"] = options.attr[item];
                    attrs.push(obj);
                })
                // 如果需要改成行内形式
                if(options.innerScript) {
                    let innerAttrs = '';
                    attrs.map(item => {
                        innerAttrs += `oScript.${item.key} = "${item.value}";`;
                    })
                    htmlPluginData[position][i].innerHTML = `
                    var oBody = document.querySelector('body'),
                    oScript = document.createElement('script');
                    oScript.type = "text/javascript";
                    oScript.src = "${url}";${innerAttrs}
                    oBody.appendChild(oScript);
                    `;
                    htmlPluginData[position][i].attributes = {
                        type: 'text/javascript'
                    };
                } else {
                    attrs.map(item => {
                        htmlPluginData[position][i].attributes[item.key] = item.value;
                    })
                }
            }
        }
    })
    callback(null, htmlPluginData);
};

function istype(o, type) {
    return (
        Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']'
    );
}

module.exports = WebpackPluginInnerScript;