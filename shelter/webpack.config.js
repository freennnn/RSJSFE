const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");



module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const config = {
        mode: isProduction? 'production' : 'development',
        devtool: isProduction? 'source-map' : 'eval-source-map',
        watch: false, /*!isProduction,*/
        entry: ['./src/index.js', './src/sass/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: "script.js",
        },
        module: {
            rules: [
                // {
                //     test: /\.(?:js|mjs|cjs)$/,
                //     exclude: /node_modules/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: [
                //                 ['@babel/preset-env', { targets: "defaults" }]
                //             ]
                //         }
                //     }
                // },
                { 
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                // {
                //     test: /\.(png|jpe?g|gif)$/,
                //     use: [
                //         {
                //             loader: 'file-loader',
                //             options: {
                //                 name: '[path][name].[ext]',
                //             }
                //         }
                //     ]
                // },
                // {
                //     test: /\.(png|svg|jpe?g|gif)$/,
                //         loader: 'file-loader',
                //         options: {
                //             name: '[path][name].[ext]',
                //         },

                // },
                {
                    test: /\.html$/,
                    loader: "html-loader",
                    options: {
                        // Disables attributes processing
                        sources: false,
                      },
                },
              ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                  { from: "./src/assets/images", to: path.join(__dirname, '/dist/src/assets/images') },
                 //{ from: "other", to: "public" },
                ],
              }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                favicon: './src/assets/images/favicon/favicon.ico',
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ]
    }
    return config;
}