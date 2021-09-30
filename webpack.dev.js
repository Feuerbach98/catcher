const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = {
    ...common,
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, './dist'),
    port: 8080,
    host: '0.0.0.0',
    hot: true
  }
}
