import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

export default {
    entry: {
        bundle: ['babel-polyfill', './src/assets/js'],
    },
    
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    
    output: {
        path: `/dist`,
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.woff(2)?((\?v=[0-9]\.[0-9]\.[0-9])|(\?ver=[0-9]\.[0-9]))?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(otf|ttf|eot|svg)((\?v=[0-9]\.[0-9]\.[0-9])|(\?ver=[0-9]\.[0-9]))?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]'
            },
            {
                test: /\.?scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!resolve-url!sass?sourceMap')
            }
        ]
    },
    
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('style.[hash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['bundle'],
            filename: 'index.html',
            template: './index.html'
        })
    ]
};
