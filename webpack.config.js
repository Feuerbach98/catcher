const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

    
const commonConfig = {
    entry: "./src/index.ts",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")],
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    externals: {
        tslib: "tslib",
        "pixi.js": "PIXI",
        Howler: "Howler",
        Howl: "Howl", 
        FontFaceObserver: "FontFaceObserver",
        anime: "anime"
    }
};

const localConfig = {
    ...commonConfig,

    name: "local",

    mode: "development",
 
    watch: true,

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "app.js",
        publicPath: "/dist",
    },

    devServer: {
        contentBase: path.join(__dirname, "/"),
        compress: true,
        port: 9001,
        open: {
            app: ["Chrome"],
        },
        historyApiFallback: {
            rewrites: [
                {from: /.*\/dist\/app\.js/, to: "/dist/app.js"},
                {from: /.*/, to: "./index.html"},
            ],
        },
    },

    devtool: "inline-source-map",

    plugins: [
        new DefinePlugin({
            __ENVIRONMENT__: `"local"`,
        }), 
    ],
};
 
const devConfig = {
    ...commonConfig,

    name: "dev",

    mode: "development",

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "app.js",
        publicPath: "./",
    },

    devtool: "source-map",

    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            __ENVIRONMENT__: `"dev"`,
        }),
        new CopyPlugin({
            patterns: [
                {from: "./prodIndex.html", to: "./index.html"},
                {from: "./assets", to: "./assets"}
            ],
        })
    ],
};

const stagingConfig = {
    ...commonConfig,
 
    name: "staging",

    mode: "development",

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "app.js",
        publicPath: "./",
    },

    devtool: "source-map",

    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            __ENVIRONMENT__: `"staging"`,
        }),
        new CopyPlugin({
            patterns: [
                {from: "./prodIndex.html", to: "./index.html"},
                {from: "./assets", to: "./assets"}
            ],
        })
    ],
};

const prodConfig = {
    ...commonConfig,
    name: "prod",

    mode: "production",

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "app.js",
        publicPath: "./", 
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: "./prodIndex.html", to: "./index.html"},
                {from: "./assets", to: "./assets"}
            ],
        }),
        new DefinePlugin({
            __ENVIRONMENT__: `"prod"`,
            __TESTSTAND__: `"FALSE"`
        }),
    ],
};

module.exports = [localConfig, devConfig, stagingConfig, prodConfig];