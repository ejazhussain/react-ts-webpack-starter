const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
    entry: './src/index.tsx',
    output: {
        //__dirname is taking us to root and and we are calling folder name as build
        path: path.resolve(__dirname, "dist"),
        filename: "./bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval-source-map",
    //devtool: "source-map",
    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".js", ".ts", ".tsx"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                //enable debugging in the browser
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                //find every file which ends with .tsx
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            
            {
                test: /\.(sa|sc|c)ss$/,
                /* use below for production */

                // use: [
                //     MiniCssExtractPlugin.loader,
                //     "css-loader",
                //     'sass-loader'
                // ],
                
                /* use below for Dev */
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]

}