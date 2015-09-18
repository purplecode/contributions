var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  cache: true,
  entry: {
    main: './src/index.jsx'
  },
  output: {
    path: 'public/build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    definePlugin,
    commonsPlugin
  ]
};


