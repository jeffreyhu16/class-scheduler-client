const path = require('path');
const extract = require("mini-css-extract-plugin");
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/../../frontend/src/index.js'),
    output: {
        path: path.join(__dirname, '/../../frontend/build'),
        filename: 'bundle.js'
    },
    
    resolve: {
        modules: [path.join(__dirname, '/../../frontend/node_modules'), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
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