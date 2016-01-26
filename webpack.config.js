var webpack = require('webpack');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        impress: [
            'webpack-dev-server/client?http://localhost:8000',
            'webpack/hot/dev-server',
            './app/page/impress/app'
        ]
    },

    output: {
        path: './tmp',
        filename: '[name][hash].js',
        chunkFilename: '[name].[hash].js'//non-entry
    },

    devServer: {
        info: false,
        hot: true,
        inline: false,
        port: 8000,
        host: 'localhost',
        colors: true,
        progress: true,
        contentBase: 'tmp',
        historyApiFallback: false,
        stats: {
            colors: true,
            progress: true
        }
    },

    resolve: {
        modulesDirectories: ['lib', 'common' , 'node_modules'],
        extensions: ['', '.js']
    },
    jshint: {
        esnext: true
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules|lib/,
            loader: 'jshint'
        }],

        loaders: [
            /*{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer!less')
            },*/
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=[name][hash].[ext]'
            },
            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer!less'
            },
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs'
            },
            {
                test: /app\.js$/,
                loader: 'babel'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./tmp/[name][hash].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            "impress": "exports?window.impress!"+ process.cwd() + "/app/lib/impress.js"
        }),
        new HtmlPlugin({
            template : './index.html',
            inject: 'body',
            chunks: ['impress']
        }),
        new webpack.HotModuleReplacementPlugin(),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson()));
            });
        }/*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false

            },
            report: 'gzip',
            comments: false,
            preserveComments: false

        })*/
    ]
};
