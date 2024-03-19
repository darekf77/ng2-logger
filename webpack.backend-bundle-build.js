// var webpack = require('webpack'),
var path = require('path'),
  fs = require('fs');

// var WebpackOnBuildPlugin = require('on-build-webpack');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = (env) => {
  // console.log({
  //   env
  // });

  var config = {
    entry: './tmp-source-' + env.outDir + '/index.ts',
    target: 'node',
    output: {
      path: __dirname + '/' + env.outDir,
      libraryTarget: "commonjs",
      filename: 'index.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {

      rules: [

        {
          test: /\.ts$/,
          exclude: path.resolve(__dirname, "node_modules"),
          loader: 'ts-loader',
          options: {
            configFileName:  'tsconfig.isomorphic-flat-' + env.outDir + '.json'
          }
        },
        // { test: /\.json$/, loaders: ['json-loader'] }
      ]
    },
    externals: nodeModules,
    node: {
      fs: "empty",
      // __dirname: false,
      // __filename: false
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: true
      //   }
      // }),
      // new WebpackOnBuildPlugin(function (stats) {
      //   // Do whatever you want...
      // }),
    ]
  };

  return config;
}