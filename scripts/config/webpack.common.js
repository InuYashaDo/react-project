const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const {
  appIndex,
  appHtml,
  appSrc,
  appSrcComponents,
  appSrcUtils,
  appBuild,
  appPublic,
  appTsConfig,
} = require('../paths');
const { isDevelopment } = require('../env');

const getCssLoaders = importLoaders => [
  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          !isDevelopment &&
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                  grid: true,
                },
                stage: 3,
              },
            ].filter(Boolean),
        ],
      },
    },
  },
];

module.exports = {
  entry: {
    app: path.resolve(appIndex),
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    path: path.resolve(appBuild),
    filename: 'js/[name].[chunkhash:8].js',
    assetModuleFilename: `images/[name].[contenthash:8].[ext]`,
  },
  resolve: {
    alias: {
      Src: path.resolve(appSrc),
      Components: path.resolve(appSrcComponents),
      Utils: path.resolve(appSrcUtils),
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appHtml),
      filename: 'index.html',
      inject: 'body',
      quiet: true,
      minify: isDevelopment
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: appPublic,
          from: '*',
          to: appBuild,
          toType: 'dir',
          globOptions: {
            ignore: ['**/index.html'],
            dot: true,
            gitignore: true,
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDevelopment ? '正在启动' : '正在打包',
    }),
    new forkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(appTsConfig),
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
