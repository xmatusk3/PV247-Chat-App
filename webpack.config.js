/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');

const productionEnv = 'production';
const env = process.env.NODE_ENV;

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [['env', {
            targets: {
                browsers: ['last 2 versions', 'not ie <= 11']
            }
        }], ['stage-2']]
    }
};

const eslintLoader = {
    loader: 'eslint-loader',
    options: {}
};

const javascriptLoaders = [babelLoader, eslintLoader];

const plugins = [];

if (env === productionEnv) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: __dirname + '/build',
        filename: 'app.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        inline: true,
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: javascriptLoaders
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: javascriptLoaders
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
                // test: /\.css$/,
                // loader: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: 'styles/[name].[ext]',
                //         },
                //     },
                //     {
                //         loader: 'extract-loader',
                //         options: {
                //             publicPath: '../',
                //         }
                //     },
                //     // { loader: 'postcss-loader' },
                //     // { loader: 'css-loader' }
                // ]
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/[name].[ext]',
                        limit: 10000,
                    },
                }
            },
            {
                test: /\.(html|jpg|png|ico)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'static',
                    }
                },
            }
        ]
    },
    devtool: env === productionEnv ? '' : 'source-map',
    plugins: plugins,
};