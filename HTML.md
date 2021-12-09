# 什么是<!DOCTYPE>
是html5标准网页声明，且必须声明在HTML文档的第一行。
来告知浏览器的解析器用什么文档标准解析这个文档

* 严格模式(标准模式)
指浏览器按照W3C标准解析代码
标准模式又可以分为准标准模式 、 标准模式
1. HTML 4.01 严格型
```html
<!DOCTYPE HTML PUBLIC 
"-//W3C//DTD HTML 4.01//EN"
"http://www.3c.org/TR/html4/strict.dtd">
```

2. XHTML 1.0 严格型
```html
<!DOCTYPE HTML PUBLIC 
"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.3c.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

3. HTML5
```html
<!DOCTYPE html>
```

* 混杂模式(怪异模式或兼容模式)
指浏览器用自己的方式解析代码
# meta标签
https://juejin.cn/post/6987919006468407309

用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等.提供SEO
meta里的数据是供机器解读的，告诉机器该如何解析这个页面

* charset 声明文档使用的字符编码，解决乱码问题
```html
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
```

* name
```html
<!-- 页面标题<title>标签(head 头部必须) -->
<title>your title</title>
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address">
<!-- viewport主要是影响移动端页面布局的 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 告诉搜索引擎机器人抓取哪些页面，all / none / index / noindex / follow / nofollow。 -->
<meta name="robots" content="all">
```

* http-equiv属性
http-equiv一般设置的都是与http请求头相关的信息，设置的值会关联到http头部。也就是说浏览器在请求服务器获取html的时候，服务器会将html中设置的meta放在响应头中返回给浏览器。
常见的类型比如content-type, expires, refresh, set-cookie, window-target, charset， pragma等等。
```html
<!-- 用来声明文档类型、设置字符集 -->
<meta http-equiv="content-type" content="text/html charset=utf8">
<!-- 用于设置浏览器的过期时间，就是响应头中的expires属性 -->
<meta http-equiv="expires" content="31 Dec 2021">
<!-- 该种设定表示5秒自动刷新并且跳转到指定的网页。如果不设置url的值那么浏览器则刷新本网页。 -->
<meta http-equiv="refresh" content="5 url=http://www.zhiqianduan.com">
<!-- 强制页面在当前窗口以独立页面显示, 可以防止别人在框架中调用自己的页面。 -->
<meta http-equiv="window-target" content="_top'>

```



# iframe

# 移动端300ms点击延迟和点击穿透
https://juejin.cn/post/6844903633528553485

由于移动端会有双击缩放的这个操作，因此浏览器在click之后要等待300ms,看用户有没有下一次点击，也就是这次操作是不是双击
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