import webpackMerge from "webpack-merge";
import commonConfig from "./webpack.common.js";
import webpack from "webpack";

export default  webpackMerge(commonConfig, {
        devtool: 'inline-source-map',
        entry: {
            bundle: [
                'webpack-hot-middleware/client',
                './src/assets/js'
            ]
        },

        plugins: [
            new webpack.DefinePlugin
            ({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                    BABEL_ENV: JSON.stringify('development/client')
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
   