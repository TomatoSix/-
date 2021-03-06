# React的特点
1. 采用组件化模式、声明式编程, 提高开发效率和组件复用率
2. 在React Native中可以使用React语法进行移动端开发
3. 使用虚拟DOM+优秀的Diffing算法，尽量减少与真实DOM的交互

# 文件介绍
* babel.min.js 解析JSX语法代码转为JS代码的库
* react.development.js  react核心库
* react-dom.development.js  react扩展库-用于支持react 操作DOM

# 声明式编程 vs 命令式编程
1. 声明式编程
是一种编程范式，它关注的是你要做什么，而不是如何做。它表达逻辑而不显式地定义步骤
2. 命令式编程
描述如何做

```js
const numbers = [1,2,3,4,5];

// 声明式
const doubleWithDec = numbers.map(number => number * 2);

console.log(doubleWithDec)

// 命令式
const doubleWithImp = [];
for(let i=0; i<numbers.length; i++) {
    const numberdouble = numbers[i] * 2;
    doubleWithImp.push(numberdouble)
}

console.log(doubleWithImp)
```







# React自身特点及选型时考虑
# React与VUE的异同
# Virtual DOM
# React生命周期
## 旧版本生命周期


# Diff算法
# 受控组件与非受控组件
# 高阶组件
# Flux架构模式（涉及MVC/MVVM、Flux）
# Redux设计概念、设计原则、方法、redux实现异步流的库
# 纯组件（Pure Component）与shouldComponentUpdate关系
# Redux中的<Provider/>组件与connect函数
# React Fiber架构
# React Hooks的作用及原理



# 自学内容
# 虚拟DOM

## 关于虚拟DOM
React 使用 Virtual DOM 来更新真正的 DOM，从而提高效率和速度。
1. 本质是Object类型的一般对象
2. 虚拟DOM比较"轻"， 真实DOM比较"重"，因为虚拟DOM是React内部在用。无需真实DOM上那么多的属性
3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上 
## 如何设置虚拟DOM（两种方式）

1. 使用JSX创建虚拟DOM
```javascript
  // 1. 创建虚拟DOM，只能有一个根标签
  const VDOM = (
    <h1 id="title">
      <span>Hello, React</span>
    </h1>
  )
  // 2.渲染虚拟DOM到页面,下面这一行不是追加动作，是替换动作
  ReactDOM.render(VDOM, document.getElementById("test"))
```

2. 使用js创建虚拟DOM
```javascript
  // 1. 创建虚拟DOM, React.createElement参数分别为标签名，标签属性，标签内容
  const VDOM = React.createElement('h1', {id: 'title'}, 'Hello, React')
  // 2.渲染虚拟DOM到页面,下面这一行不是追加动作，是替换动作
  ReactDOM.render(VDOM, document.getElementById("test"))
```

# JSX （JavaScript XML）
用来简化创建虚拟DOM
本质是React.createElement(component, props, ...children)方法的语法糖

## JSX语法规则
1. 定义虚拟DOM时，不要写引用
2. 标签中混入JS表达式时用{}
3. 样式的类名指定不要用class，要用className
4. 内联样式，要用style={{key: value}} 双花括号的形式去写
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
  * 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错
  * 若大写字母开头，React去渲染对应的标签，若组件没有定义，则报错
8. {} 可以包含 {}
## JS表达式和JS语句
【JS表达式】一个表达式会产生一个值，可以放在任何一个需要值得地方
        例如： 
        (1) a
        (2) a+b
        (3) demo(1) 函数调用表达式
【JS语句(代码)】
        例如：
        (1) if() {}
        (2) for() {}
        (3) switch() {} 
  


# 模块与组件、模块化与组件化
组件：用来实现局部功能效果的代码和资源的集合

# 函数式组件与类式组件

## 函数式组件-适用于简单组件

```javascript
<script type="text/babel">
  // 1.创建函数式组件 名称首字母必须大写，函数名即组件名
  function Demo() {
    console.log(this) //此处的this是undefined,因为babel编译后开启了严格模式
    return <h2>我是函数定义的组件</h2>
  }

  // 渲染页面到组件
  ReactDOM.render(<Demo/>, document.getElementById('test'))
</script>
```

## 类式组件-适用于复杂组件

### 类的基本知识
  ```javascript
  /*
    总结：
      1. 类中的构造器不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时才写
      2. 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的
      3. 类中所定义的方法，都是放在了类的原型对象上，供实例去使用
  */
  //创建一个Person类
  class Person() {
    //构造器方法
    constructor(name,age) {
      // 构造器中的this是类的实例对象
      this.name = name
      this.age =age
    }

    //一般方法, 放在类的原型对象上，供实例使用
    //通过实例调用一般方法，一般方法中的this是类的实例
    speak() {
      console.log(`我叫${this.name},我的年龄是${this.age}`)
    }
  }

  //创建一个Student类，继承于Person类
  // Student实例.__proto__ === Person  Person.__proto__ === Student
  class Student extends Person { 
    constructor(name, age, grade) {
      super(name, age)  
      this.grade = grade
    }
  }

  //创建一个Person的实例对象
  const p1 = new Person()

  console.log(p1) // Person {} 第一个指类的名称，第二个指实例对象 
  ``` 


### 创建类式组件

  ```javascript
  // 1.创建类式组件，必须继承React.Component( props, state等就是从这里来的)
  class MyComponent extends React.Component {
    // render函数必须写
    // render放在哪里？ --  类MyComponent的原型对象上，供实例使用
    // render中的this是谁 -- MyComponent组件实例对象
    render() {
      return {
        <div>
          创建类式组件
        </div>
      }
    }

    // 2. 渲染组件到页面
    ReactDOM.render(<MyComponent/>, document.getElementById('test'))
    /* 
			执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
					1.React解析组件标签，找到了MyComponent组件。
					2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
					3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
		*/
  } 
  ```



# 组件实例的三大核心属性 state 
   
  ## 错误使用 
   
  ```javascript
  class Weather extends React.Component {
    //constructor可以接收到props参数
    constructor(props) {
      super(props)
      // 初始化状态,实例中自带state属性
      this.state = {isHot: true}
    }
   
    // render会被放到类的原型对象上,render中的this为实例对象
    render() {
      // react中如何绑定事件
      return <h1 onClick={this.demo}>今天天气很{this.state.isHot ? '炎热': '凉爽'}</h1>
    }
    
    // demo和render一样，会被定义到Weather类的原型对象上,供实例使用，所以需要this.demo调用
    demo() {
      /*
      undefined原因
        1. 由于demo是作为onClick的回调，所以不是通过实例调用，是直接调用，demo里的this指向window
        2. 类中的方法默认开启了局部的严格模式，禁止指向window所以demo中的this是undefined 
      */
      console.log(this) //this为undefined
      console.log('被点击了')
    }
  }

  ReactDOM.render(<Weather/>, document.getElementById('test'))
  ```



  ## 正确使用

  ```javascript
  class Weather extends React.Component {
    //constructor可以接收到props参数
    constructor(props) {
      super(props)
      // 初始化状态,实例中自带state属性
      this.state = {isHot: true}
      // 用bind改变this指向
      this.changeWeather = this.changeWeather.bind(this)
    }

    /*
      !!!正确使用 
    */
    render() {
      return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热': '凉爽'}</h1>
    }
    
    // demo和render一样，会被定义到Weather类的原型对象上,供实例使用
    changeWeather() {
      console.log(this) //实例对象
      const isHot = this.state.isHot

      // 状态不可以直接更改，要借助setState进行更新
      // 合并动作，只替换需要的地方
      this.setState( {isHot: !isHot} )
    }
  }

  ReactDOM.render(<Weather/>, document.getElementById('test'))
  ```


  ## state 简写形式

  ```javascript
  class Weather extends React.Component {
    // constructor(props) {
    //   super(props)
    //   this.state = {isHot: true}
    // }

    // 直接赋值，相当于给实例对象添加state属性
    state = {isHot: true}
   
    render() {
      return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热': '凉爽'}</h1>
    }      
    
    // 自定义方法 ———— 要用赋值语句的形式 + 箭头函数
    // 箭头函数没有自己的this，向外寻找，即this为实例对象
    changeWeather =  () => {
      const isHot = this.state.isHot
      this.setState( {isHot: !isHot} )
    }
  }

  ReactDOM.render(<Weather/>, document.getElementById('test'))
  ```

  ## 原生事件绑定的方式
  1. 方法一
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {})
  2. 方法二
  const btn = document.getElementById('btn')
  btn.onclick = function() {}
  3. 方法三
  <button onclick="demo()">按钮</button>
  function demo() {
    alert("按钮被点击了")
  }

# 组件实例的三大核心属性 props

# 组件实例的三大核心属性 refs

# 高阶函数
1. 若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数
2. 若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数
常见的高阶函数有：Promise、setTimeout、arr.map()

* 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

# 生命周期



# Hook 用于解决函数式组件
1. React.useState
```js
function Demo() {
  // count即为state, setCount
  const [count, setCount] = React.useState(0)

  // 加的回调
  function add() {
    // setCount(count+1)  // 第一种写法
    setCount(count => {
      return count+1
    })
  }
  return (
    <div>
      <h2>当前值为{count}</h2>
      <button onClick={add}>点我加一</button>
    </div>
  )
}



```
2. React.useEffect()


3. React.useRef()
```js
const myRef = React.useRef()
```