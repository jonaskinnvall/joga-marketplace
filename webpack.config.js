const debug = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: debug ? 'development' : 'production',
    devtool: debug ? 'eval-source-map' : false,
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: debug ? 'client.min.js' : 'client.[hash].min.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'images/[hash]-[name].[ext]' },
                    },
                ],
            },
        ],
    },
    devServer: debug
        ? {
              historyApiFallback: true,
              contentBase: './dist',
              watchContentBase: true,
              port: 3000,
              proxy: [
                  {
                      context: '/api/',
                      target: 'http://localhost:3001',
                      secure: false,
                      changeOrigin: true,
                  },
              ],
          }
        : {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
    ],
};
