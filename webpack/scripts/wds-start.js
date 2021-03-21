const { webpack } = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clientConfig = require('../webpack.dev.config');
const getWbsConfig = require('./webpack-dev-server.config');
const chalk = require('chalk');

const { wdsPort } = require('../../src/share/pro-config');

function getWebPackCompiler() {
    return webpack(clientConfig);
}

function createWdsServer() {
    let compiler = getWebPackCompiler();
    
    compiler.hooks.done.tap('done', function(data) {
        console.log('\n wds server compile done');
    });

    return new WebpackDevServer(compiler, getWbsConfig(wdsPort, clientConfig.output.publicPath));
}


function runWdsServer() {

    let devServer = createWdsServer();
    devServer.listen(wdsPort, 'localhost', err => {
        if (err) {
            return console.log(err);
        }
        console.log(chalk.cyan('Starting the development node server...\n'));
    
        console.log('🚀 started');
    });

}

runWdsServer();