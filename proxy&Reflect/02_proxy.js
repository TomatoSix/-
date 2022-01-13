// Proxy - 用于帮助我们创建一个代理

// 监听一个对象的相关操作，可以先创建一个代理对象(Proxy对象)
// 之后对该对象的所有操作，都通过代理对象来完成

const obj = {
  id: 'six',
  age: 20,
  height: 188
}

// 参数：目标对象, 捕获器对象trap
const objProxy = new Proxy(obj, {
  // 可以捕获各种操作
  // {} 表示不重写任何捕获器,会自动完成对目标对象的操作
  // 重写会替代默认的捕获器

  // 1. 获取值时的捕获器, 参数: 目标对象target, 被设置的属性key, 代理对象receiver
  get: function(target, key, receiver) {
    console.log(target, key, receiver ,'111');
    console.log(`监听到对象的${key}属性被访问`);
    return target[key]
  },

  // 2. 设置值时的捕获器, 参数: 目标对象target, 被设置的属性key, 修改的值newValue, 代理对象receiver
  set:function(target, key, newValue, receiver) {
    console.log(`监听到对象的${key}属性被修改`);
    target[key] = newValue
  },

  // 3. 监听in的捕获器, 参数: 目标对象target, 监听属性key
  has: function(target, key){
    console.log('in正在被监听');
    return key in target
  },

  // 4. 监听delete的捕获器
  deleteProperty: function(target, key) {
    console.log('delete正在被监听');
    delete target[key]
  }

})

console.log(obj,'obj');
console.log(objProxy.id);
objProxy.id = 100
console.log(objProxy.id);

// in操作符 get捕获器兼听不到， 需要用到has捕获器
console.log('name' in objProxy); // false
console.log('id' in objProxy); // true

// delete操作, 
delete objProxy.height
console.log(obj, 'obj');  // { id: 100, age: 20 }



// 针对函数的代理
function foo(...args) {
  console.log(args);
}

const fooProxy = new Proxy(foo, {
  apply: function(target, thisArg, argArray) {
    console.log('对foo函数进行了apply调用');
    return target.apply(thisArg, argArray)
  },
  construct: function(target, argArray, newTarget) {
    console.log('对foo函数进行了new调用');
    return new target(...argArray)
  }
})

fooProxy.apply({}, [1,2])
new fooProxy(1,2,3)