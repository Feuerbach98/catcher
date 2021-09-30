const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["./js/index.ts"],
    // mode: 'none', // none development production
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "game.min.[hash:8].js",
    },
    target: "web",

    resolve: {
        extensions: [".js", ".ts"],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/proposal-class-properties"],
                },
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: "assets/", to: "assets/" }]
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== "production",

            // optipng: {
            //   optimizationLevel: 4
            // },

            //seems better on mac this way
            pngquant: {
                verbose: true,
                quality: "80-90",
            },
        }),
        new HtmlPlugin({
            file: path.join(__dirname, "dist", "index.html"),
            template: "./index.html",
        }),
    ],
};
