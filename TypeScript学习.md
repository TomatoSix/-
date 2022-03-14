最全的 TypeScript 学习指南

# 基本类型有哪些

number string boolean 字面量 any unknown void never object array tuple enum

1. 字面量类型

```ts
// 直接使用字面量进行类型声明
let a: 10;
a = 10;
a = 11; //报错

// 可以使用 | 来连接多个类型(联合类型)
let c: string | boolean;
c = true;
c = "hello";
```

2. any 表示任意类型，相对于对该变量关闭了 TS 的类型检测

```ts
let d: any;
d = 10;
d = "hello";
d = true;

// 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any(隐式的any)
let d;
d = 10;
d = "hello";
d = true;

let s: string;
s = d;
```

3. unknown 表示未知类型的值

```ts
let e: unknown;
e = 10;
e = "hello";
e = true;

let s: string;
s = e; //报错，把未知类型的变量赋值给其它变量会报错

// 解决 类型断言 告诉解析器变量的实际类型
// 语法一
s = e as string; //告诉解析器e的类型为string
// 语法二
s = <string>e;
```

4. void 设置函数的返回值

```ts
// void 用来表示空， 以函数为例，就表示没有返回值的函数，有返回值就报错
function fn(): void {
  return true; //函数类型判断为boolean
}
```

5. never 表示永远不会返回结果

```ts
function fn(): never {
  throw new Error("报错了");
}
```

6. object 对象

```ts
// {}用来指定对象中可以包含哪些属性
let b: { name: string; age: number };
b = { name: "孙悟空", age: 18 };

// 属性名后面加上一个? 表示属性是可选的
let c: { name: string; age?: number };
c = { name: "猪八戒" };

// [propName: string]: any 表示任意类型的属性
let d: { name: string; [propName: string]: any };
d = { name: "孙悟空", age: 18, gender: "男" };

// 通过箭头函数设置函数结构的类型声明

// 表示希望d是一个函数，有两个参数，都是number， 返回值类型也是number
let d: (a: number, b: number) => number;
```

7. array 数组的类型声明
   类型[]
   Array<类型>

```ts
let e: string[]; //表示字符串数组

let f: number[]; //表示数值数组
let g: Array<number>; //表示数值数组
```

8. tuple 例[4,5] 固定长度数组
   [类型, 类型, 类型]

```ts
let h: [string, string];
```

9. enum 例 enum{A,B} 枚举，TS 中新增类型

```ts
// 定义枚举
enum Gender {
  Male = 0,
  Female = 1,
}
let i: { name: string; gender: Gender };
i = {
  name: "孙悟空",
  gender: Gender.Male, //'male'
};
```

10. 类型的别名

```ts
type myType = 1 | 2 | 3 | 4;
let k: myType;
let l: myType;
let m: myType;
```

```ts
// 描述一个对象的类型
type myType = {
  name: string,
  age: number
}

const obj: myType = {
  name: '七七'，
  age: 4
}
```

# 编译选项

# 类

```ts
class Person {
  // 定义实例属性
  name: string = "孙悟空";

  // 在属性前使用static关键字可以定义类属性(静态属性)
  static age: number = 10;
  // readonly开头的属性表示一个只读的属性无法修改
  static readonly height: number = 180;

  // 定义实例方法
  sayHello() {
    console.log("hello 大家好");
  }

  // 定义类方法 + static
  static sayHello2() {
    console.log("hello 大家好2");
  }
}

const per = new Person();
```

```ts
class Dog {
  // 构造函数会在对象创建时调用
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  bark() {
    alert("嘤嘤嘤");
  }
}
```

# 构造函数和 this

# 继承

```ts
class Animal {
  name: string;
  age: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log("动物在叫");
  }
}

class Dog extends Animal {
  // 方法重写： 子类覆盖父类的方法
  sayHello() {
    console.log(`${this.name} 嘤嘤嘤`);
  }
}

class Cat extends Animal {
  sayHello() {
    console.log(`${this.name} 喵喵喵`);
  }
}
```

# super

```ts
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHello() {
    console.log('动物在叫')
  }
}

class Dog extends Animal {
  age: number

  // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
  constructor(name:string, age: number) {
    super(name)
    this.age = age
  }

  sayHello() {
    // 在类的方法中super就表示当前类的父类
    super.sayHello()
  }
}

const dog = new Dog(name: '旺财', age: 3)
dog.sayHello()  //动物在叫
```

# 抽象类

```ts
/*
  以abstract开头的类是抽象类，
        抽象类和其他类区别不大，只是不能用来创建对象
        抽象类就是专门用来被继承的类, 不能创建实例


        抽象类中可以添加抽象方法
*/
abstract class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }

  // 定义一个抽象方法
  // 抽象方法使用abstract开头， 没有方法体
  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
  abstract sayHello(): void
}

class Dog extends Animal {

  sayHello() {
    console.log('汪汪汪')
  }
}

const dog = new Dog(name: '旺财', age: 3)
dog.sayHello()  //汪汪汪

const animal = new Animal(name: '动物')  //报错
```

# 接口

接口用来定义一个类的结构,用来定义一个类中应该包含哪些属性和方法
同时接口也可以当成类型声明去使用

1. 接口可以重复声明

   ```ts
   interface myInterface {
     name: string
     age: number
   }

   const obj: myInterface = {
     name: '七七'
     age: 4
   }
   ```

   ```ts
   interface myInterface {
     name: string
     age: number
   }

   interface myInterface {
     gender: string
   }

   const obj: myInterface = {
     name: '七七'
     age: 4
     gender: '男'
   }
   ```

2. 接口可以在定义类的时候去限制类的结构

   接口中的所有属性都不能有实际的值
   接口只定义对象的结构，而不考虑实际值
   在接口中所有的方法都是抽象方法

   ```ts
   interface myInter {
     name: string;
     sayHello(): void;
   }
   ```

   定义类时，可以使类去实现一个接口
   实现接口就是使类满足接口的要求

   ```ts
   class MyClass implements myInter {
     name: string;

     constructor(name: string) {
       this.name = name;
     }
     sayHello() {
       console.log("嘤嘤嘤");
     }
   }
   ```

# 属性的封装

```ts
class Person{
  /*
  TS可以在属性前添加属性的修饰符
  public 修饰的属性可以在任意位置访问(修改) 默认值
  private 私有属性，私有属性只能在类内部进行访问(修改)
      -通过在类中添加方法使得私有属性可以被外部访问

  protected 受包含的属性，只能在当前类和当前类的子类中修改
  */
  private _name: string
  private _age: number

  constructor(name: string, age: number) {
    this._name = name
    this._age = age
  }
  // 定义方法，用来获取name属性
  getName() {
    return this.name
  }
  // 定义方法，用来设置name属性
  setName(value: string) {
    this._name = value
  }

  // TS中设置getter方法的方式 getter setter
  get name() {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
}
const per = new Person(name: '孙悟空', age: 18)

// 现在属性是在对象中设置的，属性可以任意的被修改
// 属性可以任意被修改将会导致对象中的数据变得非常不安全
// 例如
// per.name = '猪八戒'
// per.age = -38
per.setName('猪八戒')
```

等价写法

```ts
class C {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

```ts
class C {
  constructor(public name: string, public age: number);
}
```

# 泛型

```ts
function fn(a: any): any {
  return a;
}
```

在定义函数或是类时，如果遇到类型不明确就可以使用泛型

```ts
function fn<T>(a: T): T {
  return a;
}
// 可以直接调用具有泛型的函数
fn(10); //不指定泛型，TS可以自动对类型进行推断
fn<string>("hello"); //指定泛型
```

```ts
interface Inter{
  length: number
}

function fn3<T extends Inter(a: T): number> {
  return a.length
}
```
