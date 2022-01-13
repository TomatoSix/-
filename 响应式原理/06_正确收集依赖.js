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


// 封装一个收集需要调用的函数
let activeReactiveFn = null
function watchFn(fn) {
  // 把需要响应的函数放入正确的依赖中
  // 1. 找到depend对象
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

// 封装一个获取depend的函数
const targetMap = new WeakMap()
function getDepend(target, key){
  // 根据target获取Map
  let map = targetMap.get(target)
  if (!map) {
    // 初次使用不存在map
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend= new Depend()
    map.set(key,depend)
  }
  return depend
}

//对象的响应式
const obj = {
  name: 'why', // 每一个属性都有一个depend对象
  age: 18
}

// 监听对象的属性变化: Proxy/Object.defineProperty
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // 根据target和key获取对应的depend
    const depend = getDepend(target, key)
    // 给depend添加对应的函数
    depend.addDepend(activeReactiveFn)


    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // 监听自动调用notify
    // depend.notify()
    let depend = getDepend(target, key)
    // console.log(depend.reactiveFns);
    depend.notify()
    
  }
})

watchFn(function foo() {
  console.log('第一个函数开始');
  const newName = objProxy.name
  console.log('123');
  console.log(objProxy.name);
})
watchFn(function demo() {
  console.log('第二个函数开始');
  console.log('demo');
})
watchFn(function() {
  console.log(objProxy.age, 'age正在被监听');
})

function bar() {
  console.log('普通的其它函数');
  console.log('该函数不需要有任何响应式');
}

console.log('--------------------------');
// 自动监听对象的变化
objProxy.name= 'kobe'
// objProxy.age = 200


/*
const info={
  address: '杭州市'
}

watchFn(function() {
  console.log(info.address, '监听address变化');
})
watchFn(function() {
  console.log('address属性调用该方法');
})

// obj对象
// name： depend
// age: depend
const objMap= new Map()
objMap.set("name", "nameDepend")
objMap.set("age", "ageDepend")

// info对象
// address: depend
const infoMap= new Map()
infoMap.set("address", "addressDepend")

// 用weakMap来保存objMap和infoMap
const targetMap = new WeakMap()
targetMap.set(obj, objMap)
targetMap.set(info, infoMap)
//  获取name depend
const nameDepend = targetMap.get(obj).get("name")
*/