https://juejin.cn/post/6844903959283367950

# ES6 新增内容（说出 12 种）

1. let、const 和 var 的概念与区别
2. 变量提升与暂时性死区
3. 变量的解构赋值
4. 箭头函数及其 this 问题
5. Symbol 概念及其作用、 BigInt
6. Set 和 Map 数据结构
7. Proxy
8. Reflect 对象
9. Promise（手撕 Promise A+规范、Promise.all、Promise 相关 API 和方法）
10. Iterator 和 for...of（Iterator 遍历器的实现）
11. 循环语法比较及使用场景（for、forEach、for...in、for...of）
12. Generator 及其异步方面的应用
13. async 函数
14. 几种异步方式的比较（回调、setTimeout、Promise、Generator、async）
15. class 基本语法及继承
16. 模块加载方案比较（CommonJS 和 ES6 的 Module）
17. ES6 模块加载与 CommonJS 加载的原理

# ES6 ES7 ES8 ES9 新特性

1.  ES6

    1. let const [let] 解构赋值
    2. 模板字符串
    3. 函数的默认参数
    4. 函数的剩余参数
    5. 箭头函数
    6. 拓展运算符(展开语法)
    7. Symbol
    8. Set
    9. promise

2.  ES7

    - includes
    - 指数运算符(2\*\*10)

3.  ES8

    - async/await
    - String Padding
    - Object.getOwnPropertyDescriptors
    - Object.values() Object.entries()

4.  ES9(ES2018)

    - Async iterators 迭代器
    - Object spread operators 对象展开运算符
    - Promise finally
    - replaceAll

5.  ES10

    - flat 铺平数组
    - flatMap 首先使用映射函数映射每个元素，然后将结果铺平成数组
    - Object.fromEntries() 将 entries 转为对象
    - trimStart trimEnd
    - Symbol description

6.  ES11

    - BigInt
    - Nullish Coalescing Operator 空值合并运算
    - 可选链
    - globalThis 浏览器和 nodejs 中都可以使用的全局对象
    - for...in 标准化 用于遍历对象的 key(针对不同浏览器有不同的实现)
    - import 动态导入
    - promise.allSettled
    - import meta

7.  ES12
    - finalizationRegistry
    - WeakRef
    - logical assignment operator 逻辑赋值运算

# 1. var let const 定义变量三者区别 和 暂时性死区

https://juejin.cn/post/6844903752139276301

## var 特点

1. 存在变量提升
   即变量可以在声明之前使用，值为 undefined

## let 和 const 特点

1. 不存在变量提升
   它所声明的变量一定要在声明后使用，否则会报错

2. 重复声明报错

```js
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```

3. 不绑定全局作用域

```js
var value1 = "张三";
let value2 = "李四";
const value3 = "王五";
console.log(window.value1); // 张三
console.log(window.value2); // undefined
console.log(window.value3); // undefined
```

4. 块级作用域
   声明的变量仅在块级作用域内有效

5. const 用于声明常量
   1. 指定基本数据类型，不能修改;指定引用数据类型，代表的是指针,属性值可以修改
   - const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
   - 对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量
   - 对于复杂数据类型，变量指向的内存地址实际是一个指向实际数据的指针
   2. const 声明后必须马上赋值(初始化)，否则会报错

## 暂时性死区（TDZ temporal Dead Zone）

在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。 凡是在声明之前就是用这些变量，就会报错

```js
typeof x; // ReferenceError
let x;

typeof undeclared_variable; // "undefined"
```

## 为什么需要块级作用域？

1. 内层变量可能会覆盖外层变量

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
```

变量提升，导致内层的 tmp 变量覆盖了外层的 tmp 变量

2. 用来计数的循环变量泄露为全局变量

```js
var s = "hello";

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

变量 i 在循环结束后并没有消失，泄露成了全局变量

# 2. 标签模板字符串

react 中使用 styled-components 插件实现 js 和 css 分离

```js
// 第一个参 数是模板字符串中整个字符串，只是被切成多块，放到了一个数组中
// 第二个参数是模板字符串中第一个${}
function foo(m, n) {
  console.log(m, n); //['我', '叫', '番茄炒小六', '!'] 1
}
const a = 1,
  b = 2,
  c = 3;
foo`我${a}叫${b}番茄炒小六${c}!`;
```

# 3. 函数的默认参数

- 有默认值的形参最好放到最后

1. 默认参数

```js
// 1.传入基本类型时
function add(m = 3, n = 2) {
  console.log(m, n, m + n);
}
add(1, 3); // 1 3 4
add(); // 3 2 5
add(undefined, undefined); // 3 2 5

// 2.传入对象时
function add(info = { name: "番茄", age: 18 }) {
  const { name, age } = info;
  console.log(name, age); // 小六 19
}
add({ name: "小六", age: 19 });
```

2. length 属性

```js
function fun(a, b, c) {
  console.log(fun.length);
}
fun(1, 2, 3); //3

function fun2(a, b, c = 2) {
  console.log(fun2.length); //2
}
fun2(1, 2);
```

# 4. 函数的剩余参数

1. 剩余参数和 arguments 的区别?
   1. 剩余函数只包含那些没有对应形参的实参，而 arguments 对象包含传给函数的所有实参
   2. arguments 对象不是一个真正的数组，rest 参数是一个真正的数组，可以进行数组的所有操作

```js
function foo2(m, n, ...args) {
  console.log(m, n); // 1 2
  console.log(args); // [3, 4, 5]
  console.log(arguments); // [1,2,3,4,5]
}

foo2(1, 2, 3, 4, 5);
```

# 6. 拓展运算符

- 分别可以扩展数组、字符串、对象

```js
const arr = [1, 2, 3];
const str = "why";
const info = { name: "小六", age: 18 };
function foo(x, y, z) {
  console.log(x, y, z);
}

foo(...arr); // 1 2 3
foo(...str); // w h y
const obj = { ...info, height: 188 }; // 浅拷贝
console.log(obj); // {name: '小六', age: 18, height: 188}
```

# 进制表示

```js
const num1 = 100;
// b => binary
const num2 = 0b100; //二进制
// o => octonary
const num3 = 0o100; //八进制
// x => hex
const num4 = 0x100; //十六进制
// ES12 大的数值连接符
const num = 10_000_000_000;
```

# 7. Symbol

- ES6 知识点详解 1

```js
const s1 = Symbol("name");
console.log(s1); //Symbol(name)
```

对象中的 key 既可以用字符串，也可以用 Symbol 值

# Set

1. Set 函数可以接受一个数组作为参数，用来初始化

   ```js
   const set = new Set([1, 2, 3, 4, 4]);
   console.log(set); // { 1, 2, 3, 4 }

   const arr = Array.from(set); //转化为 数组
   const arr = [...set]; //转化为 数组
   ```

2. 两个空对象总是不相等的

   ```js
   let set = new Set();
   set.add({});
   set.add({});
   console.log(set); // { {},{} }
   ```

   ```js
   let set = new Set();
   const obj = {};
   set.add(obj);
   set.add(obj);
   console.log(set); // { {} }
   ```

3. Set 的操作方法  
   `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。  
   `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。  
   `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为 Set 的成员。  
   `Set.prototype.clear()`：清除所有成员，没有返回值。

4. Set 的遍历方法(键值和键名是同一个值)
   `Set.prototype.keys()`：返回键名的遍历器  
   `Set.prototype.values()`：返回键值的遍历器  
   `Set.prototype.entries()`：返回键值对的遍历器  
   `Set.prototype.forEach()`：使用回调函数遍历每个成员
   `for (const item of set)`

   ```js
   let set = new Set([1, 2, 3, 4, 5]);

   console.log(set); // { 1, 2, 3, 4, 5 }

   for (let item of set) {
     console.log(item); //1 2 3 4 5
   }

   for (let item of set.keys()) {
     console.log(item); //1 2 3 4 5
   }

   for (let item of set.values()) {
     console.log(item); //1 2 3 4 5
   }

   for (let item of set.entries()) {
     console.log(item); //[1,1] [2,2] [3,3] [4,4] [5,5]
   }

   console.log(set.keys()); // [1, 2, 3, 4, 5]
   console.log(set.entries()); //{1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5}
   ```

5. Set 的其他属性  
   Set.size

# WeakSet

1. WeakSet 的成员只能是对象，而不能是其他类型的值
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
3. WeakSet 不可遍历
4. WeakSet

   ```js
   // 方式一
   const ws = new WeakSet([
     [1, 2],
     [3, 4],
   ]); // WeakSet {[1, 2], [3, 4]}

   // 方式二
   let obj = { name: "why" };
   const ws = new WeakSet();
   ws.add(obj);

   console.log(ws);
   ```

5. WeakSet 的操作方法
   `WeakSet.prototype.add(value)`：向 WeakSet 实例添加一个新成员。
   `WeakSet.prototype.delete(value)`：清除 WeakSet 实例的指定成员。
   `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

6. 应用场景

   ```js
   const personSet = new WeakSet()
   class Person {
     constructor() {

     }
     running() {
       if (!personSet.has(this) {
         throw new Error("不能通过非构造方法创建出来的对象调用running方法")
       }
     }
   }

   let p = new Person()
   p.running()
   p = null
   ```

# Map

概念： 它类似于对象，也是键值对的集合，但是"键"的范围不限于字符串，各种类型的值都可以当做键。
对象只接受字符串作为键名，提供了"字符串-值"的对应，map 结构提供了"值-值"的对应。

1. 可以传入数组 必须为[ [], [] ]的形式

   ```js
   const map2 = new Map([
     ["name", "小六"],
     ["age", 18],
   ]);
   console.log(map2); // {'name' => '小六', 'age' => 18}
   ```

2. map 的操作方法

   1. `map.set(key,value)`
   2. `map.get(key)`
   3. `map.has(key)`
   4. `map.delete(key)`
   5. `map.clear()`

3. map 的遍历方法

   1. `map.keys()` 返回键名
      ```js
      for (let key of map.keys()) {
        console.log(key);
      }
      ```
   2. `map.values()` 返回键值
   3. `map.entries()` 返回所有成员
      ```js
      for (let [key, value] of map.entries()) {
        console.log(key, value);
      }
      ```
   4. `map.forEach()`
   5. `for (const [key, value] of map)`

4. size 属性

# WeakMap

1. WeakMap 只接受对象作为键名，不接受其它类型的值作为键名
2. WeakMap 的键名所指向的对象，不计入垃圾回收机制
3. WeakMap 弱引用的只是键名(中的对象引用)，而不是键值。键值依然是正常引用
4. 不能遍历
5. 应用场景
   Vue3 响应式原理

## WeakMap 解决了什么问题？

它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存；WeakMap 里面的键名对象和所对应的键值对也会自动消失，不用手动删除引用

# promise

JS 中进行异步编程的新解决方案

https://juejin.cn/post/6844904077537574919#heading-16

## 异步编程有哪些？

1. fs 文件操作
2. 数据库操作
3. AJAX
4. 定时器

## promise 优点

1. 指定回调函数的方式更加灵活
   启动异步任务 => 返回 promise 对象 => 给 promise 对象绑定回调函数(甚至可以在异步任务结束后指定多个)
2. 支持链式调用，可以解决回调地域问题

## 什么是回调地狱？

```js
fs.readFile("1.json", (err, data) => {
  fs.readFile("2.json", (err, data) => {
    fs.readFile("3.json", (err, data) => {
      fs.readFile("4.json", (err, data) => {});
    });
  });
});
```

```js
// 套娃
asyncFunc1(opt, (...args) => {
  asyncFunc2(opt, (...args) => {
    asyncFunc3(opt, (...args) => {
      // some operation
    });
  });
});
```

## promisify

将回调函数封装成返回 promise 对象
传入一个遵循常见的错误优先的回调风格的函数(即以(err, value) => ...回调作为最后一个参数)，并返回一个 promise 的版本

## promise 方法

1.  Promise.race
    接受一组异步任务，然后并行执行异步任务，只保留第一个执行完成的一步操作的结果，其他的方法仍然在执行，不过执行结果会被抛弃

    ```js
    const p1 = new Promise((resolve, reject) => {
      reject("p1");
    });
    const p2 = new Promise((resolve, reject) => {
      resolve("p2");
    });
    const p3 = new Promise((resolve, reject) => {
      resolve("p3");
    });

    Promise.race([p1, p2, p3])
      .then((res) => {
        console.log(res, "res"); //p1
      })
      .catch((res) => {
        console.log(res, "2222");
      });
    ```

2.  Promise.all
    所有 Promise 结果成功才返回
    接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调

    ```js
    const p1 = new Promise((resolve, reject) => {
      resolve("p1");
    });
    const p2 = new Promise((resolve, reject) => {
      reject("p2");
    });
    const p3 = new Promise((resolve, reject) => {
      reject("p3");
    });

    Promise.all([p1, p2, p3])
      .then((res) => {
        console.log(res, "res");
      })
      .catch((res) => {
        console.log(res, "2222"); // p2 2222
      });
    ```

3.  Promise.allSettled
    返回所有结果

    ```js
    const p1 = new Promise((resolve, reject) => {
      resolve("p1");
    });
    const p2 = new Promise((resolve, reject) => {
      reject("p2");
    });
    const p3 = new Promise((resolve, reject) => {
      reject("p3");
    });

    Promise.allSettled([p1, p2, p3])
      .then((res) => {
        console.log(res, "res");
        // [{status: 'fulfilled', value: 'p1'},
        // {status: 'rejected', reason: 'p2'},
        // {status: 'rejected', reason: 'p3'}]
      })
      .catch((res) => {
        console.log(res, "2222");
      });
    ```

4.  Promise.any
    any 方法会等到一个 fulfilled 状态，才会决定新 Promise 状态;
    如果过所有的 promise 都是 reject 的， 也会等到所有的 Promise 都变成 rejected 状态

    ```js
    const p1 = new Promise((resolve, reject) => {
      reject("p1");
    });
    const p2 = new Promise((resolve, reject) => {
      resolve("p2");
    });
    const p3 = new Promise((resolve, reject) => {
      resolve("p3");
    });

    Promise.any([p1, p2, p3])
      .then((res) => {
        console.log(res, "res"); //p2
      })
      .catch((res) => {
        console.log(res, "2222");
      });
    ```

5.  Promise.resolve
6.  Promise.reject
7.  Promise.prototype.then
8.  Promise.prototype.catch
9.  Promise.prototype.finally
    1. finally 不管 Promise 对象最后的状态如何都会执行
    2. finally 方法的回调函数不接受任何的参数
    3. 它最终返回的默认会是上一次的 Promise 对象值，不过如果抛出的是一个异常则返回异常的 Promise 对象

## promise 手写

Promise 是一个对象，从它可以获取异步操作的消息

Promise 的状态一经改变就不能再改变

```js
    let p = new Promise((resolve,reject) => {
        resolve('OK')
    });
    p.then(value =>{
        console.log(value);
    },reason =>{
        console.log(reason)
    })

    -----------------------------------------------
    class Promise {
      constructor(executor) {
        const resolve = () => {

        }

        const reject = () => {

        }
      }
    }
```

# Iterator 迭代器

- 确使用户在容器对象上遍访的对象，使用该接口无需关心对象的内部实现细节
- 迭代器是一个帮助我们对某个数据进行遍历的对象

1. 迭代器概念

   迭代器是一个对象，符合迭代器协议
   迭代器对象有一个 next 函数，返回一个对象，该对象有 done 和 value 属性
   `const iterator = { next: function() { return { done: , value: } }}`

   1. next 函数
      一个无参函数，返回一个拥有 done 和 value 两个属性的对象

   2. 创建一个数组迭代器

      ```js
      const name = ["abc", "def", "ghi"];
      const nums = [1, 2, 3, 4, 5];

      function createArrayIterator(arr) {
        let index = 0;
        return {
          next: function () {
            if (index < arr.length) {
              return { done: false, value: arr[index++] };
            } else {
              return { done: true, value: undefined };
            }
          },
        };
      }

      let namesIterator = createArrayIterator(name);
      console.log(namesIterator.next());
      console.log(namesIterator.next());
      console.log(namesIterator.next());
      console.log(namesIterator.next());
      ```

2. 可迭代对象概念

   当一个对象实现了可迭代协议(iterable protocol)时，它就是一个可迭代对象。要求必须实现@@iterator 方法，在代码中使用 [Symbol.iterator] 访问该属性，[Symbol.iterator]会返回一个迭代器
   `const iterableObj = { [Symbol.iterator]: function() { return 迭代器}}`

   ```js
   // 可迭代对象
   const iterableObj = {
     favName: ["英路", "守护", "jisoo"],
     [Symbol.iterator]: function () {
       let index = 0;
       return {
         next: () => {
           if (index < this.favName.length) {
             return { done: false, value: this.favName[index++] };
           } else {
             return { done: true, value: undefined };
           }
         },
       };
     },
   };
   console.log(iterableObj[Symbol.iterator]); // function
   // 如何使用
   // 生成一个迭代器
   const iterator2 = iterableObj[Symbol.iterator]();
   console.log(iterator2.next()); // { done: false, value: '英路' }
   console.log(iterator2.next()); // { done: false, value: '守护' }
   console.log(iterator2.next()); // { done: false, value: 'jisoo' }
   console.log(iterator2.next()); // { done: true, value: undefined }

   // 可迭代对象应用
   // for...of 可以遍历的东西必须是可迭代对象, 将next中的value赋值到item中
   for (let item of iterableObj) {
     console.log(item); //英路 守护 jisoo
   }
   ```

3. 原生可迭代对象

   事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象
   String, Array, Map, Set, arguments 对象, NodeList 对象

   1. 可迭代对象的应用场景
      展开运算符、 解构赋值、for of、 yield
      Array.from() 中传入可迭代对象
      new Set() 中传入可迭代对象
      Promise.all 中传入可迭代对象

4. 自定义类的可迭代性
   该类创建出来的对象默认是可迭代的，在设计类的时候添加上@@iterator 方法

   ```js
   // 创建一个classroom类，创建出来的对象都是可迭代对象
   // 教室中有自己的位置、名称、当前教室的学生
   // 这个教室可以进来新学生
   // 创建的教室对象是可迭代对象

   class Classroom {
     constructor(address, name, students) {
       this.address = address;
       this.name = name;
       this.students = students;
     }
     entry(newStudents) {
       this.students.push(newStudents);
     }

     // 封装可迭代方法
     [Symbol.iterator]() {
       let index = 0;
       return {
         next: () => {
           if (index < this.students.length) {
             return { done: false, value: this.students[index++] };
           } else {
             return { done: true, value: undefined };
           }
         },
         // 想要监听中断的话， 可以添加return方法
         return: () => {
           console.log("迭代器提前终止了");
           return { done: true, value: undefined };
         },
       };
     }
   }
   const c1 = new Classroom("207", "计算机教室", ["英路", "守护"]);
   // const c2 = new Classroom('231', '酷儿教室', ['英路', '守护'])
   // const c3 = new Classroom('207', '计算机教室', ['英路', '守护'])

   c1.entry("jisoo");
   for (const item of c1) {
     console.log(item); // 英路 守护 jisoo
     // break 会去调用return
     if (item === "守护") break;
   }
   ```

# Generator 生成器

生成器是 ES6 中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候暂停执行、继续执行等

1. 生成器函数与普通函数的区别

   1. 生成器函数需要在 function 的后面加一个符号\*
   2. 生成器函数可以通过 yield 关键字来控制函数的执行流程
   3. 生成器函数的返回值是一个 Generator(生成器)

2. 如何使用
   以及 next()、 throw()、 return()的使用

   ```js
   // 当遇到yield时暂停函数的执行, yield后面的值会放到next()返回对象的value中
   // 当遇到return时生成器就停止执行, return后面的值会放到next()返回对象的value中
   // next(x) 会把x作为上一个yield的返回值
   function* foo() {
     console.log("函数开始执行");

     const value1 = 1;
     console.log("第一段代码", value1);

     // yield 会把后面的值value1放到next()返回对象的value中
     // next(10) 会作为上一个yield的返回值
     const n = yield value1;

     const value2 = 200 * n;
     console.log(n, "n"); // 10 n
     console.log("第二段代码", value2); //第二段代码 2000
     yield value2;

     const value3 = 300;
     console.log("第三段代码", value3);
     yield;

     console.log("函数执行结束");
     // 会把return的值赋值到next()返回对象的value中
     return "结束";
   }

   // 调用生成器函数时，会给我们返回一个生成器对象
   const generator = foo();

   console.log(generator.next());
   // 函数开始执行 1 { value: 1, done: false }
   console.log(generator.next(10));
   // 10 n
   // 第二段代码 2000
   // { value: 2000, done: false }
   generator.next();
   // 第二段代码 300
   console.log(generator.next());
   // 第三段代码 300
   // 函数执行结束
   // { value: '结束', done: true }
   ```

3. 生成器替代迭代器使用

4. yield x == return {done: false, value: x}

# Generator 生成器(特殊的迭代器)(six)

1. ES6 知识点
   异步编程解决方案

   https://es6.ruanyifeng.com/#docs/generator

   ```js
   function* helloWorldGenerator() {
     yield "hello";
     yield "world";
     return "ending";
   }

   var hw = helloWorldGenerator();

   console.log(hw.next());
   // { value: 'hello', done: false }

   console.log(hw.next());
   // { value: 'world', done: false }

   console.log(hw.next());
   // { value: 'ending', done: true }

   console.log(hw.next());
   // { value: undefined, done: true }
   ```

   第一次调用，Generator 函数开始执行，直到遇到第一个 yield 表达式为止。next 方法返回一个对象，它的 value 属性就是当前 yield 表达式的值 hello,done 属性的值为 false,表示遍历还没有结束。

   - 特征
     1. function 关键字与函数名之间有一个星号
     2. 函数体内部使用 yield 表达式，定义不同的内部状态

2. 生成器概念
   生成器是 ES6 新增的一种函数控制、使用的方案。它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行

   ```js
   function* foo() {
     console.log("函数开始执行");
     console.log(1);
     yield;

     console.log(2);
     yield;

     console.log(3);
     yield;

     console.log("函数执行结束");
   }

   // 函数调用会返回一个迭代器
   const generator = foo();

   generator.next(); //函数执行开始 1
   generator.next(); //2
   generator.next(); //3
   generator.next(); //函数执行结束
   ```

# Async await

## async 函数

1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定

```js
async function main() {
  // 如果返回值是一个非Promise类型的数据，结果：返回一个结果为521的成功的promise对象
  return 521;
  // 如果返回值是一个Promise对象
  return new Promise((resolve, reject) => {
    resolve("OK"); //返回一个结果为OK的成功Promise对象
    reject("Error"); //返回一个结果为error的错误promise对象
  });

  throw "Oh No"; //返回一个结果为Oh No的错误promise对象

  let result = main();
  console.log(result);
}
```

## await 表达式

1. await 右侧的表达式一般为 promise 对象，也可以是其它的值
2. 如果表达式是 promise 对象，await 返回的是 promise 成功的值
3. 如果表达式是其它值，直接将此值作为 await 的返回值

4. await 必须写在 async 函数中，但 async 函数中可以没有 await
5. 如果 await 的 promise 失败了，就会抛出异常，需要通过 try..catch 捕获处理

## 题目

1. 执行 async 函数，返回的是 Promise 对象
   如果返回的是普通的值，就会封装成一个 promise 返回
   如果返回的 Promise,就返回 promise 对象

```js
async function test1() {
  return 1;
}

async function test2() {
  return Promise.resolve(2);
}

const result1 = test1();
const result2 = test2();
result1; //Promise {<fulfilled>: 1}
result2; //Promise {<pending>}
```

2. Promise.then 成功的情况对应 await

```js
async function test1() {
  const p3 = Promise.resolve(3);
  p3.then((data) => {
    console.log("data", data); // data 3
  });

  const data3 = await p3;
  console.log("data3", data3); // data 3
}

async function test4() {
  const data4 = await 4; //相当于await Promise.resolve(4)
  console.log("data4", data4); //data4  4
}

async function test5() {
  const data5 = await test1();
  console.log("data5", data5); //data5 1
}
```

3. Promise.catch 异常的情况 需要用 try...catch

```js
async function test6() {
  const p6 = Promise.reject(6);
  const data6 = await p6;
  console.log("data6", data6); // Uncaught (in promise)  6
}

async function test6() {
  const p7 = Promise.reject(7);
  try {
    const data7 = await p7;
    console.log("data7", data7);
  } catch (e) {
    console.log("e", e); // e 6
  }
}
```

# proxy 代理

Proxy 就像在目标对象之间的一个代理，任何对目标的操作都要经过代理。代理就可以对外界的操作进行过滤和改写。
可以拦截某些操作并实现自定义行为
元编程

1. 有哪些捕获器(13 个)

   1. get() 属性读取操作的捕获器
   2. set() 属性设置操作的捕获器
   3. has() in 操作符的捕获器
   4. deleteProperty() delete 操作符的捕获器
   5. handler.getPrototypeOf()
      Object.getPrototypeOf 方法的捕获器

   6. handler.setPrototypeOf()
      Object.setPrototypeOf 方法的捕获器
   7. handler.isExtensible() 监听是否可以扩展

   8. handler.preventExtensions()

   9. handler.getOwnPropertyDescriptor()

   10. handler.defineProperty()

   11. handler.ownKeys()

   12. handler.apply() 函数调用操作符的捕获器

   13. handler.construct() new 操作符的捕获器

# Reflect

内置对象，它提供了可拦截 Javascript 操作的方法

1. 将 Object 对象的一些明显属于语言内部的方法(比如 Object.defineProperty),放到 Reflect 对象上
2. 修改某些 Object 方法的返回结果，让其变得更合理。
   比如，Object.defineProperty(obj,name,desc)在无法定义属性时，会抛出一个错误，而
   Reflect.defineProperty(obj, name, desc)则会返回 false

   ```js
   const obj = {
     id: "six",
     age: 18,
   };
   const objProxy = new Proxy(obj, {
     get: function (target, key, receiver) {
       // return target[key]
       // 通过语言内部target[key]获取
       return Reflect.get(target, key);
     },
     set: function (target, key, newValue, receiver) {
       // target[key] = new Value 和下面代码效果相同
       Reflect.set(target, key, newValue);
     },
   });

   objProxy.id = "66";
   console.log(objProxy.name);

   // 通过语言内部target[key]获取
   ```

## 13 个内置属性

Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

## Receiver 参数的作用

# 观察者模式

指函数自动观察数据对象，一旦对象有变化，函数就会自动执行

# 模块化加载

前端模块化：CommonJS,AMD,CMD,ES6
https://juejin.cn/post/6844903576309858318#heading-3
「万字进阶」深入浅出 Commonjs 和 Es Module
https://juejin.cn/post/6994224541312483336

## CommonJS 使用

node 中对 CommonJS 进行了支持和实现
CommonJS 规范的核心变量: exports 、module.exports 、require

1. 使用

   ```js
   // 导出方法一
   let name = "六";
   let age = 18;
   exports.name = name;
   exports.age = age;
   ```

   ```js
   // 导出方法二
   const info = {
     name: "六",
     age: 18,
   };

   // 将对象暴露出去
   // 把info对象赋值给module.exports
   module.exports = info;
   ```

   ```js
   // 导入方法 require
   const bar = require("./bar.js");
   // 或者
   const { name, age } = require("./bar.js");
   ```

2. 原理 | module.export 和 exports 区别
   对象赋值，通过 require 函数把导出的对象赋值到另一个模块的标识符上， 通过标识符拿到同一个对象

   ```js
   // 源码
   module.exports = {};
   exports = module.exports;
   // 最终导出的是 module.exports
   // exports.name = 'six'相当于在module.exports中添加name属性
   ```

3. require 查找规则
   require(X)

   1. X 是一个 Node 核心模块， 比如 path, http
      直接返回核心模块
   2. X 是以./等开头
      1. 第一步： X 作为一个文件进行查找
         1. 如果有后缀名，按照后缀名的格式查找对应的文件
         2. 如果没有后缀名
            1. 直接查找文件 X
            2. 查找 X.js 文件
            3. 查找 X.json 文件
            4. 查找 X.node 文件
      2. 第二步： X 作为一个目录，去查找目录下面的 index 文件
         1. X/index.js 文件
         2. X/index.json 文件
         3. X/index.node 文件
   3. X 不是路径，也不是核心模块, 第三方自定义模块
      去 node_modules 找， 从内向外
      例如`require('axios')`

4. 模块的加载过程

   1. 模块在被第一次引入时，模块中的 js 代码会被运行一次
   2. 模块被多次引入时，会缓存(每个模块对象 module 都一个 loaded 属性)，最终只加载(运行)一次
   3. 有循环引入，加载顺序为深度优先算法

5. 缺点
   Commonjs 加载模块是同步的，只有等到对应的模块加载完毕，当前模块中的后续内容才能被运行。
   如果将它应用到浏览器， 浏览器加载 js 文件需要从服务器将文件下载下来再运行，
   同步就意味着后续的 js 代码都无法正常运行，即使是一些简单的 DOM 操作

## ES Module 使用

采用 export 和 import 关键字来实现模块化，自动采用严格模式

1. 导出使用

   1. export 声明语句

   ```js
   export const name = "six";
   ```

   2. export 导出和声明分开

   ```js
   const name = "six";
   const age = 18;
   function foo() {
     console.log("hello");
   }
   // {}是固定语法，不是对象
   export { name, age, foo };
   ```

2. 导入使用

   ```js
   // 分别导入
   import { name, age, foo } from "./foo.js";
   ```

   ```js
   // 起别名
   import { name, age, foo as Ifoo } from "./foo.js";
   ```

   ```js
   // 将导出的所有内容放到一个标识符中
   import * as foo from "./foo.js";
   ```

3. 结合使用(例如工具库的封装)
   建立 index.js 文件，全部导入文件，再统一导出

   1. 方法一

   ```js
   //index.js文件
   import { add, sub } from "./utils/math.js";
   import { format, timeFormat } from "./utils/time.js";

   export { add, sub, format, timeFormat };
   ```

   2. 方法二

   ```js
   //index.js文件
   export { add, sub } from "./utils/math.js";
   export { format, timeFormat } from "./utils/time.js";
   ```

   3. 方法三

   ```js
   //index.js文件
   export * from "./utils/math.js";
   export * from "./utils/time.js";
   ```

4. 默认导出(default)

   ```js
   // 默认导出只能有一个
   const name = "六";
   const age = 18;
   const foo = "foo";

   export { name, age };
   export default foo;
   ```

   ```js
   import foo from "./foo.js";
   ```

5. import 异步加载

   ```js
   // import 函数返回的结果是一个Promise
   // 不会阻塞后续代码的进行
   import("./foo.js").then((res) => {
     // res是一个模块
     console.log(res);
   });
   ```

6. ES11 meta 属性

   ```js
   // 一个对象， import的url
   console.log(import.meta);
   ```

7. ES Module 原理
   1. 构建阶段
      根据地址查找 js 文件，并且下载，将其解析成模块记录(Module Record)
   2. 实例化
      对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向对应的内存地址
   3. 运行
      运行代码，计算值，并且将值填充到内存地址中

## AMD 规范

AMD - Asynchronous Module Definition(异步模块定义)
采用的是异步加载模块
需要借助 require.js 库

1. require.js 的使用

   1. 下载 require.js

   2. 定义 HTML 的 script 标签引入 require.js 和定义入口文件 main.js
      `<script src="./lib/require.js" data-main="./main.js"></script>`
      data-main 属性的作用是在加载完 src 的文件后会加载执行该文件
   3. main.js 文件中

      ```js
      // 指定模块路径
      require.config({
        baseUrl: './src'
        // 注册foo.js和bar.js文件
        paths: {
          foo: "foo",
          bar: "bar",
        },
      });
      // 执行基本操作
      require(["foo"], function (foo) {
        console.log(foo);
      });
      ```

   4. bar.js 文件中

      ```js
      define(["foo"], function (foo) {
        console.log("--------");

        console.log("bar:", foo);
      });
      ```

## CMD 使用

CMD - Common Module Definition(通用模块定义)
采用的是异步加载模块
实现方案有 sea.js 库

1. sea.js 的使用

   1. html 中引入 sea.js 和 定义入口文件 main.js
      `<script src="./lib/sea.js" data-main="./main.js"></script>`

   2. main.js 文件中

      ```js
      // 会传递三个参数
      define(function (require, exports, module) {
        // 导入
        const foo = require("./foo");
        // 使用
        console.log(foo);
      });
      ```

   3. foo.js 中

      ```js
      define(function (require, exports, module) {
        const name = "six";
        const age = 18;
        function sum(a, b) {
          return a + b;
        }

        //导出
        module.exports = {
          name,
          age,
          sum,
        };
      });
      ```

## 其它

1. 为什么要使用模块化

   1. 防止命名冲突
   2. 更好的分离，按需加载
   3. 更好的复用性
   4. 更高的维护性

2. 没有模块化之前,利用立即执行函数

   ```js
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
   (function () {
     if (moduleA.isFlag) {
       console.log("我的名字是" + moduleA.name);
     }
   })();
   ```

3. ES6 模块和 CommonJS 模块的差异

   (1)CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
   (2)CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
   (3)CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段

# ES7-ES12

## ES7

1. array.includes

   ```js
   [1, 2, 3].includes(1); // true
   ```

2. 指数运算符

   ```js
   // 3的二次方
   let res = Math.pow(3, 2); //9
   let res = 3 ** 3; //27
   ```

## ES8

1. async/await

2. Object.values() Object.entries()

```js
let map = { name: "1", age: 10 };
for (let [key, value] of Object.entries(map)) {
  console.log(key, value); // name 1 age 10
}

for (let value of Object.values(map)) {
  console.log(value); // 1 10
}
```

3. String Padding

4. Object.getOwnPropertyDescriptors

   获取属性描述符

## ES9

1. Async iterators 迭代器
2. Object spread operators 展开运算符
3. Promise finally

## ES10

1. flat

2. flatMap

   首先使用映射函数映射每个元素，然后将结果压缩成数组

   ```js
   const arr = ["my name", "hello wxh", "wo xiang qiqi"];
   const res = arr.flatMap((item) => {
     return item.split(" ");
   });
   console.log(res); // ['my', 'name', 'hello', 'wxh', 'wo', 'xiang', 'qiqi']
   ```

3. Object.fromEntries()

   通过 Object.entries()将对象转换成 entries
   通过 Object.fromEntries()将 entries 转换成对象

   - 应用场景

     ```js
     const queryString = "name=why&age=18&height=188";
     const queryParams = new URLSearchParams(queryString);
     console.log(queryParams);
     const res = Object.fromEntries(queryParams);
     console.log(res); //{name: 'why', age: '18', height: '188'}
     ```

4. trimStart trimEnd

## ES11

1. BigInt

2. Nullish Coalescing Operator 空值合并运算符(??)

   ```js
   // 当 foo 为 '' null undefined 0 false 时，选择后面的默认值
   let foo = false;
   let bar = foo || "默认值";
   console.log(bar); //默认值
   ```

   ```js
   // 只有foo为null或undefined时, bar才选择后面的值
   let foo = null;

   let bar = foo ?? "默认值";
   console.log(bar); //默认值
   ```

3. 可选链 (属性?.属性)

   - 为了防止某属性为 undefined

   ```js
   const info = {
     name: "why",
     friend: {
       name: "lilei",
       girlfriend: {
         name: "hmm",
       },
     },
   };

   const info2 = {
     name: "why",
     friend: {
       name: "lilei",
     },
   };

   console.log(info2.friend.girlfriend?.name); //undefined

   // 从undefined中获取属性会报错：Cannot read properties of undefined
   console.log(info.friend.girlfriend.name); //报错,因为不存在girlfriend属性，为undefined.
   ```

4. globalThis
   nodejs 中没有 window 全局对象,有 global 全局对象
   浏览器中有 window 全局对象
   globalThis 表示全局对象, 在 nodejs 和浏览器环境中都可以使用

   ```js
   // node环境下的全局对象
   console.log(global);
   console.log(globalThis);
   ```

   ```js
   // 浏览器环境下的全局对象
   console.log(window);
   console.log(globalThis);
   ```

## ES12

1. finalizationRegistry
2. WeakRef
3. logical assignment operator 逻辑赋值运算

```js
// 判断Info有没有值
let res = info && info.name;
```

```js
// 语法糖
let res &&= info.name

```
