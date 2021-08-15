const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const isProd = process.env.NODE_ENV === 'production';

const src = path.resolve(__dirname, 'src');
const pages = path.resolve(src, 'pages');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  mode:    isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval-source-map',
  target:  isProd ? "browserslist" : "web",

  entry:   path.resolve(src, 'index.js'),
  output:  {
    filename: 'app.js',
    path:     dist,
    // clean:    true,
  },
  resolve: {
    alias: { src },
  },

  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        use:  [{
          loader:  'expose-loader',
          options: {
            exposes: [
              { globalName: '$', override: true },
              { globalName: 'jQuery', override: true },
            ],
          },
        }],
      },
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        use:     [{
          loader:  'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
            ],
          },
        }],
      },
      {
        test: /\.pug$/,
        // loader:  'pug-loader',
        use: [{
          loader:  'simple-pug-loader',
          options: { pretty: true },
        }],
      },
      {
        test: /\.(scss|css)$/i,
        use:  [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: "css-loader",
            // options: {
            //   url: ( url ) => url.includes("sprite.png") ? false : true,
            // },
          },
          {
            loader:  'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                ],
              },
            },
          },
          {
            loader:  "sass-loader",
            options: {
              additionalData: `@import "./style/_vars.scss"; @import "./style/_mixins.scss"; @import "./spritesmith-generated/sprite.scss";`,
              sassOptions:    {
                includePaths: [path.resolve(src)],
              },
            },

          },
        ],
      },
      {
        test:    /.(ttf|otf|eot|woff|woff2|svg)$/,
        include: /fonts/,
        use:     [{
          loader:  'file-loader',
          options: {
            name:       '[name].[ext]',
            outputPath: 'fonts',
          },
        }],
      },
      {
        test:    /\.(png|jpe?g|gif|svg)$/i,
        exclude: [/\.sprite\.svg$/, /sprite\.png$/],
        use:     [{
          loader:  'file-loader',
          options: {
            name:       ( resourcePath, resourceQuery ) => path.relative(src, resourcePath).replace(/\//g, '_'),
            esModule:   false,
            outputPath: 'img',
          },
        }],
      },
      {
        test:    /\.(png)$/i,
        include: [/sprite\.png$/],
        use:     [{
          loader:  'file-loader',
          options: {
            name:       'sprite.png',
            esModule:   false,
            outputPath: 'img',
          },
        }],
      },
      {
        test:    /\.svg$/,
        include: /\.sprite.svg$/,
        use:     [{
          loader:  'svg-sprite-loader',
          options: {
            esModule:   false,
            extract:    true,
            outputPath: 'img/',
            publicPath: `img/`,
            symbolId:   filePath => path.basename(filePath).split('.')[0],
          },
        }],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css?' + Date.now() }),
    new SpriteLoaderPlugin({
      // plainSprite: true,
    }),
    new SpritesmithPlugin({
      src:        {
        cwd:  path.resolve(__dirname, 'src/img/sprites'),
        glob: '*.png',
      },
      target:     {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css:   path.resolve(__dirname, 'src/spritesmith-generated/sprite.scss'),
      },
      apiOptions: {
        cssImageRef: "src/spritesmith-generated/sprite.png",
      },
    }),
    ...fs.readdirSync(pages)
      .filter(fileName => fileName.endsWith('.pug'))
      .map(page => new HtmlWebpackPlugin({
        template: path.resolve(pages, page),
        filename: `./${page.replace(/\.pug/, '.html')}`,
        minify:   false,
        inject:   'body',
      })),
  ],

  optimization: isProd ? {
    minimize:  true,
    minimizer: [
      new TerserPlugin({
        // cache:         true,
        parallel:      true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  } : undefined,

  devServer: {
    host:        '0.0.0.0',
    port:        8081,
    contentBase: dist, // для раздачи png спрайта
  },

  stats: "minimal",
};
