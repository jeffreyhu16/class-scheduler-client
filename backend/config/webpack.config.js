const path = require('path');
const extract = require("mini-css-extract-plugin");
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '/../../frontend/build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: extract.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                //applying rule
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        //using file-loader
                        loader: 'file-loader',
                        options: {
                            outputPath: "images"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new extract({
            filename: 'bundle.css'
        })
    ],  
}