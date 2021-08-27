# webpack 
是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)

### webpack 核心概念
* Entry 入口起点
    指示webpack应该使用哪个模块，来作为其内部依赖图的开始

* Output 告诉webpack在哪里输出它所创建的bundles,以及如何命名这些文件，默认值为./dist

* Loader 让webpack能够处理那些非JavaScript文件(webpack 自身只理解JavaScript)
    loader可以将所有类型的文件转换为webpack能够处理的有效模块，然后就可以利用webpack的打包能力，对它们进行处理

* Plugin 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务
    插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量

### webpack 构建流程
Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程:axios

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。


### webpack.config.js webpack的配置文件
作用：指示webpack干哪些活(当你运行webpack指令时，会加载里面的配置)
所有构建工具都是基于nodejs平台运行的，模块化默认采用commonjs

loader使用方法： 1. 下载  2. 使用(配置loader)
plugins使用方法： 1. 下载  2. 引入  3.使用


### 打包样式资源
```
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 指定输出的文件名
    filename: 'built.js'
    // 指定输出的绝对路径 即__dirname/build
    // __dirname 是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      // 打包css文件
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [

          // use数组中loader执行顺序：从右到左，从下到上，依次执行
          // 创建style标签， 将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      // 打包less文件
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件，需要下载less-loader和less
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 详细plugins的配置
    // 打包html资源  html-webpack-plugin 是一个类
    // 功能： 默认会创建一个空的HTML, 自动引入打包输出的所有资源(JS/CSS)
    // 需求： 需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html'
    });
  ],
  // 模式，分为开发模式和生产模式
  mode: 'development',  开发模式
  // mode: 'production'  生产模式
}
```


### 打包图片资源
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output： {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 要使用多个loader处理用use
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理图片资源
        test: 'url-loader'
        // 使用一个loader用loader
        // 下载 url-loader file-loader,因为 url-loader依赖file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb, 就会被base64处理
          // 优点： 减少请求数量(减轻服务器压力)
          // 缺点： 图片体积会更大(文件请求速度更慢)
          limit: 8 * 1024
        }
      },
      {
        test: /\.html$/,
        // 专门负责处理html文件的img图片(负责引入img, 从而能被url-loader进行处理)
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',  开发模式
}