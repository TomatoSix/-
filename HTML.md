# 常见的 HTML5 标签有：

* <section> - 章节
* <nav> - 导航
* <article> - 完整独立内容块
* <aside> - 和页面内容关联度较低的内容：例如广告（剩余的）
* <header> - 页面或者文章头部
* <footer> - 页面或者文字尾部
* <main> - 文档主要内容
* <figure> - 一个和文档有关的图例
* <figcaption> - 图例说明
* <mark> - 需要被高亮的引用文字
* <video> - 视频
* <audio> - 音频
* <source> - 为 video 和 audio 指定 媒体源
* <track> - 为 video 和 audio 指定 文本轨道（字幕）
* <canvas> - 位图区域
* <svg> - 矢量图
* <progress> - 进度条
* <meter> - 滑动条


# docoment、window、html、body 的层级关系：

  window > document > html > body       


  * window 是 BOM 的核心对象，它一方面用来获取和设置浏览器的属性和行为，另一方面作为一个全局对象。  
  * document 对象是一个跟文档相关的对象，拥有一些操作文档内容的功能，但是地位没有 window 高。  
  * html 元素对象跟 document 元素对象是属于 html 文档的 DOM 对象，可以认为就是 html 源代码中那些标签  化成的对象，它们跟 div、select 这些对象没有什么根本区别。