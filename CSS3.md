1. 边框
# box-shadow: h-shadow v-shadow blur spread color inset;
box-shaow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 

2. 圆角
# border-radius: 用于创建圆角
四个border-top-left-radius | border-top-right-radius | border-bottom-right-radius | border-bottom-left-radius 属性的缩写

四个值： 左上 右上 右下 左下
三个值： 左上 右上和左下 右下
两个值： 左上与右下  右上与左下
一个值： 四个圆角值相同

3. 背景
# border-image: 使用图像创建一个边框
border-image: source slice width outset repeat|initial|inherit;

4. 渐变
CSS3定义了两种类型的渐变：线性渐变 和 径向渐变（由它的中心定义）

线性渐变
# background-image: linear-gradient(direction, color-stop1, color-stop2, ...);

径向渐变
# background-image: radial-gradient(shape size at position, start-color, ..., last-color);

4. 文本效果
hanging-punctuation	规定标点字符是否位于线框之外。	
punctuation-trim	规定是否对标点字符进行修剪。	
text-align-last	设置如何对齐最后一行或紧挨着强制换行符之前的行。	
text-emphasis	向元素的文本应用重点标记以及重点标记的前景色。	
text-justify	规定当 text-align 设置为 "justify" 时所使用的对齐方法。
text-outline	规定文本的轮廓。	
text-overflow	规定当文本溢出包含元素时发生的事情。	
text-shadow	向文本添加阴影。	
text-wrap	规定文本的换行规则。	
word-break	规定非中日韩文本的换行规则。	
word-wrap	允许对长的不可分割的单词进行分割并换行到下一行。

5. 字体
# @font-face
例如
@font-face
{
    font-family: myFirstFont;  //规定字体的名称
    src: url(sansation_light.woff);   //定义字体文件的URL
}
div
{
    font-family:myFirstFont;
}

6. 2D转换 
# transform
translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动
rotate()方法，在一个给定度数顺时针旋转的元素

scale()方法，该元素增加或减少的大小，取决于宽度(X轴)和高度(Y轴)的参数
scale(2,3)表示转变宽度为原来的大小的2倍，和其原始大小3倍的高度
skew()方法
matrix()方法