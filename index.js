require('babel-core/register')();

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require("./webpack.config.js");

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    //hot: true,
    quiet: false,
    noInfo: false,
    color: true,
    clientLogLevel: 'warning'
});
server.listen(8080);