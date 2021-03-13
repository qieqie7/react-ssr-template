const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//定一个通用的路径转换方法
const resolvePath = pathStr => path.resolve(__dirname, pathStr);

module.exports = {
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      resolvePath('../src/client/app/index.js')
    ], //入口文件
  },
  output: {
    filename: '[name].js', //设置打包后的文件名
    path: resolvePath('../dist/static'), //设置构建结果的输出目录
    publicPath: 'http://localhost:9002/',
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    alias: {
        'react-dom': '@hot-loader/react-dom'
    }
  }
};
