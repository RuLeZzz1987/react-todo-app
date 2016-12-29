import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common.js';
import webpack from 'webpack';

const config = webpackMerge(commonConfig, {

    
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.ProvidePlugin({
            THREE: "three"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});

export default config;
