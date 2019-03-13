//const debug = process.env.NODE_ENV !== "production";
const debug = process.argv[process.argv.indexOf("--mode") + 1] !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const webpack = require("webpack");
const path = require("path");

module.exports = {
    //context: path.join(__dirname, "src"),
    devtool: debug ? "eval-source-map" : false,
    entry: "./src/js/client.js",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader"
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "client.min.js"
    },
    plugins: /*debug ? [] : */ [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
