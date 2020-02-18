module.exports = {
  pages: {
    index: 'src/main.js',
    kuaizhan: {
      entry: 'src/main.js',
      template: 'public/kuaizhan.html',
      filename: 'kuaizhan.html',
    }
  },
  devServer: {
    disableHostCheck: true,
  },
  publicPath: process.env.publicPath || './',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('preload-kuaizhan');
    config.plugins.delete('prefetch-kuaizhan');
  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 100, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  }
}