// 用于开启一台服务器

module.exports = {
  // 方式一
  // 缺点：只能配置一个代理，使用不灵活
  // devServer: {
  //   // 发送请求的服务器
  //   proxy: 'http://localhost:5000'
  // }

  // 方式二
  devServer: {
    proxy: {
      // 请求前缀
      '/api': {
        target: 'http://lohost:5000'
      },
      '/foo' : {

      }
    }
  }


}