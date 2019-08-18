//const debug = process.env.NODE_ENV !== "production";
const debug = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require("webpack");
const path = require('path');

module.exports = {
    //context: path.join(__dirname, "src"),
    devtool: debug ? 'eval-source-map' : false,
    entry: ['@babel/polyfill', './src/js/client.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'client.min.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        watchContentBase: true,
        port: 3000,
        proxy: [
            {
                context: '/api/',
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true
            }
        ]
    },
    plugins: /*debug ? [] : */ [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ]
};
