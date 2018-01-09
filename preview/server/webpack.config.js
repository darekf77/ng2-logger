var webpack = require('webpack');
var fs = require('fs');
var WebpackOnBuildPlugin = require('on-build-webpack');
var child = require('child_process');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/index.ts',
    output: {
        // path: __dirname + '/dist-client',
        filename: 'client.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: nodeModules,
    node: {
        fs: "empty",
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: [
                    'isomorphic-region-loader',
                    {
                        "loader": "@ngtools/webpack",
                        "options": {
                            "tsConfigPath": "tsconfig.json",
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: [
                    'isomorphic-region-loader'
                ]
            }
        ]
    },

    plugins: [
        new WebpackOnBuildPlugin(function (stats) {
            child.execSync('cd ' + process.cwd() + ' && npm-run tsc', { stdio: [0, 1, 2] });
        })
    ]
}

