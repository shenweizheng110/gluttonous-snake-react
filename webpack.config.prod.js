/* eslint-disable */
const config = require('./webpack.config.dev');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

config.mode = 'production';

config.module.rules[3].use = [MiniCssExtractPlugin.loader, 'less-loader', 'css-loader'];

config.optimization.minimizer = [
    new WebpackParallelUglifyPlugin({
        uglifyJS: {
            output: {
                beautify: false,
                comments: false
            },
            compress: {
                drop_console: true
            }
        }
    }),
    new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            safe: true,
            autoprefixer: { disable: true },
            mergeLonghand: false,
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    })
];

module.exports = config;
