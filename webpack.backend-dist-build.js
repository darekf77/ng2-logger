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

const outputFolder = 'dist';

const outputPath = __dirname + '/' + outputFolder;

module.exports = {
  entry: './tmp-source-dist/index.ts',
  target: 'node',
  output: {
    path: outputPath,
    libraryTarget: "commonjs",
    filename: 'index.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loaders: ['ts-loader']
      },
      // {
      //   test: /\.ts$/,
      //   loaders: [],
      // }
      // { test: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  externals: [
    function (context, request, callback) {
      if (request[0] == '.') {
        callback();
      } else {
        callback(null, request);
      }
    }
  ],
  // node: {
  //   __dirname: false,
  //   __filename: false
  // },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // }),
    // new WebpackOnBuildPlugin(function (stats) {
    //   console.log('WEBPACK DONE COMPILATION')
    //   fs.writeFileSync(path.join(outputPath, 'index.d.ts'),`export * from './${outputFolder}';
    //   `);
    // }),
  ]
}