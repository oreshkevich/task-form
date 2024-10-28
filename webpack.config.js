const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Для .scss файлов
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Подключение css-loader и sass-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
  },
};
