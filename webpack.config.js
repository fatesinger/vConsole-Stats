var pkg = require('./package.json');
var webpack = require('webpack');
var path = require('path')

module.exports = {
  devtool: false,
  entry: {
    vconsole : './src/stats.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'vconsole-stats-plugin.min.js',
    library: 'vconsole-stats-plugin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: ['babel-loader']
      },
      {
        test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: [
        pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
        'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
        pkg.license + ' license'
      ].join('\n')
    })
  ]
};