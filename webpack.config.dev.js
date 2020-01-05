/* eslint-disable */
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const threadPool = HappyPack.ThreadPool({size: os.cpus().length})
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/main.tsx'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    resolve: {
        modules: [path.resolve(__dirname,'node_modules'), path.resolve(__dirname,'src')],
        extensions: ['.js','.tsx', '.ts']
    },
    stats: {
        children: false
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        host: 'localhost',
        port: 6688,
        hot: true,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /\*/, to: '/index.html' },
            ]
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 0
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(js|tsx)$/,
            exclude: /node_modules/,
            loader: 'happypack/loader?id=happyBabel'
        }, {
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: /node_modules/,
            enforce: 'pre'
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        },{
            test: /\.(svg|ttf|woff|eot)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'style/css/[hash].[ext]',
                    publicPath: '../../'
                }
            }]
        },{
            test: /\.(less|css)$/i,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new HappyPack({
            id: 'happyBabel',
            threads: 3,
            threadPool: threadPool,
            verbose: true,
            loaders: [{
                loader: 'babel-loader'
            }]
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            title: '多人对战贪吃蛇',
            template: path.resolve(__dirname, 'public/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
            hash: true,
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['js/vendor.js'],
            append: false,
            hash: true
        })
    ]
};

module.exports = config;