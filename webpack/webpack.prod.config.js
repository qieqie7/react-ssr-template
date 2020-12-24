const path = require('path');
const webpack = require('webpack');
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩和优化css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { WebpackManifestPlugin: ManifestPlugin } = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.BABEL_ENV = 'development'; //指定 babel 编译环境

//定一个通用的路径转换方法
const resolvePath = pathStr => path.resolve(__dirname, pathStr);

module.exports = {
  mode: 'production',
  entry: {
    main: resolvePath('../src/client/app/index.js'), //入口文件
  },
  /**
   * NOTE:
   * 太坑了太坑了
   * 如果不指定编译成 es5，webpack5 打包的时候用 箭头函数 去组织代码
   * uglifyjs 无法处理 es6 的语法
   * 就一直保存...
   * */
  target: ['web', 'es5'],
  output: {
    filename: 'js/[name].[chunkhash:8].js', //设置打包后的文件名
    path: resolvePath('../dist/static'), //设置构建结果的输出目录
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: false,
      __IS_PROD: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new ManifestPlugin({
      fileName: '../server/asset-manifest.json',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false,
          },
        },
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs',
        },
      },
    },
  },
};
