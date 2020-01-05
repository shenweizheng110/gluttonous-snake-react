/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/vendor.js',
        library: 'global_vendor'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'vendor-manifest.json'),
            name: 'global_vendor',
            context: __dirname
        })
    ]
}