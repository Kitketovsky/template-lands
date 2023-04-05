const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = function(env, argv) {
    const mode = env["production"] ? "production" : "development";
    const devMode = mode === "development";

    console.log(`Mode: ${mode}`);

    return {
        mode,
        entry: ["./src/index.hbs", "./src/index.js"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./js/main.js",
            clean: true,
        },
        devServer: {
            static: path.join(__dirname, "dist"), // path to your built files
            compress: true,
            port: 9000, // port number for the server,
            open: true,
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                    options: {
                        inlineRequires: "assets",
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.js$/i,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    type: "asset/resource",
                    generator: {
                        filename: 'assets/images/[name].[ext]'
                    }
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    type: "asset/resource",
                    generator: {
                        filename: 'assets/fonts/[name].[ext]'
                    }
                }
            ],
        },
        resolve: {
            extensions: [".*", ".js"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.hbs",
                title: "Custom Title",
                filename: "index.html",
                inject: true,
                // favicon: "./src/public/logo.ico",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: "./css/[name].css",
            }),
        ],
    }
};
