/**
 * Created by ex-wangxin on 2018/9/11.
 */
var webpack = require('webpack'); //访问内置的插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

var WEBPACK_PRO_ENV = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);
var modelString = {
    'dev':'你现在打包模式是dev开发模式',
    'dist':'你现在打包模式是dist本地生产模式',
    'release':'你现在打包模式是release服务器生成模式'
};
console.log(modelString[WEBPACK_PRO_ENV]);

var sourcePath = {
    'dev':path.join(__dirname,'../server/views'),
    'dist':path.join(__dirname,'../dist'),
    'release':'/opt/allwebfront/topwebfront'
};

module.exports={
    entry:'./src/js/router.js',
    output:{
        path:sourcePath[WEBPACK_PRO_ENV],
        filename:'js/main_[hash:8].js',
        publicPath:'./',
    },
    mode:'development',
    devtool :"#source-map",
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,//编译时不需要编译的文件
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','env','react','stage-0'],
                    }
                },
            },
            {
                test: /\.(scss|css|sass)$/,
                use:[MiniCssExtractPlugin.loader,{loader:'css-loader'},{loader:'sass-loader'}]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    loader:'file-loader',
                    query:{
                        name:'images/[name]_[hash:8].[ext]',
                        publicPath:'../'
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            favicon:'./src/images/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name]_[hash:8].css'
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            socket:'socket.io-client',
            Phaser: 'phaser',// 无需每个文件导入，全局直接使用Phaser
        })
    ]
};
