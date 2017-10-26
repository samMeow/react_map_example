/* global __dirname */
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react', 'flow'],
            },
          },
        ],
      },
      {
        test: /(\.css|\.less)$/,
        use: 'ignore-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
}
