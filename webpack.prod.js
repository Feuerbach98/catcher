const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = {
    ...common,
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules:
            [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/proposal-class-properties"],
                    },
                },
                {test: /\.tsx?$/, loader: "ts-loader"},
            ],
    }
}
