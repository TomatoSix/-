/*
const obj = {
  name: 'why',
  age:18
}

function foo() {
  const newName = obj.name
  console.log('123');
  console.log(obj.name);
}
function demo() {
  console.log(obj.name)
}
function bar() {
  console.log('普通的其它函数');
  console.log('该函数不需要有任何响应式');
}
// 要求：修改obj.name时使得foo、demo函数自动执行
obj.name= 'kobe'
*/

// 封装一个响应式的函数
// let reactiveFns = []
// 定义函数收集的类
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}
const depend = new Depend()

function watchFn(fn) {
  // 把需要响应的函数push进来
  depend.addDepend(fn)
}
//对象的响应式
const obj = {
  name: 'why',
  age:18
}

// 监听对象的属性变化: Proxy/Object.defineProperty
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // 监听自动调用notify
    depend.notify()
  }
})

watchFn(function foo() {
  const newName = objProxy.name
  console.log('123');
  console.log(objProxy.name);
})
watchFn(function demo() {
  console.log(objProxy.name);
})
watchFn(function() {
  console.log(objProxy.age, 'age正在被监听');
})

function bar() {
  console.log('普通的其它函数');
  console.log('该函数不需要有任何响应式');
}

// 自动监听对象的变化
objProxy.name= 'kobe'
// depend.notify()