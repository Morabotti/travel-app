const { DefinePlugin } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    './src/index.tsx'
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    filename: 'bundle.[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[j|t]sx?$/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        loader: 'file-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'import-glob'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build/*']
    }),
    new DefinePlugin({
      'process.env.APPLICATION_VERSION': JSON.stringify(process.env.APPLICATION_VERSION)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'build')
    }])
  ]
}
