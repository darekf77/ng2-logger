var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    entry: './index.js',
    output: {
        libraryTarget: "umd",
        filename: 'bundle.umd.js'
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

