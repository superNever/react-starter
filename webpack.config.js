'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HappyPack = require('happypack');
//入口文件
let pageArr = [
    'index'
];
let configEntry = {};
pageArr.forEach((page) => {
    configEntry[page] = path.join('./examples/', page)
});

module.exports = {
    entry: configEntry,
    output: {
        filename: '[name][hash:8].js',
        // publicPath: './',
        path: './dist',
        // publicPath: "http://cdn.example.com/dist/"
    },
    externals: { // 指定采用外部 CDN 依赖的资源，不被webpack打包
        "react": "React",
        "react-dom": "ReactDOM",
        moment: true,
        "lodash": "_"
    },

    resolve: {
        root: __dirname,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.web.js', '.js', '.json'],
        // 提高webpack搜索的速度
        alias: {}
    },
    devServer: {
        contentBase: "./dist",
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['happypack/loader?id=js']
        },  {
            test: /\.css/,
            loaders: ['happypack/loader?id=css']
        }, {
            test: /\.less/,
            loaders: ['happypack/loader?id=less']
        }, {
            test: /\.(png|gif|jpe?g|svg)$/i,
            loader: 'url?limit=10000',
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/i,
            loader: "url?limit=10000"
        }]
    },
    plugins: [
        new ExtractTextPlugin("bundle[hash:8].css"),
        new HappyPack({
            id: 'js',
            threads: 5,
            loaders: ['babel']
        }),
        new HappyPack({
            id: 'css',
            threads: 5,
            loaders: ['style-loader!css-loader']
        }),
        new HappyPack({
            id: 'less',
            threads: 5,
            loaders: ["style-loader!css-loader!less-loader"]
        }),
        new HtmlwebpackPlugin({
            template: './examples/index.html',
            filename: './index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons', // 这公共代码的chunk名为'commons'
            filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
            minChunks: 2, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
        }),
        new OpenBrowserPlugin()
    ]
}