const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[has].js',
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  }
}