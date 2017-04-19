var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    WebpackStrip = require('strip-loader');


// var WebpackOnBuildPlugin = require('on-build-webpack');

// var nodeModules = {};
// fs.readdirSync('node_modules')
//     .filter(function (x) {
//         return ['.bin'].indexOf(x) === -1;
//     })
//     .forEach(function (mod) {
//         nodeModules[mod] = 'commonjs ' + mod;
//     });

module.exports = {
    entry: './index.ts',
    output: {
        // path: __dirname + '/bin',
        libraryTarget: "umd",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['ts-loader'] }
            // { test: /\.json$/, loaders: ['json-loader'] }
        ]
    },
    externals: {
        // 'rxjs/Observable': 'rxjs/Observable',
        // 'rxjs/Subject': 'rxjs/Subject',
        // 'rxjs/add/operator/map': 'rxjs/add/operator/map',
        // '@angular/core': '@angular/core'
    },
    // node: {
    //     fs: "empty",
    //     __dirname: false,
    //     __filename: false
    // },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        // new WebpackOnBuildPlugin(function (stats) {
        //     // Do whatever you want... 
        // }),
    ]
}



