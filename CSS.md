## CSS 层叠样式表(Cascading Style Sheets)

**浏览器 CSS 匹配不是从左到右进行查找，而是从右到左进行查找，这是为了尽早过滤掉一些无关的样式规则和元素**

# css 引入方式

1. 行内样式: 在网页上通过 style=""属性直接写样式

```html
<div style="color: green; margin-top: 30px;border: 1px solid red;width: 500px">
  行内样式实例1
</div>
```

2. 内部样式表：在网页上创建嵌入的样式表，通常写在<head></head>

```html
<style>
  p {
    color: #6478de;
    border: red 1px solid;
  }
</style>
```

3. 链入外部样式表 - link,通常写在<style></style>里面

4. 导入外部样式表： 通过@import 引入其他的 CSS 文件

```html
<style>
  @import "qt_02_style.css";
</style>
```

## 外部样式分为 <link> 引入和 @import 引入两种方式。这两种方式的区别为：

<link> 是 XHTML 标签，除了可以加载 CSS 外，还可以定义 RSS 等其他事务，通过 <link> 标签中的 href="" 属性来引入外部文件。@import 属于 CSS 范畴，只能加载 CSS ，应该写在 CSS 中，且导入语句应写在样式表的开头，否则无法正确导入外部文件。
<link> 引用 CSS 时，在页面载入的时候可以同时加载样式，样式加载和结构加载是异步操作。可以防止访问网页时先加载完文字、图片等结构数据，然后再加载样式的问题。@import 需要网页结构完全载入以后加载样式文件。
<link> 是 XHTML 标签，无兼容问题。@import 是在 CSS2.1 提出的，低版本浏览器不支持。
<link> 支持使用 JavaScript 控制 DOM 来改变样式。@import 不支持。

# css 浏览器前缀有哪些？

-webkit chrome/safari
-moz- firefox
-ms- ie
-o- opera

# 区别 flex:1 flex:0 flex:auto

- flex 是 flex-grow,flex-shrink,flex-basis 3 个属性结合在一起的缩写形式
  1. flex: none 表示 flex: 0 0 auto
  2. flex: 1 表示 flex: 1 1 auto
  3. flex: auto 表示 flex: 1 1 auto

1. 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```
.item {flex: 1;} .item { flex-grow: 1; flex-shrink: 1; flex-basis: 0%; }
```

2. 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

```
.item {flex: 2 3;} .item { flex-grow: 2; flex-shrink: 3; flex-basis: 0%; }
```

3. 当 flex 取值为一个长度或者百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，如下是等同的：

```
.item {flex: 0%;} .item { flex-grow: 1; flex-shrink: 1; flex-basis: 0%; }
.item {flex: ;} .item { flex-grow: 1; flex-shrink: 1; flex-basis: 0%; }
```

## flex: 1 是什么意思？

CSS 属性 flex 规定了弹性元素如何伸长或缩短以适应 flex 容器中的可用空间。
flex 属性是 flex-grow,flex-shrink,flex-basis 的缩写，默认值为 0 1 auto

- flex-grow 属性定义项目的放大比例，默认为 0(即如果存在剩余空间，也不放大)
- flex-shrink 属性定义了项目的缩小比例，默认为 1(即如果空间不足，该项目将缩小)
  flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值

- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。默认值为 auto，负值不被允许
  该值的单位可以是 width 单位 px, 也可以是一个相对于其父弹性盒容器主轴尺寸的百分数

# CSS 盒模型

页面上任何一个元素我们都可以看成是一个盒子，盒子会占用一定的空间和位置，他们之间相互制约，就形成了网页的布局

盒模型由四个部分构成: content, border, padding, margin

W3C 标准盒模型 属性 width,height 只包含内容 content
IE 盒模型(怪异盒模型) 属性 width,height = content + padding + border

```css
/*
当设置为box-sizing: content-box时， 将采用标准模式解析计算，也是默认模式；
当设置为box-sizing: border-box时，将采用IE盒模式解析计算
*/
box-sizing: content-box || border-box || inherit;
```

# 有哪些选择器？

1.  基础选择器

    1. id 选择器
    2. class 类选择器
    3. 标签选择器(div,p)
    4. 通配符(\*)

2.  组合选择器

    1. 多元素选择器 `E,F`;
    2. 后代元素选择器 `E F`; 匹配 E 元素的后代元素 F
    3. 子元素选择器 `E>F`; 匹配 E 元素的子元素 F
    4. 相邻兄弟选择器 `E+F`; E 元素后面紧跟着的 F 元素将被选中
       当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中。
    5. 兄弟选择器 `E~F` 选择 E 元素之后所有同层级 F 元素

3.  属性选择器

    1. 匹配所有具有`att`属性的 E 元素`E[att]`;
    2. 匹配所有`att`属性等于`val`的 E 元素`E[att=val]`;
    3. 匹配所有`att`属性具有多个空格分隔的值，其中一个值等于`val`的 E 元素`E[att~=val]`;
    4. 匹配所有`att`属性具有多个连字号分隔(hyphen-separated)的值，其中一个值以`val`开头的 E 元素`E[att |= val]`
    5. 匹配存在`att`属性并且属性值结尾是`val`的 E 元素`E[att$=val]`

    链接：https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements

4.  伪类选择器 --用于元素处于某个状态时，为其添加对应的样式，开头为冒号的关键字

    1. :first 匹配分页媒体的第一页。

    2. :first-child 匹配其父元素的子元素中的第一个元素。

    3. :nth-child 匹配其父元素的子元素中的第 n 个元素。

    4. :first-of-type 匹配兄弟元素中第一个某种类型的元素。

    5. LVHA

       1. :link 未点击前的样式
       2. :hover 当用户悬浮到一个元素之上的时候匹配。
       3. :active 点击时
       4. :visited

       四个顺序
       link -> hover -> active -> visited

5.  伪元素，创建一些不在文档树中的元素，并为其添加样式，开头为双冒号::

    1. ::before 匹配出现在原有元素的实际内容之后的一个可样式化元素。

    2. ::after 匹配出现在原有元素的实际内容之前的一个可样式化元素。

    3. ::first-line 该伪元素可改变段落首行文字的样式

    4. ::first-letter 该伪元素向文本的第一个字母添加特殊样式

    5. ::selection 匹配文档中被选择的那部分。

## CSS 选择器的优先级

优先级关系：`内联样式1000 > ID 选择器100 > 类选择器 = 属性选择器 = 伪类选择器10 > 标签选择器 = 伪元素1 > 通配选择器 > 继承样式`

选择器优先级的规定，最常用的方法是给不同的选择器分配权值:

内联样式 1000
id 选择器 100
类选择器、属性选择器和伪类选择器 10
标签选择器、伪元素选择器 1
在比较样式的优先级时，只需统计选择符中的 id、class 和标签名的个数，然后把相应的权值相加即可，最后根据结果排出优先级
权值较大的优先级越高
权值相同的，后定义的优先级较高
样式值含有`!important`，优先级最高

`div .class1 #people{}`的权值 等于 1+10+100=0,1,1,1
`.class2 li #age{}`的权值 等于 10+1+100=0,1,1,1
如果第二个选择器后定义样式，则第二个的优先级要高

# 伪类和伪元素的区别

- 伪类(pseudo-classes)
  其核心就是用来选择 DOM 树之外的信息，不能够被普通选择器选择的文档之外的元素，用来添加一些选择器的特殊效果。比如`:hover, :active`等，由于状态的变化是非静态的，所以元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样式，由此可以看出，它的功能和`class`有些类似，但它是基于文档之外的抽象，所以叫伪类

- 伪元素(pseudo-elements)-不存在于文档中的抽象元素
  DOM 树中没有定义的虚拟元素，核心就是需要创建通常不存在于文档中的元素，比如`::before, ::after`它选择的元素指定内容，表示选择元素内容的之前内容或之后内容。伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于文档中，所以称为伪元素，用于将特殊的效果添加到某些选择器

- 伪类与伪元素的区别

* 表示方法: 伪类在语法上用`:`表示，伪元素在语法上用`::`表示  
   但是，由于在旧版本的 W3C 规范并未对此进行特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。
* 定义不同: 伪类即假的类，可以添加类来达到效果，伪元素即假元素，需要通过添加元素才能达到效果

总结:

- 伪类和伪元素都是用来表示文档树以外的'元素', 即不存在 DOM 树中;
- 伪类和伪元素分别用单冒号`:`和双冒号`::`来表示;
- 伪类和伪元素的区别，关键点在于如果没有伪元素(或伪类)是否需要添加元素才能达到效果，如果是则是伪元素，反之则是伪类

# px, em, rem， vw/vh

px: 相对长度单位，像素 px 是相对于显示器屏幕分辨率而言的;

em: 相对长度单位，相对于当前对象内文本的字体尺寸;

rem: 相对长度单位，相对于 HTML 根元素字体尺寸大小, 通过修改根元素字体大小修改所有字体大小;

vw/vh: 相对于 viewport 相对视口的宽度和高度而定的

# 可以继承的属性

(1) 字体系列属性
font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust
(2) 文本系列属性
text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、text-transform、direction、color
(3) 表格布局属性
caption-side border-collapse empty-cells
(4) 列表属性
list-style-type、list-style-image、list-style-position、list-style
(5) 光标属性
cursor
(6) 元素可见性
visibility

5. CSS 实现 0.5px

(1). 缩放
先画一条 1px 的线，再通过 transfrom scaleY(0.5)

(2). 更改 meta 标签的 viewport

5. CSS 样式的引入 | @import 与 link 的区别

`link`是 html 方式, `@import`是 css 方式

`link`最大限度支持并行下载，`@import`过多嵌套导致串行下载，出现 FOUC(白屏)

# display `block`, `inline`, `inline-block` | 块元素、行内元素与行内块元素的区别

`block`元素: `div`, `form`, `table`, `p`, `pre`, `h1~h6`, `dl`, `ol`, `ul`;

`inline`元素: `span`, `a`, `strong`, `em`, `lable`, `input`, `select`, `textarea`, `img`, `br`

`display: block`

(1).block 元素会独占一行，多个 block 元素会各自新起一行; (2). block 元素可以设置 width, height; (3). block 元素可以设置 margin 和 padding

`display: inline`

(1). inline 元素不会独占一行，多个相邻的行内元素会排列在同一行，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化; (2). inline 元素设置 width, height 属性无效; (3). inline 元素只能产生水平方向的边距效果(margin, padding),竖直方向无效

`display: inline-block`

简单的来说就是将对象呈现`inline`对象，但是对象的内容作为`block`对象呈现。之后内联对象会被排列在同一行内。比如我们可以给一个 link`a`元素`inline-block`属性值，使其既具有 block 宽度高度特性又具有`inline`的同行特性

7. `display: none`与`visibility: hidden`的区别

联系: 他们都能让元素不可见

区别:
(1). `display: none`会让元素完全从 dom 树中消失，渲染的时候不占据任何空间;`visibility: hidden`不会让元素从渲染树消失，元素仍然会占据空间，只是内容不可见

(2). `display: none`是非继承属性，子孙节点消失是由于元素从 dom 树消失造成的，通过修改子孙节点属性无法显示, `visibility: hidden`是继承属性，子孙节点消失由于继承了`hidden`通过设置`visibility: visible`可以让子孙节点显示;

(3). 修改常规元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘

opacity：0 则仅仅不可见，但仍可被浏览器发现，也就能触发各种事件。通过浏览器调试工具即可得出此结论。

# flex 布局

容器属性:

    flex-direction: 主轴方向,
    flex-wrap: 是否换行,
    flex-flow: flex-direction与flex-wrap的简写,
    justify-content: 主轴的对齐方式,
    algin-items: 交叉轴的对齐方式,
    align-content: 多根轴线的对齐方式

项目属性:

    order: 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    flex-grow: 项目的放大比例
    flex-shrink: 项目的缩小比例
    flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
    flex: flex-grow, flex-shrink, flex-basis的简写
    align-self: 属性允许单个项目有与其他项目不一样的对齐方式(auto表示继承父类无父类等同于stretch)

## flex: 1

    首先`flex`属性是`flex-grow`, `flex-shrink`, `flex-basis`的简写形式;

    `flex-grow`: 定义项目的放大比例，即如果子元素未充满父元素，会按照一定的比例放大各个子元素，默认值为0, 按比例放大

    `flex-shirnk`: 定义项目的缩小比例，即如果子元素的宽度超过父元素的宽度，会按照一定的比例缩小子元素，默认值为0， 根据缩减系数和元素大小来计算

    `flex-basis`: 给上面两个属性分配多余空间之前，计算项目是否有多余空间，默认值为auto,即项目本身的大小

    所以`flex: 1`的完整写法是
    ```
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%
    ```

# grid 布局

# 元素隐藏方式

1. display: none
2. visibility: hidden
3. opacity: 0

# 定位方式及其区别

static: 默认值, 没有定位，元素出现在正常的流中;

relative: 相对于默认位置(即 static 时的位置)进行偏移，即定位基点是元素的默认位置;

fixed: 相对于视口进行偏移,即定位基点是浏览器窗口;脱离标准文档流

absolute: 相对于最近一级有定位祖先元素(一般是父元素(值不为 static))进行偏移，即定位基点是父元素;脱离标准文档流

sticky: 它会产生动态效果，很像 relative 和 fixed 的结合
在目标区域以内，它的行为就像 position:relative;在滑动过程中，某个元素距离其父元素的距离达到 sticky 粘性定位的要求时(比如 top：100px)；position:sticky 这时的效果相当于 fixed 定位，固定到适当位置。

inherit: 从父元素继承 position 属性的值

# margin 塌陷及合并问题

https://juejin.cn/post/6976272394247897101
塌陷解决方案：父级增加 overflow:hidden bfc
合并解决方案：margin 取最大值

# 浮动模型及清除浮动的方法

12. 浮动与清除浮动

脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当作脱离文档流的元素不存在而进行定位

当容器的高度为 auto，且容器的内容中有浮动的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响(甚至破坏)布局的现象叫浮动溢出，为了防止这个现象的出现，叫 CSS 清除浮动

```css
.news {
  background-color: gray;
  border: solid 1px black;
  /* method 2: 给浮动元素的容器添加overflow: hidden 或者overflow: auto */
  overflow: hidden;
}

.img {
  background-color: #bfa;
  width: 200px;
  height: 200px;
  float: left;
}

p {
  float: right;
}

/*method 1: 使用带clear属性的空元素  */
.clear {
  clear: both;
}

<div class="news">
  <div class="img"></div>
  <p>Some text</p>
  <div class="clear"></div>
</div>
```

(1). 方法一: 使用带 clear 属性的空元素

优点: 简单，代码少，浏览器兼容性好

缺点: 需要添加大量无语义的 html 元素，代码不够优雅，后期不容易维护

(2). 方法二: 使用 CSS 的`overflow`属性

(3). 方法三: :after 伪元素法

(4). 方法四：双伪元素清除浮动

# css 哪些属性可以继承

- 字体: line-height, font-family, font-size, font-style, font-weight, font
- 文本: letter-spacing, text-align, text-indent, text-transform, word-spacing
- 列表: list-style-image, list-style-position, list-style-type, list-style
- 颜色: color

# 包含块

# a 标签的作用

1. 跳转到外部网址

```css
<a href="http://www.baidu.com" target="_blank">百度</a>
```

2. 实现本地页面文件跳转
3. 设置锚点。在网页任意位置添加一个标记，可以由任何地方跳转到这个标记处
   定义锚点时，如果用 a 标签当做锚点，给 a 标签设置 name 属性，如果用其它标签当做锚点，给该标签设置 id 属性

```css
/* 在HTML文档中插入 id */
<h3 id="tips">详细说明</h3>
<p>内容</p>
/* 在HTML文档中创建一个链接到“详细说明” */
<a href="#tips">详细说明</a>
```

# BFC 是什么？

https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md
BFC 全称： Block Formatting Context 块级格式化上下文
简单来说，BFC 就是一个完全独立的空间(布局环境)，让空间里的子元素不会影响到外面的布局

## 如何生成 BFC？

1. 根元素
2. float 的值不为 none
3. overflow 的值不为 visible hidden|auto|scroll
4. display 的值为 inline-block、table-cell、table-caption、flex
5. position 的值为 absolute 或者 fixed

## BFC 的约束规则

- 内部的 Box 会在垂直方向上一个接一个的放置
- 垂直方向上的距离由 margin 决定。（完整的说法是：属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（塌陷），与方向无关。）
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

## BFC 的作用

1. 当两个相邻块级子元素分属于不同的 BFC 时可以阻止 margin 重叠(塌陷)

2. 使用 float 脱离文档流，高度塌陷，即父元素高度不会被撑开。可以给父元素触发 BFC

3. 两栏布局

4. 清除内部浮动(应该就是解决高度塌陷)

```
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
    }

    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

为达到清除内部浮动，我们可以触发 par 生成 BFC，那么 par 在计算高度时，par 内部的浮动元素 child 也会参与计算。

```
.par {
    overflow: hidden;
}
```

# 层叠上下文 层叠等级 层叠顺序 z-index

https://juejin.cn/post/6844903667175260174

1. 层叠上下文
   元素在页面 z 轴上的层叠关系

2. 层叠等级
   指层叠上下文中的层叠上下文元素在 z 轴上的上下顺序

3. 层叠准则
   1. 谁大谁上
   2. 后来居上

# style 写在 body 前后的区别

写在 body 标签后由于浏览器以逐行方式对 html 文档进行解析，当解析到写在尾部的样式表（外联或写在 style 标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在 windows 的 IE 下可能会出现 FOUC 现象（即样式失效导致的页面闪烁问题）

# 实现对齐

## 水平居中

1. 文本/行内元素/行内块元素
   `text-align + inline-block`

   ```css
   .outer {
     text-align: center;
   }

   .inner {
     display: inline-block;
     text-align: left;
   }
   /*上面代码中的 text-align: center; 会使文本居中，但是对块级元素无效，如果将元素设置为 inline-block，该元素就会被当做文本对待，从而实现元素居中。*/
   ```

2. 单个块元素
   `margin: 0 auto`

   ```css
   .inner {
     display: block;
     width: 100px; // width必须定宽，否则会继承父元素的宽度
     margin: 0 auto;
   }
   ```

3. 绝对定位

   1. ` 绝对定位 + margin: auto`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
      }
      ```

   2. `绝对定位 + margin-left`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 50%;
        margin-left: -50px; // 水平居中
        margin-top: -50px; // 垂直居中
        width: 100px;
        height: 100px;
      }
      ```

   3. `绝对定位 + translate`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 50%;
        transform: translate(
          -50%,
          0
        ); // 或者transform: translateX(-50%) 水平居中
      }
      ```

4. flex 布局

   ```css
   .parent {
     display: flex;
     justify-content: center; // 水平布局
     align-items: center; // 垂直布局
   }
   ```

## 垂直居中

1. 单行文本/行内元素/行内块元素
   `height = line-height`

   ```css
   .inner {
     height: 100px;
     line-height: 100px;
   }
   ```

2. 多行文本垂直居中(不能使用 line-height)
   `table-cell + vertical-align`

   1. 示例 1

      ```css
      footer {
        width: 100%;
      }
      footer .blue_bg {
        height: 40px;
        background-color: #304b5e;

        font-size: 1em;
        color: #fff;
        line-height: 40px; /* 垂直居中 */
        text-align: center; /* 水平居中 */
        cursor: pointer;
      }
      footer .footer_bottom {
        width: 100%;
        /* height:100px; */
        background-color: #f3f3f3;
        font-size: 1em;
        display: table; /*关键语句*/
        text-align: center;
      }
      .cell {
        display: table-cell; /*关键语句*/
        vertical-align: middle; /*关键语句  垂直居中*/
      }
      ```

      ```html
      <footer>
        <div class="blue_bg">联系我们 | 网站声明 | 广告合作</div>
        <div class="footer_bottom">
          <div class="cell">
            <p>
              鄂ICP备05011509号 水利部长江水利委员会主办
              长江委宣传出版中心制作维护
            </p>
            <p>
              新闻线索：027-82927755 电话总机：027-82828114
              投稿信箱：cjslw＠126.com
            </p>
            <p>作者: 番茄炒小六</p>
          </div>
        </div>
      </footer>
      ```

   2. 示例 2

      ```css
      .parent {
        background-color: pink;
        display: table;
        width: 300px;
        height: 400px;
        text-align: center;
      }
      .son {
        display: table-cell;
        background-color: yellow;
        vertical-align: middle;
      }
      ```

      ```html
      <div class="parent">
        <p class="son">
          会议认为，党的十八大以来，我国经济发展取得历史性成就、
          发生历史性变革，为其他领域改革发展提供了重要物质条件。经济实力
          再上新台阶，经济年均增长7.1%，成为世界经济增长的主要动力源和稳定器。
        </p>
      </div>
      ```

3. 绝对定位

   1. `absolute + translate`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        top: 50%;
        /*  transform中translate偏移的百分比就是相对于元素自身的尺寸而言的。*/
        transform: translate(0, -50%); /* 垂直居中 */
      }
      ```

   2. `absolute + margin-top`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        top: 50%;
        margin-top: -50px;
        width: 100px;
        height: 100px;
      }
      ```

## 水平垂直居中

```html
<div class="outer" style="width: 200px; height: 200px; background-color: red">
  <div
    class="inner"
    style="width: 20px; height: 20px; background-color: yellow"
  ></div>
</div>
```

1. `flex`方案

   1. `flex` 容器

      ```css
      .outer {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
      }
      ```

   2. `flex` 容器+项目

      ```css
      .outer {
        display: flex;
        justify-content: center; /* 水平居中 */
      }
      .inner {
        align-self: center; /* 垂直居中 */
      }
      ```

   3. `flex + margin`

      ```css
      .outer {
        display: flex;
      }

      .inner {
        margin: auto;
      }
      ```

2. 绝对定位

   1. `absolute + transform` 未知宽高

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      ```

   2. `absolute + margin` 绝对定位+负 margin 值(已知宽高)

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -10px;
        margin-left: -10px;
      }
      ```

   3. `left/right/bottom/top + margin(auto)`

      ```css
      .outer {
        position: relative;
      }

      .inner {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
      }
      ```

3. `grid`方案

   1. `grid`

      ```css
      .outer {
        display: grid;
      }

      .inner {
        justify-self: center;
        align-self: center;
      }
      ```

   2. `grid + margin`

      ```css
      .outer {
        display: grid;
      }

      .inner {
        margin: auto;
      }
      ```

# 实现类

1.  实现一个宽高自适应的正方形

    1. 利用 vw

       ```css
       .square {
         width: 10vw;
         height: 10vw;
         background: tomato;
       }
       ```

    2. 实现父元素宽高未知的内部实现正方形

       ```css
       .box {
         width: 200px;
         height: 200px;
         background-color: pink;
       }
       .square {
         width: 50%;
         /* padding的百分比数值是相对父元素width计算的*/
         padding-bottom: 50%;
         background-color: tomato;
       }
       ```

       ```html
       <div class="box">
         <div class="square"></div>
       </div>
       ```

2.  一个自适应矩形，水平垂直居中， 且宽高比为 2:1

    ```css
    .box {
      width: 200px;
      height: 400px;
      background-color: pink;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .square {
      width: 40%;
      padding-bottom: 20%;
      background-color: tomato;
    }
    ```

    ```html
    <div class="box">
      <div class="square"></div>
    </div>
    ```

3.  设计一个 9:16 的盒子 ，不限制宽度

    1. 设计 1(整屏幕设计)

       ```css
       html,
       body {
         padding: 0;
         margin: 0;
       }
       .scale {
         width: 100%;
         padding-bottom: 56.25%;
         background-color: tomato;
       }
       ```

       ```html
       <div class="scale"></div>
       ```

    2. 设计二

       ```css
       .box {
         width: 200px;
         height: 200px;
         background-color: pink;
       }
       .square {
         width: 80%;
         padding-bottom: 45%;
         background-color: tomato;
       }
       ```

       ```html
       <div class="box">
         <div class="square"></div>
       </div>
       ```

4.  三栏布局实现-flex
    概念: 页面中有三栏， 左右两栏宽度固定， 中间自适应的布局

    ```css
    html,
    body {
      /* 高度一定要加， 否则子元素不会生效 */
      height: 100%;
      padding: 0;
      margin: 0;
    }
    .box {
      display: flex;
      height: 100%;
    }
    .left {
      background-color: rgb(224, 207, 210);
      width: 200px;
    }
    .center {
      background-color: rgb(245, 183, 173);
      flex: 1;
    }
    .right {
      background-color: rgb(182, 182, 240);
      width: 220px;
    }
    ```

    ```html
    <div class="box">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    ```

5.  圣杯布局

    利用浮动+padding+负边距来实现

    ```css
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      padding-left: 220px;
      padding-right: 220px;
    }
    .left {
      float: left;
      width: 220px;
      height: 400px;
      background: pink;
      /* -100%会移动到中间center的最左边 */
      margin-left: -100%;
      position: relative;
      left: -220px;
    }
    .center {
      float: left;
      width: 100%;
      height: 500px;
      background: rgb(226, 226, 211);
    }
    .right {
      float: left;
      width: 220px;
      height: 400px;
      background: rgb(85, 202, 187);
      /* -220px会移动到中间center的最右边 */
      margin-left: -220px;
      position: relative;
      right: -220px;
    }
    ```

    ```html
    <div class="container">
      <div class="center">
        <h2>圣杯布局</h2>
      </div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
    ```

    总结: 1). 先写 middle,然后是 left 和 right, 因为要先渲染 middle; 2). left, right 需设置`position: relative`以及相应的 left, right 值; 3). 负边距的作用, left 的`margin-left: -100%`使它上移一行, 同时 right 向左移占据 left 原先位置，同理, right 的`margin-left: -100px`使它上移并靠右

6.  双飞翼布局

    利用浮动+margin+负边距

    ```html
    <div class="box">
      <div class="center">
        <div class="inner">center</div>
      </div>
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
    ```

    ```css
    * {
      padding: 0;
      margin: 0;
    }
    .box {
      min-width: 600px;
    }
    .center {
      background-color: pink;
      width: 100%;
      float: left;
      height: 500px;
    }
    .center .inner {
      /* margin一定要写里面， 其它写外面*/
      margin-left: 200px;
      margin-right: 220px;
    }
    .left {
      background-color: tomato;
      width: 200px;
      float: left;
      margin-left: -100%;
      height: 500px;
    }
    .right {
      background-color: blue;
      width: 220px;
      float: left;
      margin-left: -220px;
      height: 500px;
    }
    ```

    总结: 跟圣杯布局没多大区别，就是 middle 的实现不一样，圣杯布局是 middle+padding,双飞翼布局采用子元素+margin

7.  两列布局

    左列定宽，右列自适应

    1. 左 float, 右 margin-left

       ```html
       <body>
         <div class="left">左列定宽</div>
         <div class="right">右列自适应</div>
       </body>
       ```

       ```css
       * {
         margin: 0;
         padding: 0;
       }
       .left {
         background-color: rgb(231, 160, 160);
         float: left;
         width: 100px;
         height: 500px;
       }
       .right {
         background-color: rgb(166, 216, 166);
         height: 500px;
         /* 大于等于left的宽度 */
         margin-left: 100px;
       }
       ```

    2. 左 float, 右 overflow

       ```html
       <body>
         <div class="left">左列定宽</div>
         <div class="right">右列自适应</div>
       </body>
       ```

       ```css
       body,
       html {
         padding: 0;
         margin: 0;
         height: 100%;
       }
       .left {
         background-color: rgb(240, 188, 188);
         float: left;
         width: 100px;
         height: 100%;
       }
       .right {
         background-color: rgb(125, 185, 125);
         overflow: hidden; /*触发bfc达到自适应, 不需要添加width*/
         height: 100%;
       }
       ```

    3. flex 实现

       ```html
       <div class="box">
         <div class="left">左列定宽</div>
         <div class="right">右列自适应</div>
       </div>
       ```

       ```css
       body,
       html {
         padding: 0;
         margin: 0;
         height: 100%;
       }
       .box {
         display: flex;
         height: 100%;
       }
       .left {
         width: 200px;
         background-color: pink;
       }
       .right {
         /* width: 100%; */
         background-color: tomato;
         flex: 1;
       }
       ```

    4. 左 绝对定位, 右 margin-left
       父级设置为相对定位，left 设置绝对定位，宽 200px, right 设置 margin-left 为 200px

       ```html
       <div class="box">
         <div class="left">左列定宽</div>
         <div class="right">右列自适应</div>
       </div>
       ```

       ```css
       body,
       html {
         padding: 0;
         margin: 0;
         height: 100%;
       }
       .box {
         height: 100%;
         position: relative;
       }
       .left {
         background-color: rgb(240, 188, 188);
         position: absolute;
         left: 0;
         width: 100px;
         height: 100%;
       }
       .right {
         background-color: rgb(125, 185, 125);
         height: 100%;
         margin-left: 100px;
       }
       ```

8.  上下固定中间自适应布局实现

    1.  flex 布局实现

        ```css
        /* 一定要加height */
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100%;
        }
        .box {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .header {
          background-color: tomato;
          height: 100px;
        }
        .center {
          background-color: pink;
          flex: 1;
          overflow: auto; /* 实现中间高度超过页面出现滚动条 */
        }
        .footer {
          background-color: tomato;
          height: 100px;
        }
        ```

        ```html
        <div class="box">
          <div class="header">header</div>
          <div class="center">center</div>
          <div class="footer">footer</div>
        </div>
        ```

    2.  定位实现
        ```css
        /* 所有的width和height一定要加, html同上 */
        html,
        body {
          padding: 0;
          margin: 0;
        }
        .header {
          position: absolute;
          top: 0;
          width: 100%;
          background-color: tomato;
          height: 100px;
        }
        .center {
          position: absolute;
          width: 100%;
          top: 100px;
          bottom: 100px;
          background-color: pink;
        }
        .footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: tomato;
          height: 100px;
        }
        ```

9.  单行文本和多行文本溢出省略
    https://juejin.cn/post/6844903461209767944
    https://zhuanlan.zhihu.com/p/30707916

    1. 单行文本

       ```css
       .text {
         width: 100px;
         margin: 0 auto;
       }

       .inner {
         /*实现该元素隐藏自身溢出的效果*/
         overflow: hidden;
         /*文本不会换行*/
         white-space: nowrap;
         /*当文本溢出包含元素时，以省略号表示超出的文本，该属性依赖于overflow: hidden*/
         text-overflow: ellipsis; /* ellipsis表示省略号 */
       }
       ```

       ```html
       <div class="text">
         <div class="inner">
           前几天的美团笔试五道题就a了半道，今天下午两点通知我七点面试，总共40分钟，面试管知识面也太广了吧
         </div>
       </div>
       ```

    2. 多行文本

       1. Webkit 内核浏览器(谷歌, QQ, safari 浏览器)的 css 扩展属性实现， 存在跨浏览器兼容性问题

          ```css
          .text {
            /* 将对象作为弹性伸缩盒子模型显示 */
            display: -webkit-box;
            /* 用来限制在一个块元素显示的文本的行数 */
            -webkit-line-clamp: 3;
            /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          ```

          ```html
          <div class="text">
            浮动元素是如何定位的
            正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
          </div>
          ```

       2. 其他浏览器解决方案

          ```html
          <div class="box">
            <p class="text">
              将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为将元素的透明度设置为
            </p>
          </div>
          ```

          ```css
          .text {
            position: relative;
            line-height: 1.5em;
            /* 显示两行，  */
            height: 3em;
            overflow: hidden;
            background-color: pink;
          }
          .text:after {
            content: "...";
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 0 5px;
            background-color: pink;
          }
          ```

       3. JS 代码解决方案

10. 画一条 0.5px 的线

    https://juejin.cn/post/6844903845617729549
    https://juejin.cn/post/6844903582370643975

11. 实现各种图形
    https://segmentfault.com/a/1190000002780453

    1. CSS 如何实现一个半圆

       ```css
       /*上半圆*/
       .semi-circle {
         width: 100px;
         height: 50px;
         color: #bfa;
         border-radius: 50px 50px 0 0;
       }

       /*下半圆*/
       .semi-circle2 {
         width: 100px;
         height: 50px;
         color: #bfa;
         border-radius: 0 0 50px 50px;
       }

       /*左半圆*/
       .semi-circle3 {
         width: 50px;
         height: 100px;
         color: #bfa;
         border-radius: 50px 0 0 50px;
       }

       /*右半圆*/
       .semi-circle4 {
         width: 50px;
         height: 100px;
         color: #bfa;
         border-radius: 0 50px 50px 0;
       }
       ```

    2. CSS 实现三角形

       1. 上三角形
          ```css
          .triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 250px 250px 250px 250px;
            border-color: red transparent transparent transparent;
          }
          ```
       2. 右上三角形

          ```css
          .triangle {
            width: 0;
            height: 0;
            border-top: 100px solid red;
            border-right: 100px solid transparent;
          }
          ```

    3. 扇形

       ```css
       .circle {
         width: 50px;
         height: 50px;
         border-radius: 50px 0 0 0;
         background-color: tomato;
       }
       ```

    4. 圆形

       ```css
       .circle {
         width: 100px;
         height: 100px;
         border-radius: 50px;
         background-color: tomato;
       }
       ```

12. 轮播图

13. 实现下拉菜单

```css
.box {
  position: relative;
  display: inline-block;
}
/* 下拉财当按钮样式 */
.dropBtn {
  background-color: #2f8532;
  color: white;
  width: 100px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
}
/* 下拉内容，默认隐藏 */
.content {
  display: none;
  position: absolute;
}
/* 下拉菜单的链接样式 */
.content a {
  display: block;

  width: 100px;
  box-sizing: border-box;
  color: white;
  text-decoration: none;
  background-color: #5da35f;
  padding: 10px 20px;
}
/* 鼠标移动上去后显示下拉菜单 */
.box:hover .content {
  display: block;
}
/* 选中下拉菜单样式修改 */
.content a:hover {
  background-color: #a9daab;
}
```

```html
<div class="box">
  <button class="dropBtn">下拉菜单</button>
  <div class="content">
    <a href="">菜单1</a>
    <a href="">菜单2</a>
    <a href="">菜单3</a>
  </div>
</div>
<div class="box">
  <button class="dropBtn">下拉菜单</button>
  <div class="content">
    <a href="">菜单1</a>
    <a href="">菜单2</a>
    <a href="">菜单3</a>
  </div>
</div>
```

# 原知识点

21. 两栏布局的方法

(1). 方法一: 浮动布局

```
div {
  height: 500px;
}

#aside {
  width: 300px;
  background-color: yellow;
  float: left;
}

#main {
  background-color: aqua;
  margin-left: 300px;
}

<div id="aside"></div>
<div id="main"></div>
```

总结: 左侧栏固定宽度向左浮动，右侧主要内容用`margin-left`留出左侧栏的宽度，默认宽度为 auto，自动填满剩下的宽度

(2). 浮动布局+负外边距(双飞翼布局的两栏版)

```
div{
  height:500px;
}
#aside{
  width:300px;
  background-color:yellow;
  float:left;
  margin-right:-100%;
}
#main{
  width:100%;
  float:left;
}
#content{
  margin-left:300px;
  background-color:aqua;
}


<div id = "aside"></div>
<div id = "main">
  <div id = "content"></div>
</div>
```

总结: 左侧固定栏指定一个右侧的 100%的负外边距，为整个屏幕的宽度，这就使得 main 的最左侧与屏幕的最左侧对齐; 此时 main 的宽度是 100%所以需要为其子内容指定左外边距

(3). 绝对定位

```
#aside {
  position: absolute;
  left: 0;
  width: 200px;
  background-color: #bfa;
}

#main {
  margin-left: 200px;
  background-color: yellow;
}

<div id="aside"></div>
<div id="main">
  <div id="content"></div>
</div>
```

(4). flex

```
#container{
    display:flex;
}
#aside{
    flex:0 0 200px;
}
#main{
    flex: 1 1;
}

<div id="container">
    <div id = "aside"></div>
    <div id = "main"></div>
</div>
```

22. 三栏布局

(1). 绝对定位

```
html,body{
  margin:0;
  padding:0;
  height:100%;
}
div{
  height:100%;
}
#left{
  width:200px;
  background-color:yellow;
  position:absolute;
  top:0;
  left:0;
}
#main{
  background-color:aqua;
  margin-left:200px;
  margin-right:300px;
}
#right{
  width:300px;
  background-color:orange;
  position:absolute;
  top:0;
  right:0;
}


<div id = "left"></div>
<div id = "main"></div>
<div id = "right"></div>
```

总结: 左侧栏和右侧栏分别用绝对定位固定在左侧和右侧，中间栏利用 margin-left 和 margin-right 空出左右栏的位置

(2). 浮动+负外边距

```
html,body{
  margin:0;
  padding:0;
  height:100%;
}
div{
  height:100%;
}
#left{
  width:200px;
  background-color:yellow;
  float:left;
  margin-left:-100%;
}
#main{
  background-color:aqua;
  width:100%;
  float:left;
}
#right{
  width:300px;
  background-color:orange;
  float:left;
  margin-left:-300px;
}

#content{
  margin-left:200px;
  margin-right:300px;
}

<div id = "main">
  <div id="content"></div>
</div>
<div id = "left">
</div>

<div id = "right">
</div>

```

总结: 1). 中间栏的 div 写在最前面,宽度为 100%; 2). 左侧栏左浮动，默认情况下由于前面的元素宽度为 100%，因此左侧栏是在中间栏下方，为左侧栏设置`margin-left`为-100%,即整个屏幕的宽度为 100%，这就令左侧栏跑到中间栏的最左侧; 3). 右侧栏也是左浮动，此时默认情况下也是在中间栏下方一行的，同样利用`margin-left: -300px`,即自身的宽度，使其到上一行最右侧的位置; 4). 中间栏的内容部分则需要利用分别等于左右侧栏宽度的外边距来空出他们的位置

(3). 浮动定位法

```
*{
  margin:0;
  padding:0;
  height:100%;
}
#left{
  width:300px;
  background-color:yellow;
  float:left;
}
#right{
  width:200px;
  background-color:orange;
  float:right;
}
#main{
  background-color:aqua;
  margin-left:300px;
  margin-right:200px;
}

<!--左右侧栏的位置可以更改-->
<div id="left"></div>
<div id="right"></div>
<!--中间栏放最后-->
<div id="main"></div>
```

总结: 分别另左侧栏和右侧栏向左和向右浮动，中间栏放在最后，再利用左右外边距空出左右栏的位置即可

(4). flexbox

```
div{
  display:-webkit-flex;
  display:flex;

  margin:0;
  padding:0;
  height:800px;
}
article{
  flex:1 1;
  order:2;
  background-color:yellow;
}

nav{
  flex:0 0 200px;
  order:1;
  background-color:blue;
}
aside{
  flex:0 0 200px;
  order:3;
  background-color:aqua;
}

<div>
  <article></article>
  <nav></nav>
  <aside></aside>
</div>
```

25. CSS 实现一个自适应的正方形

```
.box {
  width: 200px;
  height: 200px;
}

CSS3 vw 单位，vw是相对于视口的宽度。视口被均分为100单位的vw。1vw = 1% viewport width
.box{
  width: 20%;//width:20vw也可以
  height: 20vw;
  background: pink;
}

设置盒子的padding-bottom样式，让盒子的padding-bottom和盒子的宽度一样，同时设置heigh = 0px；
{
  width: 20%;
  /* 设置height为0 ，避免盒子被内容撑开多余的高度 */
  height: 0px;
  /* 把盒子的高撑开，
     和width设置同样的固定的宽度或者百分比 ，
     百分比相对的是父元素盒子的宽度 */
  padding-bottom: 20%

}
```

26. 重排和重绘

    1.HTML 被 HTML 解析器解析成 DOM 树；
    2.CSS 被 CSS 解析器解析成 CSSOM 树； 3.结合 DOM 树和 CSSOM 树，生成一棵渲染树(Render Tree)，这一过程称为 Attachment； 4.生成布局(flow)，浏览器在屏幕上“画”出渲染树中的所有节点； 5.将布局绘制(paint)在屏幕上，显示出整个页面。
    第四步和第五步是最耗时的部分，这两步合起来，就是我们通常所说的渲染。

重排: 当 DOM 的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

重排也叫回流，简单的说就是重新生成布局，重新排列元素。

页面初始渲染，这是开销最大的一次重排
添加/删除可见的 DOM 元素
改变元素位置
改变元素尺寸，比如边距、填充、边框、宽度和高度等
改变元素内容，比如文字数量，图片大小等
改变元素字体大小
改变浏览器窗口尺寸，比如 resize 事件发生时
激活 CSS 伪类（例如：:hover）
设置 style 属性的值，因为通过设置 style 属性改变结点样式的话，每一次设置都会触发一次 reflow
查询某些属性或调用某些计算方法：offsetWidth、offsetHeight 等，除此之外，当我们调用 getComputedStyle 方法，或者 IE 里的 currentStyle 时，也会触发重排，原理是一样的，都为求一个“即时性”和“准确性”。

重绘: 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

如何减少重绘和重排

    (1). CSS

      使用transform代替top;
      使用visibility替换display: none，因为前者只会引起重绘，后者会引发回流
      避免使用table布局，可能很小的一个改动会造成整个table的重新布局
      尽可能在DOM树的最末端改变class，回流是不可避免的，但是可以减少影响，尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点；
      将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘而不是回流

    (2). JavaScript

      (1).避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
      (2).避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
      (3).避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
      (4).对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

27. script 标签的 async 和 defer 的区别

都是提示浏览器先下载外部文件延迟执行，但是 defer 是顺序执行，async 是乱序的只要保证两个文件之间互相不依赖

28. CSS 实现一个扇形

```
.outer{

   width:0;

   height:0;

   border-width:100px;

   border-style:solid;

   border-color: red transparent transparent transparent;

   border-radius:50%;

}
```

29. img 的 title 和 alt 属性

title: 全局属性 作用是提供建议性的信息，通常是鼠标滑动到元素上是显示
alt: 特有属性 图片内容的等价描述，用于图片无法加载时显示或读屏器阅读图片（帮助盲人了解图片内容）。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。
