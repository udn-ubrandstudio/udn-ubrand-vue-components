const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
  
module.exports = {
  entry: path.resolve(__dirname + '/src/main.js'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'udn-newmedia-vue-components.min.js',
    libraryTarget: 'umd',
    library: 'udn-newmedia-vue-components',
    umdNamedDefine: true
  },
  externals: {
    Utils: 'udn-newmedia-utils',
    // lottieWeb: 'lottie-web',
    // d3: 'd3'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src')
      // vuex: 'vuex/dist/vuex.esm.js'
    }
  },    
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 注意：不要在 `loader` 下嵌入 `postcss` 选项
          postcss: [require('postcss-cssnext')(
            {
              browsers: [
                "> 1%",
                "last 4 versions",
                "not ie <= 8"
              ]
            }
          )],
        }
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  devServer: {
    index: './index.html',
    hot: true,
    port: 8080,
    overlay: {
      errors: true
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new BundleAnalyzerPlugin()    
  ]
}