/**
 * webpack.config.js
 *
 * This config serves as both the development and production
 * Webpack config. The difference is that it's consumed by
 * either webpack-dev-server (development) or webpack itself
 * (production)
 */

const webpack = require('webpack');
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const _ = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Sample TypeScript App',
  inject: true
});

const uglifyWebpackPlugin = new UglifyWebpackPlugin();




/**
 * Export config
 */
module.exports = (env) => {
  env = env || {};
  fixWebpackEnv(env)
  const { watch = false, outFolder = 'dist', moduleName = undefined, port = 9000 } = env;
  // console.log('env', env)
  const browserOutFolder = `browser-for-${moduleName}`;
  const srcDirRelative = _.isString(moduleName) ? `./tmp-src-${outFolder}-${browserOutFolder}` : `./tmp-src-${outFolder}`;
  const distDirRelative = _.isString(moduleName) ? `./${browserOutFolder}` : `./${outFolder}-browser`;

  const srcDir = path.join(__dirname, srcDirRelative);
  const distDir = path.join(__dirname, distDirRelative);

  let ENV = fse.existsSync('./tmp-environment.json') ? fse.readJSONSync('./tmp-environment.json', {
    'encoding': 'utf8'
  }) : {}


  return {
    devtool: !watch ? 'source-map' : 'eval-source-map',
    entry: `${srcDirRelative}/app.ts`,
    output: {
      path: distDir,
      filename: '[name].[hash:5].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // {
        //   enforce: 'pre',
        //   test: /\.tsx?$/,
        //   loader: 'tslint-loader',
        //   include: srcDir,
        //   exclude: /node_modules/,
        //   options: {
        //     configFile: './tslint.json',
        //     failOnHint: true
        //   }
        // },
        {
          test: /\.tsx?$/,
          include: srcDir,
          exclude: /node_modules/,
          use: [
            // {
            //   /**
            //    * 2. Transpile ES6 + dynamic imports into ES5
            //    *    (smaller bundle sizes than ts-loader alone)
            //    */
            //   loader: 'babel-loader',
            //   options: {
            //     presets: ['es2015'],
            //     plugins: ['babel-plugin-syntax-dynamic-import']
            //   }
            // },
            {
              /**
               * 1. Transpile TypeScript into ES6 + dynamic imports
               */
              loader: 'ts-loader',
              options: {
                // compilerOptions: {
                // module: 'esnext' , // allows bundle splitting via dynamic imports!,
                // },
                // configFile: "tmp-src-dist-browser/tsconfig.json"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        "ENV": JSON.stringify(ENV)
      }),
      noEmitOnErrorsPlugin,
      htmlWebpackPlugin,
      ...(!watch
        ? [uglifyWebpackPlugin]
        : [])
    ],
    devServer: {
      contentBase: srcDir,
      compress: true,
      port
    }
  };
}

function fixWebpackEnv(env = {}) {
  _.forIn(env, (v, k) => {
    const value = v;
    if (value === 'true') env[k] = true;
    if (value === 'false') env[k] = false;
  })
}