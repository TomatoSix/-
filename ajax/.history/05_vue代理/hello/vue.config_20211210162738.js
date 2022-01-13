// 用于开启一台服务器

module.exports = {
  devServer: {
    // 发送请求的服务器
    proxy: 'http://localhost:5000'
  }
}