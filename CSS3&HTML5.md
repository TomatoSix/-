HTML5

# 语义化标签作用

1. 代码结构:  使页面没有 css 的情况下，也能够呈现出很好的内容结构
2. 有利于 SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
3. 提升用户体验: 例如 title、alt 可以用于解释名称或者解释图片信息，以及 label 标签的灵活运用。
4. 便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的 html 结构，减少差异化。
5. 方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

6. Canvas 画布
   <canvas>标签只是图形容器，必须使用脚本来绘制图形

7. Video(视频)

8. Audio(音频)

9. 新的 Input 类型
   color 用于在 input 字段选取颜色 `<input type="color" name="favcolor">`
   date 允许从日期选择器中选择一个日期
   datetime 允许选择一个日期
   email 用于应该包含 e-mail 地址的输入域
   month 允许选择一个月份
   number 用于应该包含数值的输入域
   range 用于应该包含一定范围内数字值的输入域
   search 用于搜索域
   tel 定义输入电话号码字段
   time 允许选择一个时间
   url 用于应该包含 URL 地址的输入域
   week 允许选择周和年

10. 表单元素

11. 表单属性

12. 语义化标签
<header> <nav> <section> <article> <aside> 
<figcaption> 定义<figure>元素的标题
<figure> 规定独立的流内容
<footer>

13. Web 存储
    客户端存储数据的两个对象为
    localStorage - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除
    sessionStorage - 用于临时保存同一窗口或标签页的数据，在关闭窗口或标签页之后将会删除这些数据

保存数据：localStorage.setItem(key,value);
读取数据：localStorage.getItem(key);
删除单个数据：localStorage.removeItem(key);
删除所有数据：localStorage.clear();
得到某个索引的 key：localStorage.key(index);

# CSS3

https://www.nowcoder.com/discuss/123161?channel=-1&source_id=profile_follow_post_nctrack
https://juejin.cn/post/6844903988647690247#heading-10

# 边框

1. 边框阴影
   box-shadow: h-shadow v-shadow blur spread color inset;
   box-shaow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色

2. 圆角
   border-radius: 用于创建圆角
   四个 border-top-left-radius | border-top-right-radius | border-bottom-right-radius | border-bottom-left-radius 属性的缩写

四个值： 左上 右上 右下 左下
三个值： 左上 右上和左下 右下
两个值： 左上与右下 右上与左下
一个值： 四个圆角值相同

# 背景

border-image: 使用图像创建一个边框

border-image: source slice width outset repeat|initial|inherit;

4. 渐变
   CSS3 定义了两种类型的渐变：线性渐变 和 径向渐变（由它的中心定义）

线性渐变

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

径向渐变

```css
background-image: radial-gradient(
  shape size at position,
  start-color,
  ...,
  last-color
);
```

# 文本效果

hanging-punctuation 规定标点字符是否位于线框之外。
punctuation-trim 规定是否对标点字符进行修剪。
text-align-last 设置如何对齐最后一行或紧挨着强制换行符之前的行。
text-emphasis 向元素的文本应用重点标记以及重点标记的前景色。
text-justify 规定当 text-align 设置为 "justify" 时所使用的对齐方法。
text-outline 规定文本的轮廓。
text-overflow 规定当文本溢出包含元素时发生的事情。
text-shadow 向文本添加阴影。
text-wrap 规定文本的换行规则。
word-break 规定非中日韩文本的换行规则。
word-wrap 允许对长的不可分割的单词进行分割并换行到下一行。

# 字体

- @font-face

```css
@font-face {
  font-family: myFirstFont; //规定字体的名称
  src: url(sansation_light.woff); //定义字体文件的URL
}
div {
  font-family: myFirstFont;
}
```

# 2D 转换

- translate()：元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数。 transform: translate(50px,100px);
- rotate()：元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。transform: rotate(30deg);
- scale()：元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数。transform: scale(2,4);
- skew()：元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数。transform: skew(30deg,20deg);
- matrix()： 把所有 2D 转换方法组合在一起，需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。transform:matrix(0.866,0.5,-0.5,0.866,0,0);

# 3D 转换

- rotateX()：元素围绕其 X 轴以给定的度数进行旋转。transform: rotateX(120deg);
- rotateY()：元素围绕其 Y 轴以给定的度数进行旋转。transform: rotateY(130deg);

# transition 过渡效果，使页面更平滑

# 动画 animation

# web worker

WebWorker 允许在主线程之外再创建一个 worker 线程，在主线程执行任务的同时，worker 线程也可以在后台执行它自己的任务，互不干扰。

# web socket

WebSocket 的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力

- 应用
  体育赛事、聊天室、实时位置等场景

# 动画

- animation 属性

```css
div {
  /* 关键帧的名称  指定多少时间内完成 播放次数 */
  animation: mymove 5s infinite;
}
```

1. animation-name 关键帧的名称
2. animation-duration 指定多少毫秒完成
3. animation-delay 设置动画在启动前的延迟间隔

# 点击盒子 100ms 向右移动 100px

```css
* {
  margin: 0;
  padding: 0;
}
.main {
  position: relative;
  top: 0;
  left: 0;
  height: 900px;
  width: 900px;
  background-color: rgb(199, 199, 236);
}
#box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

```html
<div class="main">
  <div id="box"></div>
  <button id="btn">点击向右移动100px</button>
</div>
```

```js
//element.style只能获取style设置的属性值
var box = document.getElementById("box");
let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var left = parseInt(getComputedStyle(box).left);
  var left = left + 200;
  var interval = setTimeout(function () {
    box.style.left = left + "px";
  }, 100);
});
```

# 实现动画，元素先向右移动 200px,再返回原点，一共移动 n 次

```css
div {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: mymove 2s 2;
  /*Safari、Chrome 和 Opera*/
  -webkit-animation: mymove 2s 2;
}
@keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: 200px;
  }
}
/*Safari、Chrome 和 Opera*/
@-webkit-keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: 200px;
  }
}
```
