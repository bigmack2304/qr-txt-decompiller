const webpack = require("webpack");
const path = require("path"); // инструмент вебпака для работы с фаиловой системой
const HtmlWebpackPlugin = require("html-webpack-plugin"); // инструмент для работы вебпака с штмл документом при сборке
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // для удаления лишнего из папки dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // для того чтоб в dist создавался отдельный css фаил, а не встроенный в html
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // чтоб собираемый css фаил минимизировался (для продакшена)
const TerseWebpack_plugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// для dev и final сборок, подключаемые скрипты для страниц могут различатся
const enrys = {
    dev_version: {
        index: ["./ts/pages_scripts/index.ts", "./ts/qr/qr_descriptor.ts", "./ts/my_libs/dev_sticker.ts"], // подключаемый скрипт
    },
    final_version: {
        index: ["./ts/pages_scripts/index.ts", "./ts/qr/qr_descriptor.ts"],
    },
};

let webpack_custom_config = {
    context: path.resolve(process.cwd(), "source"), // задает корневую папку, относительно которой мы бдем указывать фаилы

    entry: {
        // точки входа в нашем приложении
        // index: [/*'@babel/polyfill',*/ "./ts/pages_scripts/index.ts", "./ts/qr/qr_descriptor.ts"], // подключаемый скрипт
        // // page_2: ["./js/pages/page_2.js"],    // если нужна 2я страница то тут для нее нужно указать используемые скрипты
        index: isDev ? enrys.dev_version.index : enrys.final_version.index,
    },

    resolve: {
        extensions: [".ts", ".js"], // добавим поддержку .ts фаилов
    },

    output: {
        // параметры сборки
        filename: "[name].[contenthash].js", // название общего собранного скрипта
        path: path.resolve(process.cwd(), compute_out_folder_name()), // складывать собранные фаилы в папку dist
    },

    plugins: compute_plugins(),

    module: compute_module(),

    optimization: compute_optimization(), // параметры оптимизации

    mode: compute_mode(), // режим записи данных в собранный фаил. Вынесено в команду сборки.
    // development не форматирует собранный фаил ( не уберает переносы строк)
    // production форматирует собранный фаил (уберает переносы строк)

    devServer: {
        // настройка для локального сервера
        port: 8000,
        hot: false, // сделал false, иначе страница не перезагружалась при изменении фаилов
    },

    target: ["web", "es5"], // платформы под которые собирается проект
};

init();
function init() {
    print_BuildMode();
    create_DevTool();
}

// печатает в консоль текущий режим сборки
function print_BuildMode() {
    console.log(`build mode ${process.env.NODE_ENV.toUpperCase()}`);
}

function compute_out_folder_name() {
    return isDev ? "dist/dev" : "dist/final";
}

function create_DevTool() {
    if (isDev) {
        webpack_custom_config.devtool = "source-map"; // добавить карту скриптов
    }
}

function compute_mode() {
    if (isDev) {
        return "development";
    }

    if (isProd) {
        return "production";
    }
}

function compute_plugins() {
    let plugins = [];

    /*     // понадобится если нужно сгенерировать 2ю html страницу
    plugins.push(
        new HtmlWebpackPlugin({
            template: "./page_2.html",  // шаблон должен быть соответствующий    
            inject: "body", 
            filename: "page_2.html",    // название страницы лучше задавать явно
            chunks: ["page_2"],         // скрипты страницы, берется из webpack_custom_config.entry - название нужного набора или наборов
        })
    ); 
*/

    plugins.push(
        new HtmlWebpackPlugin({
            // сборка html страницы
            template: "./index.html", // выбрать шаблон используемый при зборке html (создаем новый html на основе того что в сорцах)
            inject: "body", // куда подключать скрипты указанные в поле "entry" - в данном случае в body
            filename: "index.html",
            chunks: ["index"], // набор скриптов который будет использоватся на странице, webpack_custom_config.entry
        })
    );

    plugins.push(
        new CleanWebpackPlugin({
            //dangerouslyAllowCleanPatternsOutsideProject: true, // пришлось активировать это, иначе была ошибка при удалении фаилов вне каталога проекта
            //dry: true,
            // снова закоментил это, выяснилось что в корне проекта создался фаил desctop.ini хз откуда он взялся
            // но после его удаления все стало нормально.
        }) // удаляет все лишнее из папки dist
    );

    plugins.push(
        new MiniCssExtractPlugin() // собирает css в отдельный фаил
    );

    if (isDev) {
        // если режим разроботки
        plugins.push(
            new webpack.SourceMapDevToolPlugin({
                // создавать карту проекта (для удобства отладки)
                filename: "[file].map",
            })
        );
    }

    return plugins;
}

function compute_optimization() {
    let optimization = {};

    optimization.splitChunks = {
        chunks: "all", // поможет избежать дублирования кода
        maxSize: 245760, // максимальный размер фаилов с общим кодом для скриптов (240кб)
    };

    if (isDev) {
        // если режим разроботки
        optimization.minimize = false; // не сжимать собранныe фаилы
    } else if (isProd) {
        optimization.minimize = true; // сжимать собранныe фаилы
        optimization.minimizer = [
            new CssMinimizerPlugin({
                // плагин для сжатия css
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),

            new TerseWebpack_plugin({
                // плагин для сжатия js
                terserOptions: {
                    format: {
                        comments: false, // удалить комментарии в собранном фаиле
                    },
                },
                extractComments: false,
            }),
        ];
    }

    return optimization;
}

function compute_module() {
    let obj = {};
    let rules = [];

    rules.push(create_HtmlLoader());
    rules.push(create_CssLoader());
    rules.push(create_LessLoader());
    rules.push(create_JsLoader());
    rules.push(create_TsLoader());

    obj.rules = rules;
    return obj;
}

function create_HtmlLoader() {
    let loader = {};

    loader.test = /\.html$/;
    loader.use = [];

    loader.use.push({
        loader: "html-loader",
    });

    return loader;
}

function create_CssLoader() {
    let loader = {};

    loader.test = /\.css$/;
    loader.use = [];

    loader.use.push({
        loader: MiniCssExtractPlugin.loader,
    });

    // loader.use.push({
    //     loader: style-loader,
    // });

    loader.use.push({
        loader: "css-loader",
    });

    loader.use.push({
        loader: "postcss-loader",
        options: {
            // добавляем автопрефиксер
            postcssOptions: {
                plugins: [
                    [
                        "postcss-preset-env", // включает в себя автопрефиксер
                        {
                            browsers: "last 3 versions",
                        },
                    ],
                ],
            },
        },
    });

    return loader;
}

function create_LessLoader() {
    let loader = {};

    loader.test = /\.less$/i;
    loader.use = [];

    loader.use.push({
        loader: MiniCssExtractPlugin.loader,
    });

    // loader.use.push({
    //     loader: style-loader,
    // });

    loader.use.push({
        loader: "css-loader",
    });

    loader.use.push({
        loader: "postcss-loader",
        options: {
            // добавляем автопрефиксер
            postcssOptions: {
                plugins: [
                    [
                        "postcss-preset-env", // включает в себя автопрефиксер
                        {
                            browsers: "last 3 versions",
                        },
                    ],
                ],
            },
        },
    });

    loader.use.push({
        loader: "less-loader",
        options: {
            sourceMap: isDev ? true : false,
        },
    });

    return loader;
}

function create_JsLoader() {
    let loader = {};

    loader.test = /\.js$/;
    loader.exclude = /(node_modules)/;
    loader.use = [];

    loader.use.push({
        loader: "babel-loader",
        options: {
            // параметр для работы этого лоадера
            presets: ["@babel/preset-env"],
            comments: isDev ? true : false, // удалить комментарии в выходном фаиле
            minified: isDev ? false : true, // минифицировать выходной фаил
            inputSourceMap: isDev ? true : false,
        },
    });

    return loader;
}

function create_TsLoader() {
    let loader = {};

    loader.test = /\.ts$/;
    loader.exclude = /(node_modules)/;
    loader.use = [];

    loader.use.push({
        loader: "babel-loader",
        options: {
            // параметр для работы этого лоадера
            presets: ["@babel/preset-env"],
            comments: isDev ? true : false, // удалить комментарии в выходном фаиле
            minified: isDev ? false : true, // минифицировать выходной фаил
            inputSourceMap: isDev ? true : false,
        },
    });

    loader.use.push({
        loader: "ts-loader",
    });

    return loader;
}

module.exports = webpack_custom_config;
