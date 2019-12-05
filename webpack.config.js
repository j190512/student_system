const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const devServer = {
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    proxy: {
        '/api': {
            target: 'http://localhost:9000/mock/admin.json',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
    }
}
let config = {
    devServer,
    target: 'web',
    entry: ('./src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash:5].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        litmit: 8192,
                        name: 'images/[name]-[hash:5].[ext]'
                    }
                }]
            }, 
            {
                test: /\.(styl|stylus)/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.css$/,
                use:[isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'url-loader',
                //自配webpack 用url-loader，避免element ui的字体图标找不到 
                options:{
                  name:'style/[name]-[hash:5].[ext]'
                }
            }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? "'development'" : "'production'"
            }
        }),
        new HtmlPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'template.html')//本地自定义模板
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
                filename: 'style/[path]-[name]-[hash:5].css',
            })
    ]
}
// if (isDev) {
//     config.devServer = devServer
// } else {
//     config.plugins.push(
//         new MiniCssExtractPlugin({
//             filename: 'style/[name]-[hash:5].css',
//         })
//     )
// }
module.exports = config