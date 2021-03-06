(建议收藏)原生 JS 灵魂之问, 请问你能接得住几个？(上)
https://juejin.cn/post/6844903974378668039

(建议精读)原生 JS 灵魂之问(中)，检验自己是否真的熟悉 JavaScript？
https://juejin.cn/post/6844903986479251464

(2.4w 字,建议收藏)😇 原生 JS 灵魂之问(下), 冲刺 🚀 进阶最后一公里(附个人成长经验分享)
https://juejin.cn/post/6844904004007247880

# 有哪些内置对象？

Array BigInt Boolean Date Function Map Math null Number Object Promise Set
WeakMap WeakSet

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是在说全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

1. 值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

2. 函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

3. 基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 Object、Function、Boolean、Symbol、Error 等

4. 数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 Number、Math、Date

5. 字符串，用来表示和操作字符串的对象。

例如 String、RegExp

6. 可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array

7. 使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 Map、Set、WeakMap、WeakSet

8. 矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

9. 结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

10. 控制抽象对象

例如 Promise、Generator 等

11. 反射

例如 Reflect、Proxy

12. 国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

13. WebAssembly
    一种可以使用非 JavaScript 编程语言编写代码并且能在浏览器上运行的技术方案
    https://zhuanlan.zhihu.com/p/158042212
14. 其他

例如 arguments

# 全局对象是什么?

1. 浏览器中的 window 对象
   任何全局变量或者全局函数都可以通过 window 的属性来访问
2. node.js 环境下的 global 对象

# Array 数组有哪些方法？

- concat
  用于合并两个或多个数组。返回新数组  
  `const arr3 = arr1.concat(arr2)`

- entries
  返回一个新的 Array Iterator 对象，该对象包含数组中每个索引键/值对
  `const iterator1 = array1.entries();`

- every
  测试一个数组内的所有元素是否能通过某个指定函数的测试，返回一个布尔值
  every 方法为数组中的每个元素执行一次 callback 函数，callback 在被调用时可传入三个参数：元素值、元素的索引、原数组
  `[12, 5, 8, 130, 44].every((element, index,array) => element >= 10); // false`

- filter
  创建一个新数组，其包含通过所提供的函数实现的测试的所有元素
  callback 在被调用时可传入三个参数：元素值、元素的索引、原数组
  `[12, 5, 8, 130, 44].filter((element, index,array) => element >= 10); // [12,130,44]`

- find
  返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined
  callback 在被调用时可传入三个参数：当前元素、当前元素的索引、原数组
  `[12, 5, 8, 130, 44].find((element, index,array) => element >= 10); // 12`

- findIndex
  返回数组中满足提供的测试函数的第一个元素的索引，没有则返回-1
  callback 在被调用时可传入三个参数：当前元素、当前元素的索引、原数组
  `[12, 5, 8, 130, 44].findIndex((element, index,array) => element >= 10); // 0`

- flat
  按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```javascript
//默认遍历一层
var arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

flat()方法会移除数组中的空项

```
var arr4 = [1, 2, , 4, 5];
arr4.flat();  // [1, 2, 4, 5]
```

- forEach
  对数组的每个元素执行一次给定的函数
  callback 在被调用时可传入三个参数：当前元素、当前元素的索引、原数组
  `array1.forEach(element => console.log(element));`

- from
  Array.from(arrLike, callback(item, index, array))
  `console.log(Array.from([1, 2, 3], x => x + x)); // Array [2, 4, 6]
  可用于 String、Set、Map、类数组对象(arguments)中生成数组

```javascript
function f() {
  return Array.from(arguments);
}
```

- includes 判断一个数组是否包含一个指定的值，如果包含则返回 true,否则返回 false
  `includes(valueToFind, fromIndex)`  
  valueToFind 表示需要查找的元素值
  fromIndex 表示需要开始查找位置的索引
  `['a', 'b', 'c'].includes('c', 3); // false`

- indexOf
  返回在数组中可以找到一个给定元素的第一个索引，如果不存在则返回-1
  `[2, 5, 9].indexOf(2); // 0`

- lastIndexOf
  返回指定元素在数组中的最后一个的索引

- isArray
  用于确定传递的值是否是一个 Array, 返回 true 或 false

- join
  将一个数组(或一个类数组对象)的所有元素连接成一个字符串并返回这个字符串。

```js
var a = ["Wind", "Rain", "Fire"];
var myVar1 = a.join(); // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(", "); // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(" + "); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join(""); // myVar4的值变为"WindRainFire"
```

- keys
  返回一个包含数组中每个索引键的 Array Iterator 对象

```javascript
const array1 = ["a", "b", "c"];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key); // 0 1 2
}
```

- map
  创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
  callback 在被调用时可传入三个参数：当前元素、当前元素的索引、原数组

- pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
- push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
- shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
- unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

- reduce
  方法对数组中的每个元素执行一个 reducer 函数，将其结果汇总为单个返回值。
  callback 参数分别表示 累计器、当前值、当前索引、数组
  initialValue：作为第一次调用 callback 函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。

```javascript
[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
initialValue);
```

- reverse
  将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

`[1, 2, 3].reverse() //[3,2,1]`

- slice
  返回一个新的数组对象，对象是由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。

- some
  测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
  `[12, 5, 8, 1, 4].some(x => x > 10); // true`

- sort
  对数组的元素进行排序，并返回数组
  `[4, 2, 5, 1, 3].sort((a, b) => a - b); // [1, 2, 3, 4, 5]`

- splice
  通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
  start, deleteCount, item1, item2, item3
  参数分别表示 指定要修改的开始位置; 要移除的数组元素的个数; 要添加进数组的元素，从 start 位置开始

- toString
  返回一个字符串，表示指定的数组及其元素

- values
  返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

# String 有哪些方法

- charAt() 从一个字符串中返回指定的字符
- charCodeAt() 获取 Unicode 编码
- concat() 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回
- endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。

```js
"numbers".endsWith("s"); // true
```

- includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
- indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。

# JS 中类型转换有哪几种？

- 转换成数字
- 转换成布尔值
- 转换成字符串

## 其他值转换为字符串

null 转为 'null'
undefined 转为 'undefined'
Boolean true 转为'true' false 转为'false'
Number 直接转换
Symbol 直接转换

## 其他值转为数字值

转为 0 的有 5 种， '', [], null, '0', false

Undefiend 转为 NaN
null 转为 0
boolean true 转为 1 ， false 转为 0
String 数字值直接转为数字 包含非数字值转换为 NaN  
[] -> 0, '' -> 0
除了数组的引用类型 -> NaN

可以用 parseInt() Number()

```js
Number(""); // 0
Number([]); // 0
Number([1]); // 1
Number([1, 2, 3]); // NaN
parseInt([1, 2, 3]); // 1
```

## 其他值转为布尔值

转为 false 的有 7 种

undefined 转为 false
null 转为 false
false 转为 false
+0 -0 NaN 转为 false
''转为 false

# == 和 === 区别

https://segmentfault.com/a/1190000022298822 冴羽

1. == 是非严格意义上的相等，会触发隐式转换

   两边类型相同，比较大小
   两边类型不同，根据下方表格，再进一步进行比较。

   Null == Undefined ->true
   String == Number ->先将 String 转为 Number，在比较大小
   Boolean == Number ->现将 Boolean 转为 Number，在进行比较
   Object == String，Number，Symbol -> Object 转化为原始类型

   1. 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而 true 转换为 1；

   2. 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值

   3. 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较

   4. 如果 x 与 y 是同一类型：

      1. x 是 Undefined，返回 true
      2. x 是 Null，返回 true
      3. x 是数字：

         1. x 是 NaN，返回 false
         2. y 是 NaN，返回 false
         3. x 与 y 相等，返回 true
         4. x 是+0，y 是-0，返回 true
         5. x 是-0，y 是+0，返回 true
         6. 返回 false

      4. x 是字符串，完全相等返回 true,否则返回 false
      5. x 是布尔值，x 和 y 都是 true 或者 false，返回 true，否则返回 false
      6. x 和 y 指向同一个对象，返回 true，否则返回 false

   5. x 是 null 并且 y 是 undefined，返回 true
   6. x 是 undefined 并且 y 是 null，返回 true
   7. x 是数字，y 是字符串，判断 x == ToNumber(y)
   8. x 是字符串，y 是数字，判断 ToNumber(x) == y
   9. x 是布尔值，判断 ToNumber(x) == y
   10. y 是布尔值，判断 x ==ToNumber(y)
   11. x 不是字符串或者数字，y 是对象，判断 x == ToPrimitive(y)
   12. x 是对象，y 不是字符串或者数字，判断 ToPrimitive(x) == y
   13. 返回 false

   ```js
   [] == ![]  // true
   // 空数组转为数字为 0 ， 除了数组外的引用类型全部为 NaN
   // [] == ![] -> [] == false -> [] == 0 -> 0 == 0 -> true
   {} == !{}  //false
   // {} 转数字是NaN
   // {} == !{} -> {} == false -> {} == 0 -> NaN == 0 -> false
   [] == []  //false
   {} == {}  //false
   ```

2. === 是严格意义上的相等，会比较两边的数据类型和值大小

   数据类型不同返回 false  
   数据类型相同，但值大小不同，返回 false

   - 缺点

     1. NaN(非数字)并不严格等于任何其他值,包括 NaN 自己

     ```js
     NaN === NaN; //false
     NaN === 1; //false
     ```

     2. 严格相等运算符不能将 `-0` 与 `+0` 区分开

     ```js
     -0 === 0; //true
     ```

3. Object.is() 用来比较两个值是否严格相等，与严格比较运算符(===)的行为基本一致

   - 不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身。

     ```js
     +0 === -0; //true
     NaN === NaN; // false

     Object.is(+0, -0); // false
     Object.is(NaN, NaN); // true
     ```

# 对象转基本数据类型

1. 调用内置的 Symbol.toPrimitive()方法
2. 调用 valueOf()
3. 调用 toString()
4. 如果都没有返回原始类型，则报错

```js
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return "5";
  },
  [Symbol.toPrimitive]() {
    return 6;
  },
};
console.log(obj + 1); // 输出7,  内置的toPrimitive没有的话调用valueOf输出5， 最后输出'51'
```

# 基本数据类型(原始数据类型)和引用数据类型

7 种基本数据类型：Number、String、Boolean、Null、Undefined、Symbol、BigInt
多种引用数据类型：Object、Array、Date、Function、RegExp、Error、Arguments 等

- Number 还包括一些特殊值(-Infinity、+Infinity、NaN)

基本数据类型的数据直接存储在栈中；
引用数据类型的数据存储在堆中，在栈中保存数据的引用地址（即指针），这个引用地址指向的是对应的数据，以便快速查找到堆内存中的对象

# BigInt 介绍

JS 所有数字都保存成 64 位浮点数，有两个限制

1. 数值的精度只能到 53 个二进制位(相当于 16 个十进制位)，超过则无法保持精度
2. 大于或等于 2 的 1024 次方的数值，JS 无法表示，会返回 Infinity

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示

- 必须添加后缀 n
- typeof 运算符对于 BigInt 类型的数据返回 bigint
- BigInt 与普通整数是两种值，它们之间并不相等 `42n === 42 // false`
- BigInt 可以转为布尔值、数值和字符串类型

```javascript
Boolean(0n); // false
Boolean(1n); // true
Number(1n); // 1
String(1n); // "1"
```

# Symbol 介绍

Symbol 表示独一无二的值
Symbol 值通过 Symbol 函数生成。对象的属性名可以有两种类型
一是原来就有的字符串
二是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

- typeof 运算符对于 Symbol 类型的数据返回"symbol"
- Symbol 值不能与其他类型的值进行运算，可以显示转为字符串，可以转为布尔值，但是不能转为数值

```js
let s = Symbol();
// Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示以区分
let s1 = Symbol("foo");
let s2 = Symbol("bar");
```

# 判断数据类型的方法

1. typeof
   返回一个字符串，表示未经计算的操作数的类型
   可以判断 undefined、Boolean、Number、String、function、Symbol、BigInt

- 基本数据类型除 null 外都转为对应的基本数据类型

```javascript
typeof 37 === "number";
typeof Infinity === "number";
typeof NaN === "number";

typeof "" === "string";
typeof true === "boolean";
typeof Symbol() === "symbol";
typeof undefined === "undefined";
typeof 3n === "bigint"; // BigInt类型
```

- typeof null // 'object'
  原因: 在 JS 最初的实现中，JS 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0.
  由于 null 代表的是空指针(大多数平台下值为 0x00),因此 null 的类型标签是 0，和对象的类型标签相同。

        因为在JavaScript中，不同的对象都是使用二进制存储的，如果二进制前三位都是0的话，系统会判断为是Object类型，而null的二进制全是0，自然也就判断为Object

- 除 Function 外的所有构造函数的类型都是'object'，new Function 返回 'function'

```javascript
var str = new String("String");
var num = new Number(100);

typeof str; // 返回 'object'
typeof num; // 返回 'object'

typeof new Function(); // 返回 'function'
```

2. instanceof
   只能判断对象是否存在于目标对象的原型链上，不一定能获取对象的具体类型

不适用判断原始类型的值，只能用于判断对象是否从属关系

```javascript
[] instanceof Array; // true
[] instanceof Object; // true

function Person() {}
const person = new Person();

person instanceof Person; // true
person instanceof Object; // true
```

3. constructor
   每一个实例对象都可通过 constructor 来访问它的构造函数
   基本能判断所有类型，除了 null 和 undefined
   undefined 和 null 是无效的对象，因此是没有 constructor 属性的,会报错.

```javascript
"5".__proto__.constructor === String; // true

undefined.__proto__.constructor; // Cannot read property '__proto__' of undefined

null.__proto__.constructor; // Cannot read property '__proto__' of undefined
```

4. Object.prototype.toString.call()
   返回对象的类型字符串，可用来判断一个值的类型

```javascript
Object.prototype.toString.call("5"); // [object String]
Object.prototype.toString.call(5); // [object Number]
Object.prototype.toString.call([5]); // [object Array]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
Object.prototype.toString.call(new Error()); // [object Error]

class Class1 {}
Object.prototype.toString.call(new Class1()); // 默认情况类的[[class]]返回[object Object]
```

## 内部属性[[class]]是什么?

所有对象都包含一个内部属性[[class]]
我们不能直接访问这个属性，但是我们可以通过一种方法访问`Object.prototype.toString.call(...)`
例如`Object.prototype.toString.call([1,2,3])`实际上就是调用了原生函数 Array 内部的[[class]]属性

1. 如果直接调用 toString()会发生什么?

```js
{'a':1}.toString() // [object Object]
[1,2,3].toString() // 1,2,3
function a(){}.toString() // function a(){}
123..toString() // 123 , 只写一个小数点会被当成小数点，所以再写一个点才代表方法调用
true.toString() // true
```

只有普通对象`{'a': 1}`返回了类型
因为普通对象直接调用了顶级原型 Object 上的 toString 方法
而数组、函数以及这些基本包装对象继承 Object 的同时，重写了 toString()方法，在查找 toString 方法的时候，优先找自己原型链上的方法
所以必须使用`Object.prototype.toString.call()`进行类型检测

# `null`和`undefined`，怎么判断是`null`

    `null`: 表示一个值被定义了，定义为"空值";

    `undefined`: 表示根本不存在定义;

    ```js
    let exp = undefined
    if (typeof (exp) === 'undefined') console.log('undefined');

    exp = null
    if (!exp) console.log('null');
    ```

1. null 表示"没有对象"，即该处不应该有值。
   典型用法是：
   （1） 作为函数的参数，表示该函数的参数不是对象。

   （2） 作为对象原型链的终点。

   ```js
   Object.getPrototypeOf(Object.prototype);
   // null
   ```

2. undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。
   典型用法是：
   （1）变量被声明了，但没有赋值时，就等于 undefined。

   （2) 调用函数时，应该提供的参数没有提供，该参数等于 undefined。

   （3）对象没有赋值的属性，该属性的值为 undefined。

   （4）函数没有返回值时，默认返回 undefined。

   ```js
   var i;
   i; // undefined

   function f(x) {
     console.log(x);
   }
   f(); // undefined

   var o = new Object();
   o.p; // undefined

   var x = f();
   x; // undefined
   ```

3. 如何判断 undefined
   https://juejin.cn/post/6844903792270393358

# js 获取原型的方法

`p.__proto__`
`p.constructor`
`Object.getPrototypeOf(p)`

# 类数组与数组的区别和转换

```js
document.getElementsByTagName, document.querySelectorAll, function 中的 arguments

[...arguments]
arguments.slice()
Array.from(arrayLike)

Array.apply(null, arrayLike)
Array.prototype.concat.apply([], arrayLike)
```

# toString 和 valueOf 的使用

`toString` 和 `valueOf` 几乎都是在出现操作符(+-\*/==><)时被调用(隐式转换)

https://juejin.cn/post/6873215243804213262

1.  toString

    返回一个表示该对象的字符串

    1.  总结
        `对象.toString()`就是类型检测， `数组/函数/字符串.toString()`就是转为字符串；
        在使用操作符的时候，如果其中一边为对象，则会先调用 toString 方法，也就是隐式转换;

        ```js
        //
        {}.valueOf() // {}
        [].valueOf() // []
        {}.toString() // 报错, {}被解析成一个空的block，没有被解析成一个对象
        [].toString() // ""
        [1, 2, 3].toString() // '1, 2, 3'

        ({}).toString() // [object Object] , 加(), js引擎就知道里面是js表达式
        ({name: 'six', age: 18}).toString() // [object Object]
        (function() {}).toString() // 'function() {}'
        [] + {} // [object Object], []转字符串为空, {}转字符串为[object Object]
        {} + [] // 0  {}会被识别为代码块，被忽略, [].toString()返回'', +''结果为0
        ```

    2.  什么时候会自动调用?
        使用操作符的时候，如果其中一边为对象，则会先调用 toString 方法，也就是隐式转换，然后再进行操作

        ```js
        let c = [1, 2, 3];

        let d = { a: 2 };
        Object.prototype.toString = function () {
          console.log("Object");
        };
        Array.prototype.toString = function () {
          console.log("Array");
          return this.join(","); // 返回 toString 的默认值（下面测试）
        };
        console.log(2 + 1); // 3
        console.log("s"); // 's'
        console.log("s" + 2); // 's2'
        console.log(c < 2); // false (一次 => 'Array')
        console.log(c + c); // "1,2,31,2,3" (两次 => 'Array')
        console.log(d > d); // false (两次 => 'Object')
        ```

2.  valueOf
    返回当前对象的原始值

    ```js
    let c = [1, 2, 3];
    let d = { a: 2 };

    console.log(c.valueOf()); // [1, 2, 3]
    console.log(d.valueOf()); // {a:2}
    ```

总结:

1. 在进行对象转换时，将优先调用 toString 方法，如若没有重写 toString，将调用 valueOf 方法；如果两个方法都没有重写，则按 Object 的 toString 输出。
2. 在进行强转字符串类型时，将优先调用 toString 方法，强转为数字时优先调用 valueOf。
3. 使用运算操作符，valueOf 的优先级高于 toString。

# || 和 && 操作符

1. ||
   左边的值为 null 或者 undefined，返回右边的值， 否则返回左边
2. &&
   左边的值为转化后为 false 时，返回左边的值， 否则返回右边

# new 原理

https://juejin.cn/post/6844903789070123021

1. 创建了一个全新的对象。
2. 这个对象会被执行[[Prototype]]（也就是**proto**）
3. 生成的新对象会绑定到函数调用的 this。
4. 通过 new 创建的每个对象将最终被[[Prototype]]链接到这个函数的 prototype 对象上。
5. 如果函数没有返回对象类型 Object(包含 Functoin, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用会自动返回这个新的对象。

```javascript
    function myNew(func, ...args) {
  // 1. 判断方法体
  if (typeof func !== 'function') {
    throw '第一个参数必须是方法体';
  }

  // 2. 创建新对象
  const obj = {};

  // 3. 这个对象的 __proto__ 指向 func 这个类的原型对象
  // 即实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性
  // const me = Object.create(person); // me.__proto__ === person
  obj.__proto__ = Object.create(func.prototype);

  // 为了兼容 IE 可以让步骤 2 和 步骤 3 合并
  // const obj = Object.create(func.prototype);

  // 4. 通过 apply 绑定 this 执行并且获取运行后的结果
  let result = func.apply(obj, args);

  // 5. 如果构造函数返回的结果是引用数据类型，则返回运行后的结果
  // 否则返回新创建的 obj
  const isObject = typeof result === 'object' && result !== null;
  const isFunction = typeof result === 'function';
  return isObject || isFunction ? result : obj;
  // 或者
  // return result instanceof Object ? result:obj
}

// 测试
function Person(name) {
  this.name = name;
  return function() { // 用来测试第 5 点
    console.log('返回引用数据类型');
  };
}
// 用来测试第 2 点和第 3 点
Person.prototype.sayName = function() {
  console.log(`My name is ${this.name}`);
}
const me = myNew(Person, 'jsliang'); // 用来测试第 4 点
me.sayName(); // My name is jsliang
console.log(me); // Person {name: 'jsliang'}

// 用来测试第 1 点
// const you = myNew({ name: 'jsliang' }, 'jsliang'); // 报错：第一个参数必须是方法体

function myNew(func, ...args) {
  if (typeof func !== 'function') {
    throw new TypeError)
  }

  const obj = Object.create(func.prototype)

  let result = func.apply(obj, args)

  let isObject = typeof result === 'object' && result !== null
  let isFunction = typeof result === 'function'

  return isObject || isFunction ? result : obj
}
```

# bind、call、apply 的区别

bind
call
apply
手写详见手撕代码

# 如何正确判断 this? (5 中情况)

详见霖呆呆
https://juejin.cn/post/6844904083707396109

1. 默认绑定
   非严格模式下 this 指向全局对象， 严格模式下 this 会绑定到 undefined
2. 隐式绑定
   this 永远指向最后调用它的那个对象

   隐式丢失问题

   1. 使用另一个变量给函数取别名 - 会指向调用者
   2. 将函数作为参数传递时会被隐式赋值，回调函数丢失 this 绑定 - 会指向 window

3. 显式绑定
4. new 绑定
   使用 new 函数创建的对象和字面量形式创建出来的对象没有太大区别，不涉及箭头函数
5. 箭头函数
   this 的指向由外层作用域决定

# 闭包及其作用？

## 解释一

闭包： 能够访问自由变量的函数 (本质： 当前环境中存在指向父级作用域的引用)
自由变量： 指在函数中使用的，既不是函数参数也不是函数的局部变量的变量

闭包 = 函数 + 函数能够访问的自由变量

1. 从理论角度：所有的函数都可以看做是闭包。因为函数中访问访问全局变量就相当于是在访问自由变量。
2. 从实践角度： 以下函数才算是闭包
   (1) 即使创建它的上下文已经销毁，它仍然存在(内部函数从父函数中返回)
   (2) 在代码中引用了自由变量

作用：

1.  可以读取函数内部的变量
2.  让这些变量始终保持在内存中

```js
function f1() {
  var n = 999
  nAdd = function() {
    n + =1 // n就是自由变量
  }
  function f2() {
    alert(n);
  }
  return f2;
}
var result = f1();
result(); // 999
nAdd();
result(); // 1000
```

缺点：

1. 闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，容易造成内存泄漏
2. 闭包会在父函数外部，改变父函数内部变量的值

应用场景：模块化与柯理化

1. 模块封装
   在各模块规范出现之前，都是用这样的方式防止变量污染全局。

```js
var Yideng = (function () {
  // 这样声明为模块私有变量，外界无法直接访问
  var foo = 0;

  function Yideng() {}
  Yideng.prototype.bar = function bar() {
    return foo;
  };
  return Yideng;
})();
```

2. 在循环中创建闭包

## 解释二

1. MDN 概念

   1. 一个函数和对其周围状态(词法环境)的引用捆绑在一起，这样的组合就是闭包
   2. 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域
      在 JS 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来

2. 示例

```js
function foo() {
  var name = "foo";
  function bar() {
    console.log("bar", name);
  }
  return bar;
}
var fn = foo();
fn();
```

## 解释三

1. 维基百科概念
   1. 闭包在实现上是一个结构体，它存储了一个函数和一个关联的环境(相当于一个符号查找表)
   2. 闭包和函数最大的区别就是，当捕捉闭包的时候，它的自由变量会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行

# 内存泄漏

- 概念： 指由于疏忽或错误造成程序未能释放已经不再使用的内存
- 哪些情况会引起内存泄露？

  1. 意外的全局变量
  2. 被遗忘的计时器或回调函数
  3. 闭包

     ```js
     function foo() {
       var name = "foo";
       var age = 18;

       function bar() {
         console.log(name);
         console.log(age);
       }
       return bar;
     }
     var fn = foo(); // bar函数不会被销毁
     fn();

     fn = null; // 解决内存泄漏
     ```

  4. 没有清理的 DOM 元素引用
  5. 循环引用

# `prototype` 和`__proto__`的关系与区别(记住图就可以)

https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg

https://github.com/LiangJunrong/document-library/blob/master/%E7%B3%BB%E5%88%97-%E9%9D%A2%E8%AF%95%E8%B5%84%E6%96%99/JavaScript/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.md

等式 1：person.constructor === Person 实例的 constructor 指向构造函数
等式 2：Person.prototype.constructor === Person 构造函数原型的 constructor 指向构造函数

1. Object 和 Function 都是 Js 自带的函数对象

   ```js
   typeof Object; // function
   typeof Function; // function
   ```

2. 题目

   ```js
   var F = function () {};

   Object.prototype.a = function () {
     console.log("a");
   };

   Function.prototype.b = function () {
     console.log("b");
   };

   var f = new F();

   f.a(); // 输出啥？
   f.b(); // 输出啥？

   F.a(); // 输出啥？
   F.b(); // 输出啥？


   f.a() -> a
   f.b() -> f.b is not a function

   F.a() -> a
   F.b() -> b
   ```

# 封装

https://juejin.cn/post/6844904094948130824

## ES6 之前的封装

1. 私有属性、公有属性、静态属性概念

- 私有属性和方法：只能在构造函数内访问，不能被外部所访问(即在构造函数内使用 var 声明的属性)
- 公有属性和方法：对象外可以访问到对象内的属性和方法(在构造函数内使用 this 设置，或者设置在构造函数原型对象上)
- 静态属性和方法：定义在构造函数的方法(比如 Cat.\*\*\*) 不需要实例就可以调用，实例调用不到

## ES6 之后的封装

1. class 的基本概念

- 当使用 class 的时候，它会默认调用 constructor 这个函数,来接收一些参数，并构造出一个新的实例对象并返回
- 当 class 没有定义 constructor, 也会隐式生成一个 constructor 方法

2. class 中几种定义属性的区别

- 在 constructor 中 var 一个变量，它只存在于 constructor 这个构造函数中
- 在 constructor 中使用 this 定义的属性和方法会被定义到实例上
- 在 class 中使用 = (赋值)来定义一个属性和方法，效果与第二点相同，会被定义到实例上
- 在 class 中直接定义一个方法,例如 demo()，会被添加到原型对象 prototype 上
  通过实例调用，该方法中的 this 指向实例对象
- 在 class 中使用了 static 修饰符定义的属性和方法被认为是静态的，被添加到类本身，不会添加到实例上
- 类中定义的方法已经在局部开好了严格模式

# 继承的实现方式与比较

https://juejin.cn/post/6844904098941108232

1. 原型链继承 - 将子类的原型对象指向父类的实例
   `Child.prototype = new Parent()`
2. 构造继承 - 在子类构造函数内部使用 call 或 apply 来调用父类构造函数

```js
function Child() {
  Parent.call(this, ...arguments);
}
```

3. 组合继承

```js
function Child() {
  Parent.call(this, ...arguments);
}
Child.prototype = new parent();
Child.prototype.constructor = Child;
```

4. 寄生组合继承

```js
// 构造继承
function Child() {
  Parent.call(this, ...arguments);
}
// 原型式继承
Child.prototype = Object.create(Parent.prototype);
// 修正constructor
Child.prototype.constructor = Child;
```

5. 原型式继承
6. 寄生继承
7. 混入式继承
8. class 中的 extends 继承

```js
class Child extends Parent {
  constructor(...args) {
    super(...args);
  }
}
```

# 深拷贝与浅拷贝

https://juejin.cn/post/6844903929705136141

浅拷贝：如果属性是基本类型，拷贝的就是基本类型的值；如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象

深拷贝：将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象

```javascript
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

module.exports = {
  clone,
};
```

# 作用域和作用域链、执行上下文 详见：冴羽

## 作用域

- 作用域 指程序源代码中定义变量的区域 | 或者指该上下文中声明的变量和声明的作用范围
  作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
  JS 采用词法作用域(静态作用域),即函数的作用域在函数定义的时候就决定了

1. 作用域分类 1
   作用域 分为词法作用域(静态作用域)和动态作用域

词法作用域在函数定义的时候就决定了,即函数的作用域基于函数创建的位置
动态作用域在函数调用的时候决定

```javascript
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 1
```

2. 作用域分类 2
   作用域分为全局作用域、函数作用域和块级作用域

- 哪些属于全局作用域？

  1. 最外层函数以及最外层定义的变量
  2. 在任何位置不使用 var 声明的变量，即未定义直接赋值的变量
  3. 所有 window 对象的属性，例如 window.name, window.location, window.top 等

- 函数作用域
  指声明在函数内部的变量

  - 注意：
    if switch for while 循环语句，不像函数，它们不会创建一个新的作用域

- 块级作用域
  通过 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问。块级作用域在如下情况被 创建
  1. 在一个函数内部
  2. 在一个代码块({ }) 内部

## 作用域链

- 作用域链
  当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。
  这样由多个执行上下文的变量对象构成的链表就叫做作用域链

## 执行上下文与执行上下文栈

### 什么是执行上下文？

- 执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 JavaScript 代码在运行的时候，它都是在执行上下文中运行

- 执行上下文的类型 分为 全局执行上下文、函数执行上下文、Eval 函数执行上下文

  1. 全局执行上下文 - 基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象，并且设置 this 的值等于这个全局对象。一个程序只会有一个全局执行上下文

  2. 函数执行上下文 - 每当一个函数被调用时，都会为该函数创建一个新的上下文

  3. Eval 函数执行上下文 -

- 执行上下文有以下几个重要属性：
  - 变量对象(Variable object, VO)-是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明
  - 活动对象(Activation object, AO)
  - 作用域链(Scope chain)
  - this

执行上下文的代码会分成两个阶段处理： 分析和执行 1.进入执行上下文 2.代码执行

变量对象会包括

1. 函数的所有形参
2. 函数声明
3. 变量声明

- 全局上下文的变量对象就是全局对象
- 函数执行上下文中的变量对象内部定义的属性，是不能被直接访问的，只有当函数被调用时，变量对象 VO 被激活为活动对象 AO 时，我们才能访问到其中的属性和方法

# 变量提升与函数提升

# Array.sort()方法与实现机制

插入排序和快速排序

在 V8 引擎中，sort 函数只给出了两种排序 insertSort 和 quickSort，数组长度小于等于 22 的用 insertSort 大于 22 的用 quickSort

# Ajax 的请求过程

Ajax 全称 Asyncchronous JavaScript and XML,即异步 JS 与 XML

```js
// 创建 XHR对象
var ajax = new XHRHttpRequest();
// 规定请求的类型、URL、以及是否异步处理请求
ajax.open("GET", url, true);
// 发送信息至服务器时内容编码类型
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 发送请求
ajax.send(null);
// 接受服务器相应数据
ajax.onreadystatechange = function () {
  if (obj.readyState === 4 && (obj.status == 200 || obj.status == 304)) {
    var data = xhr.responseText;
  }
};
```

# 跨域方案

# fetch

# JS 的垃圾回收机制 GC(Garbage Collection)

## 垃圾回收有两种方法： 标记清除和引用计数

### 标记清除

- 标记清除(常用)
  标记阶段：为所有活动对象做上标记
  清除阶段：把没有标记的对象(非活动对象)销毁

- 过程：

1. 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为 0
2. 然后从各个根对象开始遍历，把不是垃圾的节点改成 1
3. 清理所有标记为 0 的垃圾，销毁并回收它们所占用的内存空间
4. 把所有内存中对象标记修改为 0，等待下一轮垃圾回收

- 缺点：在于清除之后剩余的对象位置不变而导致空闲内存空间不连续

1. 内存碎片化，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块
2. 分配速度慢

- 解决 - 标记清除算法

1. 标记阶段和标记清除阶段没有什么不同
2. 标记结束后， 标记整理算法会将或者的对象向内存的一端移动，最后清理掉边界的内存

### 引用计数

- 引用计数：
  它把对象是否不再需要 简化定义为 该对象有没有其他对象引用，如果没有引用指向该对象，对象将被垃圾回收机制回收

- 策略：跟踪记录每个变量值被使用的次数

- 过程：

1. 当声明了一个变量并且将一个引用类型赋值给该变量的时候，这个值的引用次数就为 1
2. 如果同一个值又被赋给另一个变量，那么引用次数+1
3. 如果该变量的值被其它的值覆盖了， 则引用次数-1
4. 当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存

- 缺点：

1. 计数器占用很大的位置
2. 无法解决循环引用导致对象无法回收的问题

## V8 对 GC 的优化

https://juejin.cn/post/6981588276356317214

- 回收策略：分代式垃圾回收机制

V8 将堆内存分为新生代内存和老生代内存两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾内存
新生代的对象-为存活时间较短的对象
老生代的对象-为存活时间较长的或常驻内存的对象

- 新生代垃圾回收 Scavenge 算法

  From 表示正在使用的内存 To 表示目前闲置的内存

  1. V8 将 From 部分的对象全部检查一遍;
  2. 检查出若是存活对象则复制到 To 内存中, 若不是则直接回收;
  3. 复制到 To 内存中是按照顺序从头放置的;
  4. 当 From 中所有的存活对象全部复制完毕之后, From 和 To 就会对调, 也就是 From 被闲置, To 在使用;如此循环

- 老生代垃圾回收 标记清除算法

# Math 方法

# 懒加载

指在长网页中延迟加载图像，是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载

```css
img {
  display: block;
  margin-bottom: 50px;
  width: 400px;
  height: 400px;
}
```

````html
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
<img
  src="default.jpg"
  data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"
  alt=""
/>
```html ```js
<script>
  var num = document.getElementsByTagName("img").length;
  var img = document.getElementsByTagName("img");
  var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

  lazyload(); //页面载入完毕加载可是区域内的图片

  window.onscroll = lazyload;

  function lazyload() {
    //监听页面滚动事件
    var seeHeight = document.documentElement.clientHeight; //可见区域高度
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
    for (var i = n; i < num; i++) {
      if (img[i].offsetTop < seeHeight + scrollTop) {
        if (img[i].getAttribute("src") == "default.jpg") {
          img[i].src = img[i].getAttribute("data-src");
        }
        n = i + 1;
      }
    }
  }
</script>
````

# 数据的双向绑定

```html
<input type="text" id="input" /> <span id="span"></span>
```

```js
let obj = {};
let input = document.getElementById("input");

Object.defineProperty(obj, "content", {
  get() {
    console.log("数据更新了");
  },
  set(newValue) {
    input.value = newValue;
    span.innerHTML = newValue;
  },
});
input.addEventListener("keyup", function (e) {
  obj.content = e.target.value;
});
```

# 正则表达式

https://marketplace.visualstudio.com/items?itemName=russell.any-rule

# DOM 文档对象模型

DOM：文档对象模型，是 HTML 和 XML 文档的编程接口
https://juejin.cn/post/6844903604445249543#heading-0

document、window、html、body 的层级关系：
window > document > html > body

## 获取元素（增）

1. 利用 DOM 提供的方法获取元素

   1. document.getElementById('id 名') 返回对象
   2. document.getElementsByTagName('标签名') 返回类数组，即元素对象的集合
   3. 父元素.getElementsByTagName('子元素标签名') 获取父元素内部所有指定标签名的子元素

   ```javascript
   var ol = document.getElementsByTagName("ol");
   ol[0].getElementsByTagName("li");
   ```

   4. document.getElementsByClassName('类名') 根据类名获得元素对象的集合
   5. document.querySelector('.box') 返回指定选择的第一个元素对象

   ```javascript
   var nav = document.querySelector("#nav"); //根据id选择器获取
   var li = document.querySelector("li"); //根据li标签获取
   ```

   6. document.querySelectorAll() 返回指定选择器的所有元素对象集合

2. 利用节点层级关系获取元素
   1. 父子节点
      1. node.parentNode 获取节点的父节点
      2. node.childNodes 获取节点的孩子节点集合，包含所有的元素节点、文本节点等，不提倡使用
      3. node.children 获取所有的子元素节点集合
      4. node.firstChild 获取第一个子节点，包括元素节点、文本节点等，不提倡使用
      5. node.lastChild 获取最后一个子节点，不提倡使用
      6. node.firstElementChild 返回第一个子元素节点, 有兼容问题
      7. node.lastElementChild 返回最后一个元素节点，有兼容问题
   2. 兄弟节点
      1. node.nextSibling 下一个兄弟节点，包含元素节点或文本节点
      2. node.previousSibling 上一个兄弟节点，包含元素节点或文本节点
      3. node.nextElementSibling 下一个兄弟元素节点, 有兼容问题
      4. node.previousElementSibling 上一个兄弟元素节点, 有兼容问题

## 元素修改（改）

1. 操作元素内容

   1. div.innerText  
      不识别 html 标签 起始位置到终止位置的全部内容，去除 html 标签，空格和换行
   2. div.innerHTML  
      识别 html 标签 起始位置到终止位置的全部内容，包括 html 标签，保留空格和换行

2. 操作常见元素属性
   注意: setAttribute 用于直接在 DOM 元素上添加/修改属性

   1. 如果设置 `div.setAttribute('color', 'red')`
      产生的效果是 `<div color="red"> </div>`
   2. 实际上应该设置`div.setAttribute("style", "color:red");`
      产生的效果是 `<div style="color: red"></div>`

   ```js
   img.src;
   div.setAttribute("style", "color:red");
   input.setAttribute("type", "button");
   div.removeAttribute("style");
   ```

3. 修改表单属性
   input.value 用于操作表单里面的值
4. 修改样式属性

   1. element.style 例如 div.style.backgroundColor = 'purple'  
      该操作产生的是行内样式
   2. element.className 例如 div.className = '类名' 会覆盖原先的类名

## 节点操作

节点拥有三个基本属性
nodeType 节点类型 1-元素节点 2-属性节点 3-文本节点(包含文字、空格、换行等)
nodeName 节点名称  
nodeValue 节点值

1. 获取节点
2. 创建节点
   document.createElement()

- innerHTML 效率比 createElement 高

3. 添加节点
   node.appendChild(child) 给父元素添加子节点
   node.insertBefore(child, 指定元素) 在父节点的指定子元素前添加子节点

4. 删除节点
   node.removeChild(child) 删除父节点中的一个子节点，返回删除的节点

5. 复制节点
   node.cloneNode() 返回调用该方法的节点的一个副本

## 获取特殊元素 body html

1. 获取 body 标签
   document.body
2. 获取 html 标签
   document.documentElement

## 三种动态创建元素的区别

1. document.write()
   会覆盖原本的页面内容
   是直接将内容写入页面的内容流，但是文档流执行完毕，会导致页面全部重绘

   ```js
   document.write("<div>这里是文本内容</div>");
   ```

2. innerHTML 创建元素
   是将内容写入某个 DOM 节点，不会导致页面全部重绘
   创建多个元素的效率更高(采取数组形式拼接, 不要拼接字符串)

3. createElement() 创建元素
   创建多个元素效率稍微低一些，但是结构更清晰

- 总结
  不同浏览器下，innerHTML 效率要比 createElement 高

## 事件处理程序

事件三要素
事件源 事件类型 事件处理程序

- 注册事件的两种方式

  1. DOM0 onclick 同一个元素同一个事件只能设置一个注册函数，会被覆盖  
     添加事件处理程序：

     1. btn.onclick = function(){} 事件处理程序会在 btn 元素的作用域中运行
     2. <button onclick=""></button>
        移除事件处理程序： btn.onclick = null

  2. DOM2 addEventListener 同一个元素同一个事件可以注册多个监听器
     添加事件处理程序： btn.addEventListener(event, function, useCapture)
     移除事件处理程序: btn.removeEventListener(event, function, useCapture)

     三个参数：
     event - 指定事件名，比如 click、mouseover
     function - 指定要事件触发时执行的函数
     useCapture - true(表示在捕获阶段调用事件处理程序)
     false(默认，表示在冒泡阶段调用事件处理程序)

  3. 区别
     1. onclick 只能注册一次, addEventListener 可以注册多次
     2. 解绑方式不同
     3. onclick 只能冒泡阶段

## 事件流

事件流：事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流
事件流分为三个阶段： 事件捕获阶段、当前目标阶段、事件冒泡阶段

事件捕获：事件从最外层开始发生，直到最具体的元素
document -> html -> body -> father -> son
事件冒泡：事件会从最内层的元素开始发生，一直向上传播， document 对象
son -> father -> body -> html -> document

特点：

1.  JS 代码中只能执行捕获或者冒泡其中的一个阶段
2.  onclick 和 attachEvent 只能得到冒泡阶段
3.  addEventListener 第三个参数是 true 则处于捕获阶段， false 则处于冒泡阶段
4.  有些事件没有冒泡。比如 onblur、onfocus、onmouseenter、onmouseleave

## 事件对象 event

1. 常见事件对象的属性和方法

- event.target 返回的是触发事件的对象(元素) 如 div(不是绑定事件的对象)
- event.type 返回事件的类型(click, blur)

2. 阻止默认行为(事件), 让链接不跳转 或者让提交按钮不提交
   event.preventDefault()

3. 阻止冒泡
   event.stopPropagation()

4. 鼠标事件对象
   document.addEventListener('click', function(e){})
5. 相对于可视区
   e.clientX 鼠标在可视区的 X 坐标
   e.clientY 鼠标在可视区的 Y 坐标
6. 相对于文档页面
   e.pageX
   e.pageY

7. 键盘事件

   1. document.addEventListener('keyup', function(e){})  
      某个键盘按键被松开时触发
   2. document.addEventListener('keydown', function(e){})  
      某个键盘按键被按下时触发
   3. document.addEventListener('keypress', function(e){})  
      某个键盘按键被按下时触发,但是它不识别功能键，例如 ctrl、shift、左右箭头等

   e.keyCode 返回对应键盘的 ASC 值
   keyup 和 keydown 不区分字母大小写
   keypress 区分字母大小写

## 事件委托(事件代理)

原理：不是给每个子节点设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点

# BOM 浏览器对象模型 Browser Object Module

DOM 的顶级对象是 document
BOM 的顶级对象时 window

window 包括 document lo cation navigation screen history

## window 浏览器窗口

1. 窗口加载事件
   `window.onload(= = function(){}`
   当文档内容完全加载完成会触发该事件(包括图像、脚本文件、CSS 文件等)，就调用的处理函数
   `document.addEventListener('DOMContentLoaded', function(){})`
   该事件触发时，仅当 DOM 加载完成，不包括样式表，图片，flash 等等

2. 调整窗口大小事件
   可以用来完成响应式布局

   ```js
   window.onresize = function () {};
   window.addEventListener("resize", function () {});
   ```

3. 定时器
   可以给定时器加标志符，例如

   ```js
   var timer1 = setTimeout(callback, 3000);
   var timer2 = setTimeout(callback, 3000);
   ```

   1. setTimeout

   ```js
   // window在调用的时候可以省略，延时时间单位是毫秒
   window.setTimeout(调用函数, 延时时间);

   clearTimeout(timer1);
   ```

   2. setInterval

   ```js
   window.setInterval();

   clearInterval(timer1);
   ```

- 属性:
  name：指浏览器窗口的名字或框架的名字。这个名字是给 a 标记的 target 属性来用的。设置窗口的名字：window.name = “newWin” 获取窗口的名字：document.write(name);
  top：代表最顶层窗口。如：window.top
  parent：代表父级窗口，主要用于框架。
  self：代表当前窗口，主要用于框架中。
  clientHeight/clientWidth: 代表页面视口的高度和宽度

- 方法:
  alert()：弹出一个警告对话框。
  prompt([text],[defaultText])：弹出一个输入对话框。
  confirm(text)：弹出一个确认对话框。如果单击“确定按钮”返回 true，如果单击“取\* \* 消”返回 false。 text：要显示的纯文本
  close()：关闭窗口
  print()：打印窗口
  open([url],[name],[options]):打开一个新窗口

## location

1. URL 统一资源定位符
   格式为：
   通信协议 主机 端口号 路径 参数 片段(常用于链接锚点)
   `protocol://host[:port]/path/[?query]#fragment`
   `http://www.itcast.cn/index.html?name=andy&age=18#link`

2. 属性:
   href：获取地址栏中完整的地址。可以实现 JS 的网页跳转。
   `location.href = 'http://www.sina.com.cn'`
   host：主机名
   port: 端口号
   hostname：主机名
   pathname：文件路径及文件名
   search：返回参数
   protocol：协议，如：http://、ftp://
   hash：锚点名称。如：#top
   reload([true])：刷新网页。true 参数表示强制刷新

3. location 对象方法
   location.assign() 跳转页面(重定向页面)
   location.replace() 替换当前页面
   location.reload() 重新加载页面，相当于刷新按钮

## navigator 对象

包含有关浏览器的信息
属性：
userAgent: 该属性可以返回由客户机发送服务器的 user-agent 头部的值，用来判断哪个终端打开页面

## history 对象

属性: length 历史记录的个数

方法:
go(n)：同时可以实现“前进”和“后退。”
history.go(0) 刷新网页
history.go(-1) 后退
history.go(1) 前进一步
history.go(3) 前进三步
forward()：相当于浏览器的“前进”按钮
back()：相当于浏览器的“后退”按钮

## 元素

1. 元素偏移量 offset
   element.offsetTop 返回元素相对带有定位父元素上方的偏移
   element.offsetLeft 返回元素相对带有定位父元素左边的偏移
   element.offsetRight  
   element.offsetBottom  
   element.offsetWidth 返回自身包括 padding、边框、内容区的宽度，返回数值不带单位
   element.offsetHeight 返回自身包括 padding、边框、内容区的高度，返回数值不带单位

element.offsetParent //返回带有定位的父亲，否则返回 body
element.parentNode //返回最近一级的父亲

2. 元素可视区 client -获取元素可视区的相关信息
   element.clientTop 返回元素上边框的大小
   element.clientLeft 返回元素左边框的大小
   element.clientWidth 返回自身包括 padding、内容区的宽度，不含边框，返回数值不带单位
   element.clientHeight 返回自身包括 padding、内容区的高度，不含边框，返回数值不带单位

3. 元素滚动 scroll
   element.scrollTop 返回被卷去的上侧距离，返回数值不带单位
   element.scrollLeft 返回被卷去的左侧距离，返回数值不带单位
   element.scrollWidth 返回自身实际的宽度，不含边框，返回数值不带单位
   element.scrollHeight 返回自身实际的高度，不含边框，返回数值不带单位

### offset 与 style 区别

1. offset 用于获取元素大小位置
   可以得到任意样式表中的样式值
   获得的数值是没有单位的
   offsetWidth 包括 padding+border+width
   offsetWidth 等属性是只读属性，只能获取不能赋值

2. style 用于给元素更改值
   只能得到行内样式表中的样式值
   style.width 获得的是带有单位的字符串
   style.width 获得不包含 padding 和 border 的值
   style.width 是可读属性，可以获取也可以赋值

# 三种事件模型

1. DOM 0 级
2. DOM 2 级
3. DOM 3 级

# 错误处理方案

1. 为什么需要有错误处理方案
   如果我们有一个函数，再调用这个函数时，如果出现了错误，那么我们应该修复这个错误，例如当函数传入参数的类型不正确时，应该告知调用者一个错误。
   需要强制告诉外界错误，用 throw 来抛出
   `throw "not a function"`
2. 抛出异常的类型

   1. 抛出一个字符串类型(基本的数据类型)

      ```js
      function foo(type) {
        console.log("foo函数开始执行");

        if (type === 0) {
          throw "type不能为0";
        }

        console.log("foo函数结束执行");
      }

      foo(0);
      ```

   2. 抛出一个对象类型

      ```js
      // 别人可以根据错误码查找错误信息
      throw { errorCode: -1001, errorMessage: "type不能为0." };
      ```

   3. 创建类， 并且创建这个类对应的对象

      ```js
      class HYError {
        constructor(errorCode, errorMessage) {
          this.errorCode = errorCode;
          this.errorMessage = errorMessage;
        }
      }

      function foo(type) {
        console.log("foo函数开始执行");

        if (type === 0) {
          throw new HYError(-1001, "type不能为0");
        }

        console.log("foo函数结束执行");
      }
      ```

   4. 真实开发中，js 已经提供了类 Error, 可以打印出函数的调用栈

      Error 包含三个属性: message, name, stack
      Error 有一些自己的子类: RangeError(下标越界时使用)、SyntaxError(解析语法错误时使用)、TypeError(出现类型错误时使用)

      ```js
      function foo(code) {
        if (!code) {
          throw new Error("错误代码");
        }
        console.log(code);
      }
      ```

      ```js
      const err = new Error("type不能为0");

      console.log(err.message);
      console.log(err.name);
      console.log(err.stack);
      ```

3. 对抛出的异常进行处理

   1. 不处理, 那么异常会继续抛出，指导最顶层的调用
      如果在最顶层也没有对这个异常进行处理，那么我们的程序就会终止执行，并且报错

   2. 利用 try {} catch() {}
      会正确处理异常， 程序不会终止执行

      ```js
      try {
        // 代码块
        // 异常信息, 一般用e来表示
      } catch (e) {
        // 需要处理的内容
        console.log(e);
      } finally {
        // 不管有没有发生异常, finally中的代码一定会执行
      }
      ```

# js 的几种模块规范

https://juejin.cn/post/6844903576309858318

1. 为什么要模块化开发

   1. 模块中可以编写属于自己的逻辑代码，有自己的作用域， 不会影响到其他的结构，产生命名冲突
   2. 模块可以将自己希望暴露的变量、函数、对象等导出给其他模块使用
   3. 也可以导入其他模块中的变量、函数、对象等

2. 没有模块化之前,利用立即执行函数

   ```js
   // 文件1
   const moduleA = (function () {
     var name = "six";
     var age = 18;
     var isFlag = true;
     return {
       name,
       age,
     };
   })();
   ```

   ```js
   // 文件2
   (function () {
     if (moduleA.isFlag) {
       console.log("我的名字是" + moduleA.name);
     }
   })();
   ```

3. 几种规范介绍(详见 ES6.md)

   1. CommonJs
   2. AMD
   3. CMD
   4. ES6

# axios

## 特点

1. 基本 promise 的异步 ajax 请求库
2. 浏览器端/node 端都可以使用
3. 支持请求/响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

## 使用

1. 拦截器
   ```js
   axios.interceptors.request.use((config) => {
     return config;
   });
   axios.interceptors.response.use((response) => {
     return response;
   });
   ```

# 设计模式

https://github.com/LiangJunrong/document-library/tree/master/%E7%B3%BB%E5%88%97-%E9%9D%A2%E8%AF%95%E8%B5%84%E6%96%99/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F

1. 单例模式

   - 描述
     一个类只能制造出一个唯一实例, 单例模式的意义在于共享、唯一
   - 举例 Redux/Vuex 的 Store 或者业务场景中的购物车、登录框都是单例模式的应用

   ```js
   class SingletonLogin {
     constructor(name, password) {
       this.name = name;
       this.password = password;
     }
     static getInstance(name, password) {
       // 判断对象是否已经被创建,若创建则返回旧对象
       if (!this.instance) {
         this.instance = new SingletonLogin(name, password);
       }
       return this.instance;
     }
   }

   let obj1 = SingletonLogin.getInstance("jsliang", "123456");
   let obj2 = SingletonLogin.getInstance("zhazhaliang", "654321");

   console.log(obj1 === obj2); // true
   console.log(obj1); // SingletonLogin { name: 'jsliang', password: '123456' }
   console.log(obj2); // SingletonLogin { name: 'jsliang', password: '123456' }
   ```

2. 工厂模式

   - 描述
     对创建对象逻辑的封装,其核心就是将逻辑封装在一个函数中不暴露创建对象的具体逻辑
   - 举例 jQuery 的 $(selector)

   ```js
   const Person = function () {
     const [name, age, sex] = [...arguments];
     this.name = name;
     this.age = age;
     this.sex = sex;
     this.sayName = () => {
       console.log(`我叫 ${this.name}，性别 ${this.sex}，今年 ${this.age}`);
     };
   };

   const p1 = new Person("jsliang", 25, "男");
   const p2 = new Person("靓女", 25, "女");

   p1.sayName(); // 我叫 jsliang，性别 男，今年 25
   p2.sayName(); // 我叫 靓女，性别 女，今年 25
   ```

3. 观察者模式-发布订阅模式

   1. 描述
      当一个对象的状态发生改变时， 所有依赖于它的对象都得到通知并被自动更新
   2. 举例

   DOM 的事件绑定

   Vue 的双向绑定
   原理: 利用 Object.defineProperty 对数据进行劫持，设置一个监听器 Observer,用来监听所有属性，如果属性发生了变化，就需要告诉订阅者 Watcher 去更新数据，最后指令解析器 Compile 解析对应的指令，进而会执行对应的更新数据，从而更新视图，实现了双向绑定

   Redux 的 subscribe、Vue 的双向绑定、Vue 的 watch 声明周期钩子

4. 装饰器模式

   - 描述
     对类的包装，动态地扩展类的功能
   - 举例 React 的高阶组件、ES7 装饰器

5. 适配器模式

   - 描述
     兼容新旧接口，对类的包装
   - 举例 封装旧 API

6. 代理模式

   - 描述
     控制对象的访问
   - 举例 事件代理、ES6 的 Proxy

7. 中介模式
   - 描述
     中介者使各个对象不需要显示地相互引用，从而使其耦合性松散，而且可以独立地改变它们之间的交互

# 设计模式手写

1. 发布订阅/观察者模式
   https://juejin.cn/post/6968713283884974088#heading-3

   ```js
   // 手写发布订阅模式
   const Observe = function () {
     const _message = {};

     return {
       // 订阅消息 on
       on: function (type, fn) {
         if (typeof _message[type] === "undefined") {
           _message[type] = [fn];
         } else {
           _message[type].push(fn);
         }
       },

       // 发布消息 subscribe
       subscribe: function (type, args) {
         if (!_message[type]) return;

         let event = {
           type: type,
           args: args || {},
         };
         for (let i = 0; i < _message[type].length; i++) {
           _message[type][i].call(this, event);
         }
       },

       // 移除消息 off
       off: function (type, fn) {
         if (!_message[type] instanceof Array) {
           for (let i = _message[type].length - 1; i >= 0; i--) {
             _message[type][i] === fn && _message[type].splice(i, 1);
           }
         }
       },
     };
   };
   const observe = new Observe();

   observe.on("say", function (data) {
     console.log(data, "我获得数据了");
   });
   observe.on("animal", function () {
     console.log("七七");
   });

   observe.subscribe("say", "123456");
   // {type: 'say', args: '123456'}args: "123456"type: "say"[[Prototype]]: Object '我获得数据了'
   observe.subscribe("animal");
   // 七七
   ```

# 位运算符

1. 逻辑位运算符
   & 位与 1 & 1 = 1
   | 位或 1 | 1 = 1， 1 | 0 = 1, 0 | 1 = 1
   ^ 位异或 1 | 0 = 1, 0 | 1 = 1
2. 移位运算符
   << 左移

# 描述 V8 执行一段 JS 代码的过程

1.  JS 代码进行 parser(词法分析和语法分析)
    Blink 将源码交给 V8 引擎，Stream 获取到源码并且进行编码转换
    Scanner 对`const name = 'why`进行词法分析(lexical analysis)
    会生成 Tokens: [{type: 'keyword', value: 'const', type: 'identifier', value: 'why'}]
    Tokens 在线查看网站 `https://esprima.org/demo/parse.html#`

2.  Parser 解析器根据 Tokens 生成抽象语法树(AST)
    网址:`https://astexplorer.net`

3.  Ignition(点火) 解释器 将抽象语法树转化为字节码(bytecode)
    字节码是介于 AST 和机器码之间的一种中间码

4.  TurboFan 编译器将字节码转化对对应的 CPU 可以直接执行的机器码
    如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过 TurboFan 转换成优化的机器码，提高代码的执行性能。该技术称为即时编译(JIT)

# 问题类

1. Object.keys()是否排序？
   https://juejin.cn/post/6844903646614781966

2. 文件上传
   https://juejin.cn/post/6844904046436843527

3. toString 和 valueOf
   https://juejin.cn/post/6873215243804213262

4. toString 返回一个表示该对象的字符串

# 原内容

## 作用域

概念--指程序源代码中定义变量的区域
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
JS 采用词法作用域(静态作用域),即函数的作用域在函数定义的时候就决定了

## let 和 const 命令

1. 暂时性死区
   在代码块内，使用 let 命令声明变量之前，该变量都是不可用的，会报错。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）
2. const
   const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

   对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量

   对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

   总结：const 声明不允许修改绑定，但允许修改值

## 块级作用域

1. 为什么需要块级作用域？ 1)内层变量可能会覆盖外层变量

   ```
   var tmp = new Date();

   function f() {
     console.log(tmp);
     if (false) {
       var tmp = 'hello world';
     }
   }

   f(); // undefined
   ```

   2)用来计数的循环变量泄露为全局变量

   ```js
   var s = "hello";
   for (var i = 0; i < s.length; i++) {
     console.log(s[i]); // h e l l o
   }
   console.log(i); // 5 全局范围都可以读到
   ```

2.块级作用域存在于函数内部和块中{ }之间的区间

## JavaScript

1.async 和 defer 的区别
defer 是渲染完再执行 按顺序加载
async 是下载完就执行 不能保证加载顺序

2.ES6 模块和 CommonJS 模块的差异
(1)CommonJS 模块输出的是一个值得拷贝，ES6 模块输出的是值的引用
(2)CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
(3)CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段

## 闭包

概念：指有权访问另一个函数作用域中的变量的函数
优点：
缺点：导致内存泄漏
应用：定义模块，将操作函数暴露给外部，而细节隐藏在模块内部

## 单例、工厂设计模式

单例模式：
概念--基于对象数据类型，把描述当前事务的属性和方法统一放在一起分组管理，能够减少全局变量污染
var obj={} 就是标准的单例模式
例如：

```js
var person1={
  name:'张三',
  age:25,
  ...
};

var person2={
  name:'李四',
  age:28,
  ...
};
```

特点 1.每一个对象都是一个单独的实例（单独的堆内存），存储的键值对都是堆中私有的内容，所以两个实例之间不会有任何的冲突

工厂设计模式：
概念--是在需要创建很多“相似实例”的情境下，让我们告别手动创建，而实现工业化批量生产（根据这句话让我们想到=>提高开发效率、减少了页面中的冗余代码 => “低耦合高内聚” => 函数封装）

## 基础

1.  JS 的数据类型

    JS 一共有 6 种基本数据类型分别是`undefined`, `null`, `boolean`, `number`, `string`, `symbol`, 引用数据类型`object`, `array`, `function`

    `symbol`作用: 定义一个独一无二的值

    基本类型是保存在栈内存中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问

    引用类型是保存在堆内存中的对象，值大小不固定，栈内存中存放的该对象的访问地址指向堆内存中的对象，JavaScript 不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用

2.  string 是个基本数据类型，为什么可以使用 String 的一些方法

    除去 Object, Array 等引用类型，JavaScript 还提供了三种特殊的引用类型: String, Number 和 Boolean，方便我们操作对应的基本类型，所以在调用 String 方法时，并不是基本数据类型 stirng 执行了自身方法，而是后台为它创建了一个对应的基本包装类型 String，它根据基本类型的值实例化了一个实例，让这个实例去调用指定的方法，最后销毁这个实例

3.  `var`, `let`, `const`的区别

    `var`声明的变量没有块级作用域而`let`声明的变量拥有块级作用域，`const`声明的是常量，声明之后无法对其进行修改， `const`保证的实际上并不是变量的值不得改变，而是变量指向的那个内存地址不得改动，对于复合类型的数据如对象，数组，变量指向的内存地址保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的

    在代码块内，使用 let 命令声明变量之前，该变量都是不可用的，在语法上称为暂时性死区

4.  `==`, `===`, `Object.is`的区别

    `==`: 会进行强制的类型转换,在转换类型后，二者相等也会返回 True,而`===`不会进行转换, `Object.is`也不会进行强制类型转换，但与`===`不同的是，`+0===0`, `Object.is(+0, -0) false`, `Nan !== Nan, Object.is(Nan, Nan) false`

    如果 Type(x)和 Type(y)相同，返回 x===y 的结果
    如果 Type(x)和 Type(y)不同
    如果 x 是 null，y 是 undefined，返回 true
    如果 x 是 undefined，y 是 null，返回 true
    如果 Type(x)是 Number，Type(y)是 String，返回 x==ToNumber(y) 的结果
    如果 Type(x)是 String，Type(y)是 Number，返回 ToNumber(x)==y 的结果
    如果 Type(x)是 Boolean，返回 ToNumber(x)==y 的结果
    如果 Type(y)是 Boolean，返回 x==ToNumber(y) 的结果
    如果 Type(x)是 String 或 Number 或 Symbol 中的一种并且 Type(y)是 Object，返回 x==ToPrimitive(y) 的结果
    如果 Type(x)是 Object 并且 Type(y)是 String 或 Number 或 Symbol 中的一种，返回 ToPrimitive(x)==y 的结果
    其他返回 false

5.  `slice()`和`splice()`的区别

    `slice`: 只能截取数组中的一段，且截取后原数据不会发生变化;

    `splice`: 不仅仅能够截取数组中的一段，还能够在原数组中进行替换

6.  `push()`, `pop()`, `shift()`和`unshift()`

    (1). `push`, `pop`:类似于栈的行为，后进先出

    (2). `shift`, `unshift`: 类似于队列的行为, 先进先出

    数组方法

        (1). 修改器方法

            push, pop, unshift, shift, sort, reverse, splice

        (2). 访问方法 (返回新的数组)

            concat, slice

        (3). 迭代方法

            forEach, filter, map, reduce

7.  `map`和`set`

    map 是一组键值对的结构，具有极快的查找速度

    set 和 map 类似，也是一组 key 的集合，但不储存 value，在 set 中，key 不可重复

    现在，如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和 map）中自动清除。

8.  箭头函数与普通函数的区别

    (1). 箭头函数不会创建自己的`this`只会从自己的作用链上一层继承`this`;

    (2). 箭头函数继承而来的`this`指向永远不变所以`.call()/.apply()/.bind()`无法改变箭头函数中`this`的指向;

    (3). 箭头函数不能作为构造函数使用; **从关键字 new 的角度去回答，this 的指向会发生改变**

    (4). 箭头函数没有自己的`arguments`;

    (5). 箭头函数没有原型`prototype`

9.  CommonJS 和 ES6 模块的区别

    (1). CommonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用，换句话说就是 CommonJS 在模块内部发生的后续变化影响不了外部对这个值的使用;

    (2). CommonJS 模块是运行时加载，ES6 模块是编译时输出接口;

    (3). CommonJS 顶层`this`指向当前模块, 而在 ES6 模块中`this`指向`undefined`

10. `innerHtml`, `innerText`, `outerHtml`

    `innerHtml`: 是指从对象的起始位置到终止位置的全部内容包括 html 标签

    `innerText`: 从起始位置到终止位置的内容，不包括 html 标签

    `outerHtml`: 除了包含`innerHtml`全部内容外还包含了对象标签本身

    **火狐浏览器不支持`innerText`**

11. 怎么判断是数组

    (1). `instanceof`; (2). `constructor` `arr.constructor === Array`; (3). `toString` example: `Object.prototype.toString.call(arr) === '[object Array]';`; (4). `Array.isArray(arr)`

12. 数组拷贝

    浅拷贝: 直接将数组引用复制的方法是浅拷贝

    深拷贝: 递归复制了所有层级 `JSON.parse(JSON.stringify(arr));` `slice和concat在多维数组中无效`

13. Event Loop

    为了解决异步任务，js 最大的特点是单线程，非阻塞，当在执行栈中有一个异步任务的时候，js 不会一直等待其返回结果，而是将这个事件挂起，继续执行执行栈中接下来的任务，当异步任务返回结果后，js 会将结果插入到事件队列中，并不会立即回调，当执行栈中任务执行完成之后，会取出事件队列中第一位的事件，放入执行栈中继续执行，如此反复，就形成了一个循环，这个过程就是 Event Loop

    浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

    主代码执行，将 2 个 定时器 依次放入 I/O 任务队列最后进入 timer 队列，主代码执行完毕，调用栈空闲，开始进行事件循环首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2。

    而 node11 之后，node 在 setTimeOut 执行后会手动清空微任务队列，以保证结果贴近浏览器。

14. 浏览器事件机制

    浏览器事件机制中事件触发的三个阶段: 事件捕获 - 事件目标函数处理 - 事件冒泡

    冒泡: 事件会从最内层元素发生，一直向外传播直到 document 对象

    捕获: 与冒泡相反，事件从最外层开始发生直到最具体的元素

    当某个元素触发某个事件（如：click），顶级对象 document 发出一个事件流，顺着 dom 的树节点向触发它的目标节点流去，直到达到目标元素，这个层层递进，向下找目标的过程为事件的捕获阶段，此过程与事件相应的函数是不会触发的。

    到达目标函数，便会执行绑定在此元素上的，与事件相应的函数，即事件目标处理函数阶段。

    最后，从目标元素起，再依次往顶层元素对象传递，途中如果有节点绑定了同名事件，这些事件所对应的函数，在此过程中便称之为事件冒泡。

    通常情况下，事件相应的函数是在冒泡阶段执行的。addEventListener 的第三个参数默认为 false，表示冒泡阶段执行（为 true 的时候，表示捕获阶段执行）。

15. `onclick`和`addEventListener`的区别

    `on`: 不可以多次绑定同一事件

    `addEventListener`: 可以多次绑定同一事件，并且并不会覆盖上一个事件

    1.onclick 事件在同一时间只能指向唯一对象

    2.addEventListener 给一个事件注册多个 listener

    3.addEventListener 对任何 DOM 都是有效的，而 onclick 仅限于 HTML

    4.addEventListener 可以控制 listener 的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用 removeEventListener 清除

16. 闭包

    闭包就是能够读取其他函数内部变量的函数，本质上闭包就是函数内部与函数外部的一座桥梁

17. `promise`与`async/await`

    Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

    一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了

    说到底，Promise 也还是使用回调函数，只不过是把回调封装在了内部，使用上一直通过 then 方法的链式调用，使得多层的回调嵌套看起来变成了同一层的，书写上以及理解上会更直观和简洁一些。

    promise 可解决回调地狱的问题

    (1). `promise`是 ES6 的语法，`async/await`是 ES7 的语法;

    (2). `promise`的错误可以通过 catch 来捕捉，而`async/await`的错误用`try-catch`来捕捉，因为`await`只会返回`promise`成功的值;

    async 与 generator

    async 相当于自执行的 generator 函数，相当于自带一个状态机，在 await 的部分等待即过，返回后自动执行下一步

18. JS 为什么要区分 Microtask 和 Marcotask

    区分微任务和宏任务是为了将异步队列任务划分优先级，通俗的理解就是为了插队。

    一个 Event Loop，微任务是在宏任务之后调用，微任务会在下一个 Event Loop 之前执行调用完，并且其中会将微任务执行当中新注册的微任务一并调用执行完，然后才开始下一次 Event Loop，所以如果有新的宏任务 就需要一直等待，等到上一个 Event Loop 当中 微任务被清空为止。由此可见，我们可以在下一次 Event Loop 之前进行插队。

    如果不区分微任务和宏任务那就无法在下一次 Event Loop 之前进行插队，其中新注册的任务得等到下一个宏任务完成之后才能进行，这中间可能你需要的状态就无法在下一个宏任务中得到同步。

19. ES6 相比于 ES5 的特性

    (1). 关键字`let` - 块级作用域 `const` - 常量;

    (2). 箭头函数;

    (3). 解构赋值;

    (4). class 只是一个语法糖，并不能代表 javascript 是一个面向对象的编程语言;

    (5). `map`, `set`, `WeakMap`, `WeakSet` ;

        `WeakMap`, `WeakSet`作为属性键的对象如果没有别的变量引用他们，则会被回收释放掉

    (6). 扩展运算符(相当于`rest`的逆运算);

20. 防抖和节流

    防抖: 当你频繁触发后，n 秒内只执行一次, 如果 n 秒内有被触发，则重新计时

    ```
    function debounce(fn) {
        let timeout = null
        return function (){
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fn.apply(this, arguments)
            }, 500)
        }
    }
    ```

    应用场景: (1).搜索框搜索输入，只需用户最后一次输入完，再发送请求; (2). 手机号，邮箱验证输入检测; (3). 窗口大小 Resize，只需窗口调整完成后，计算窗口大小，防止重复渲染;

    节流: 在固定的时间内触发事件，每隔 n 秒触发一次

    ```
    function throttle(fn, delay) {
        let canRun = true // 通过闭包保存一个标记
        return function () {
            if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
            canRun = false // 立即设置为false
            setTimeout(() => {
                fn.appny(this, arguments)
                canRun = true;
            }, delay)
        }

    }
    ```

    应用场景: (1). 滚动加载，加载更多或滚到底部监听; (2). 谷歌搜索框，搜索联想功能; (3). 高频点击提交，表单重复提交;

21. js 中 0.1+0.2 为什么不等于 0.3,怎么解决

    计算机是用二进制储存数的，而十进制小数转二进制的方法是用 2 去乘小数部分，这会导致小数不能精确的表达所以当两个小数相加时，很有可能产生误差

    解决方法是可以将数组转为整数先进行加法再除以他们放大的倍数或者利用第三方库

22. map, forEach

    map 和 forEach 的区别:

        forEach()方法不会返回执行结果，也就是说forEach会修改原来的数组

        map()会得到一个新的数组并返回，不会修改原来的数组 (声明一个新的变量来储存map的结果而不是去修改原数组)

        ```
        let arr = [
          {
            a: 1,
            b: 2
          },
          {
            a: 3,
            b: 4
          }
        ]

        const arr1 = arr.map(item => (
          {
            ...item,
            b: 5
          }
        ))


        const arr2 = arr.map(item => {
          item.b = 5
          return item
        })
        console.log(arr);
        console.log(arr1);
        console.log(arr2);

        ```

23. js 获取，更新，添加，删除 dom 操作

    ```
    // 获取
    document.getElementById() // 获取唯一的节点
    document.getElementsByTagName ();
    document.getElementsByClassName(); // 都是获取一组节点
    document.querySelector() // 返回文档中匹配指定CSS选择器的第一个元素
    document.querySelectorAll()



    // 更新
    // 修改节点的文本 innerHTML和innerText

    // 插入
    parentElement.appendChild(newElement) // 插入到最后
    parentElement.insertBefore(newElement, referenceElement)

    // 删除
    parentElement.removeChild(deleteElement)
    ```

24. js 垃圾回收机制

    (1). 标记清理 在垃圾程序运行的时候，会标记内存中存储的所有变量然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉，在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存 ;
    (2). 引用计数 对每个值都记录它被引用的次数，声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变量，那么引用数加 1，类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1.当一个值的引用数为 0 时，就说明没发再访问这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为 0 的值的内存;

    垃圾回收算法: (1). 标记空间中可达的值; (2). 回收不可达的值所占据的内存; (3). 做内存整理;

    分代收集:

        (1). 浏览器将数据分为两种，一种是临时对象，一种是长久对象;
        (2). 临时对象: 函数内部声明的变量，块级作用域中的变量; 长久对象: 生命周期很长的对象，比如全局的window，DOM
        (3). 两种不同的对象对应不同的回收策略，V8把堆分成新生代和老生代两个区域，新生代中存放临时对象，老生代中存放持久对象并且让副垃圾回收器，主垃圾回收器分别负责新生代和老生代的垃圾回收，这样就可以高效的垃圾回收
        (4). 主垃圾回收器: 负责老生代的垃圾回收，有两个特点: 对象占用空间大，对象存活时间长。它使用标记清除的算法执行垃圾回收。在遍历的过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据，然后是垃圾清除，直接将标记为垃圾的数据清理掉，这样会产生大量的不连续的内存碎片，需要进行内存整理
        (5). 副垃圾回收器: 负责新生代的垃圾回收，通常只支持1-8M的容量，新生代被分为两个区域：一般是对象区域，一半是空闲区域。
        新加入的对象都被放入对象区域，等对象区域快满的时候，会执行一次垃圾清理。先给对象区域所有垃圾做标记；标记完成后，存活的对象被复制到空闲区域，并且将他们有序的排列一遍；
        这就回到我们前面留下的问题 -- 副垃圾回收器没有碎片整理。因为空闲区域里此时是有序的，没有碎片，也就不需要整理了；复制完成后，对象区域会和空闲区域进行对调。将空闲区域中存活的对象放入对象区域里。这样，就完成了垃圾回收。因为副垃圾回收器操作比较频繁，所以为了执行效率，一般新生区的空间会被设置得比较小。一旦检测到空间装满了，就执行垃圾回收。

25. JS 如何解决单线程

    浏览器的主要线程包括：UI 渲染线程，JS 主线程，GUI 事件触发线程，http 请求线程
    JS 作为脚本语言，它的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。（这里这些问题我们不做研究）

    其实 JS 为我们提供了一个 Worker 的类，它的作用就是为了解决这种阻塞的现象。当我们使用这个类的时候，它就会向浏览器申请一个新的线程。这个线程就用来单独执行一个 js 文件。

    当然，在主线程中有一些方法来实现对新线程的控制和数据的接收。

    在新线程中使用 postMessage()方法可以向主线程中发送一些数据，主线程中使用 worker 的 onmessage 事件来接收这些数据，这样就实现了 js 的多线程执行和多线程之间数据的传递。

26. 类数组与数组的转换

    类数组是一个普通对象，而真实的数组是 Array 类型。

    常见的类数组有: 函数的参数 arguments, DOM 对象列表(比如通过 document.querySelectorAll 得到的列表), jQuery 对象 (比如 $(“div”)).

    1）拥有 length 属性，其它属性（索引）为非负整数（对象中的索引会被当做字符串来处理）;

    2）不具有数组所具有的方法；

    (1). `Array.prototype.slice.call(arraylike, start)`;
    (2). `[...arraylike]`;
    (3). `Array.from(arraylike)`;

27. 作用域和作用域链和执行上下文

    每个上下文都有一个关联的变量对象，而在这个上下文当中定义的所有变量和函数都存在于这个对象上，上下文在其中所有的代码都执行完毕后会被销毁，包括定义在其中的所有变量和函数，所以上下文决定了它们可以访问哪些数据，上下文可以通过作用域链访问外部上下文中的一切，但外部上下文无法访问内部上下文中的任何东西(执行上下文栈 后入先出)

    上下文中的代码在执行的时候，会创建变量对象的作用域链，这个作用域链决定了各级上下文中的代码在访问变量和函数的顺序

    变量提升，var 的变量提升和函数的变量提升

28. BOM 属性和方法

29. 内存管理

    优化内存的最佳手段就是保证内存在执行代码时只保存必要的数据，如果数据不再必要，那么把它设置为 null，从而释放其引用

    通过 const 和 let 声明提升性能(块作用域)

    内存泄漏

        大部分原因是由不合理的引用导致的

        (1). 函数作用域内意外声明全局变量
        (2). 不清理定时器
        (3). 闭包

30. JS 为什么是单线程？

    JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

31. 事件委托

    事件委托其实就是利用 JS 事件冒泡机制把原本需要绑定在子元素的响应事件（click、keydown……）委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。

    优点: 大量减少内存占用，减少事件注册。新增元素实现动态绑定事件

    ```
    <ul id="color-list">
        <li>red</li>
        <li>yellow</li>
        <li>blue</li>
        <li>green</li>
        <li>black</li>
        <li>white</li>
      </ul>
      <script>
        (function () {
          var color_list = document.getElementByid('color-list');
          color_list.addEventListener('click', showColor, true);
          function showColor(e) {
            var x = e.target;
            if (x.nodeName.toLowerCase() === 'li') {
              alert(x.innerHTML);
            }
          }
        })();
      </script>
    ```

32. 为什么 for...of...不能遍历对象

    因为能够被 for...of 正常遍历的，都需要实现一个遍历器 Iterator。而数组、字符串、Set、Map 结构，早就内置好了 Iterator（迭代器），它们的原型中都有一个 Symbol.iterator 方法，而 Object 对象并没有实现这个接口，使得它无法被 for...of 遍历

## 代码

1. 代码输出

   ```
   let arr=[1,2,3]
   let brr=arr.push(4)
   let crr=arr.splice(1,1,)
   console.log(arr) // [1, 2, 3]
   console.log(brr) // 4
   console.log(crr) // [2]

   function a() {}
   a.key = "123"
   会报错吗？为什么？ 不会，因为a是引用数据类型可以自定义属性和方法
   ```

2. `this`指向问题

   ```
   // shoppe
   var a = 10
   var obj = {
     a: 20,
     say: () => {
       console.log(this.a)
     }
   }
   obj.say() // undefined 箭头函数的this继承自它父级的this
   var anotherObj={a:30}
   obj.say.apply(anotherObj) // undefined 箭头函数的this不能被bind, apply, call改变

   function Person(name) {
     this.name = name;
   }
   Person.prototype.print = function() {
     return this.name;
   };

   Person('abc');
   const a = new Person('abc').print.call({});
   console.log(a); // undefined

   const fn = () => {
     this.x = 'z';
   };

   const b = {x: 'y'};
   fn.call(b);
   console.log(b); // {x: 'y'}
   ```

3. 原型链问题

   ```
   // shoppe
   function Parent() {
     this.a = 'Parent'
   }

   function Child() {
     this.a = 'Child'
   }

   Function.prototype.print = function() {
     console.log(this.a)
   }

   Parent.print() // undefined
   Child.print() // undefined

   var p = new Parent()
   p.print() // error

   ```

4. 作用域问题

   ```
   // shoppe
   function(){
       var x = y = 1;
   })();
   var z;

   console.log(y); // 1
   console.log(z); // undefined
   console.log(x); // ReferenceError

   ```

5. Event loop

   ```
   // shoppe
   console.log(1);

   setTimeout(() => {
     console.log(2);
     Promise.resolve().then(() => {
       console.log(3)
     });
   });

   new Promise((resolve, reject) => {
     console.log(4)
     resolve(5)
   }).then((data) => {
     console.log(data);
   })

   setTimeout(() => {
     console.log(6);
   })

   console.log(7);

   // 1, 4, 7, 5, 2, 3, 6
   ```

   ```
   setTimeout(() => {
     console.log(1);
   },0);

   new Promise(function(resolve){
     resolve();
     console.log(2);
   }).then(console.log(3))

   console.log(4);

   function a() {
     console.log('a');
     Promise.resolve().then(() => {
       console.log('e');
     })
   }

   function b() {
     console.log('b');
   }

   function c() {
     console.log('c');
   }

   function d() {
     setTimeout(a, 0)
     let temp = Promise.resolve().then(b)
     setTimeout(c, 0)
     console.log('d');
   }

   d()
   // d b a c e
   ```

   ```
   async function async1(){
     console.log('async1 start')
     await async2()
     console.log('async1 end')
   }

   async function async2(){
     console.log('async2')
   }

   console.log('script start')

   setTimeout(function(){
     console.log('setTimeOut')
   }, 0)

   async1()

   new Promise(function(resolve){
     console.log('promise1')
     resolve()
   }).then(function(){
     console.log('promise2')
   })

   console.log('script end')

   // script start
   // script start
   // async2
   // promise1
   // script end
   // async1 end
   // promise2
   // setTimeOut
   ```

6. Promise

   ```
   //打印红绿灯: 打印red，停10s，打印yellow，停2s，打印 green 停 5s。 继续打印red，停10s...，以此类推循环5次。

   const red = () => new Promise((resolve, reject) =>  {
     console.log('red');
     setTimeout(() => {
       resolve()
     }, 10 * 1000)
   })

   const yellow = () => new Promise((resolve, reject) =>  {
     console.log('yellow');
     setTimeout(() => {
       resolve()
     }, 2 * 1000)
   })

   const green = () => new Promise((resolve, reject) =>  {
     console.log('green');
     setTimeout(() => {
       resolve()
     }, 5 * 1000)
   })

   const main = (curr, count) => {
     red().then(() => {
       return yellow()
     })
       .then(() => {
         return green()
       })
       .then(() => {
         curr += 1
         if (curr < count) main(curr, count)
       })
   }

   main(0, 5)

   ```

7. 继承

   当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 **proto** ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( **proto** ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

   ES5 的继承机制简单来说就是：实质是先创造子类的实例对象，然后再将父类的方法添加到 this 上面（Parent.apply(this)）

   ES6 的继承实质上是先创建父类的实例对象 this(所以必须先调用父类的 super()方法)，然后再用子类的构造函数修改 this

   es6 的子类必须要调用 super 来生成 this

   es5 (1). 通过原型进行继承，在子类构造函数中调用父类的构造函数两者组合使用实现继承效果

   ```
   function Student(name, age) {
       this.name = name
       this.age = age
   }

   Student.prototype.study = function () {
       console.log('study')
   }

   function collegeStu (name, age, school) {
       Student.call(this, name, age) // 若不指定this，直接调用父类的构造函数，this会指向window
       this.school = school
   }

   //collegeStu1._proto_ === collegeStu.prototype 没有study

   //student1._proto_ === Student.prototype 有study

   //要想找到study方法，就让这个{collegeStu.prototype}对象成为Student的实例对象


   let student1 = new Student('Steven', 10)
   student1.study() // study

   // 让子类大学生的显式原型成为父类，学生的实例对象，同时将构造器指向子类构造函数本身
   collegeStu.prototype = new Student()
   collegeStu.prototype.constructor = collegeStu
   let collegeStu1 = new collegeStu('Allen', 20, 'UNSW')
   collegeStu1.study() // 继承父类的方法，study
   ```

   es6

   1.本质上构造函数只是函数而已，并不是真正的类

   2.用 class 定义一个类，对象中会包含一个 constructor 方法，相当于一个构造函数，也称为构造器，在其中子类可以用 super()函数调用父类的构造方法

   3.类中也可以定义一般的方法，相当于构造函数.prototype 去定义方法

   ```
   class Student {
       constructor(name, age) {
           this.name = name
           this.age = age
       }

       study () {
           console.log('study')
       }
   }

   class collegeStu extends Student {
       constructor(name, age, school) {
           super(name, age)
           this.school = school
       }
   }

   let student1 = new Student('小明'， 10)
   student1.study() // study

   let collegeStu1 = new collegeStu('小华',20,'xxx大学')
   collegeStu1.study() // 继承父类的方法 学习
   ```

   js 实现 extend

   ```
   var obj1 = {'a': 'obj2','b':'2'};
   var obj2 = {name: 'obj3'};
   function extend() {
       var length = arguments.length;
       var target = arguments[0] || {};
       if (typeof target!="object" && typeof target != "function") {
           target = {};
       }
       if (length == 1) {
           target = this;
           i--;
       }
       for (var i = 1; i < length; i++) {
           var source = arguments[i];
           for (var key in source) {
               // 使用for in会遍历数组所有的可枚举属性，包括原型。
               if (Object.prototype.hasOwnProperty.call(source, key)) {
                   target[key] = source[key];
               }
           }
       }
       return target;
   }
   console.log(extend(obj1,obj2));
   ```

   ```
   function inheritPrototype(subType, superType){
       //原型式继承：浅拷贝superType.prototype对象作为superType.prototype为新对象的原型
       // 内部会自带_proto_指向：prototype.\_\_proto\_\_ = superType.prototype;
       var prototype = Object.create(superType.prototype);
       // subType.prototype.\_\_proto\_\_ = superType.prototype;
       subType.prototype = prototype;               // 将子类的原型替换为这个原型
       prototype.constructor = subType;             // 修正原型的构造函数

   }

   function SuperType(name){
       this.name = name;
       this.colors = ["red", "blue", "green"];
   }

   SuperType.prototype.sayName = function(){
       alert(this.name);
   };

   function SubType(name, age){
       SuperType.call(this, name);
       this.age = age;
   }
   // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
   inheritPrototype(SubType, SuperType);
   SubType.prototype.sayAge = function(){
       alert(this.age);
   }

   ```
