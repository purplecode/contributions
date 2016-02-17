var webpack = require('webpack');

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
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader'},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
            {
                test: /\.css$/,
                exclude: /font-awesome|index/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                plugins: ['transform-decorators-legacy' ],
                presets: ['es2015', 'react', 'stage-0']
            }
        ]
    },
    plugins: []
};


