//生产环境中 静态资源的处理
module.exports = function () {
    let devHost = '//localhost:9002';

    let jsFiles = ['libs.js', 'main.js'];
    let cssFiles = ['main.css'];

    const assets = {
        js: [],
        css: [],
    };
    if (!__IS_PROD__) {
        //开发环境
        jsFiles.forEach(item => {
            assets.js.push(`<script type="text/javascript"  src="${devHost}/${item}"></script>`);
        });
        cssFiles.forEach(item => {
            assets.css.push(`<link rel="stylesheet" type="text/css" href="${devHost}/${item}" />`);
        });
    } else {
        //生产环境 从 asset-manifest.json 读取资源
        const map = require('@dist/server/asset-manifest.json');
        jsFiles.forEach(item => {
            map[item] && assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`);
        });
        cssFiles.forEach(item => {
            map[item] && assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`);
        });
    }
    return assets;
};
