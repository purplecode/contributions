var webpack = require('webpack');

var isProductionBuild = (process.argv.indexOf('--optimize-dedupe') !== -1);

console.log(`Build type: ${isProductionBuild ? 'production' : 'development'}`);

/*************************************************
 *                 Plugins
 *************************************************/
var plugins = [new webpack.DefinePlugin({
    __DEV__: isProductionBuild ? 'false' : 'true',
    'process.env': {
        'NODE_ENV': isProductionBuild ? "'production'" : "'development'"
    }
})];

if (isProductionBuild) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: true,
        sourceMap: true
    }));
}


/*************************************************
 *              Configuration
 *************************************************/
module.exports = {
    cache: true,
    entry: {
        main: './src/index.jsx'
    },
    output: {
        path: 'public/build',
        filename: '[name].js',
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                exclude: /font-awesome|index/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                plugins: ['transform-decorators-legacy'],
                presets: ['es2015', 'react', 'stage-0']
            },
            {
                test: /\.worker\.bundle\.js$/,
                loader: 'worker-loader'
            }
        ]
    },
    plugins: []
};


