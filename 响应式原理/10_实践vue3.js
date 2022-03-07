
// 将函数收集到对应的depend中
let activeReactiveFn = null

// 收集依赖, 每一个对象的每一个属性都应该有对应的depend
class Depend {
  constructor() {
    // this.reactiveFns = []
    // 解决当函数中多次打印属性, depend只添加一次对应的函数
    this.reactiveFns = new Set()
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.push(reactiveFn)
  // }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }

  depend() {
    // 判断是否为空
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }
}



function watchFn(fn) {
  // 利用全局变量获取当前要添加的函数
  activeReactiveFn = fn
  // 默认要执行一次
  fn()
  // 然后重新设置为空
  activeReactiveFn = null

}

// 封装一个获取depend的函数
const wk = new WeakMap()

function getDepend(target, key) {
  // 根据target获取map
  let map = wk.get(target)
  // 第一次设置时没有map
  if (!map) {
    map = new Map()
    wk.set(target, map)
  }
  // 根据key获取depend
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}




function reactive(obj) {
  // 监听对象obj的变化
  return new Proxy(obj, {
    get: function(target, key, receiver) {
      // 在这里收集函数到depend中
      // 获取对应depend
      const depend = getDepend(target, key)
      // depend中添加对应的函数
      // depend.addDepend(activeReactiveFn)
      depend.depend()
      
      return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      // 自动执行函数
      const depend = getDepend(target, key)
      depend.notify()
    }
  })
}


/*
对obj对象实现响应式操作
*/
const obj = {
  name: 'six',
  age: 18
}
const objProxy = reactive(obj)

// 需要监听的函数foo
watchFn(
  function foo() {
    // 用到name的话，该函数会被收集到obj的name属性对应的depend中
    console.log(objProxy.name, '--------name 修改时执行');
    // console.log(objProxy.name, '--------name 修改时执行');
  }
)

// 需要监听的函数
watchFn(
  function() {
    // 用到age的话， 该函数会被收集到obj的age属性对应的depend中
    console.log(objProxy.age,'--------age 修改时执行');
  }
)


objProxy.name = '番茄'
objProxy.age = 20

/*
对info对象实现响应式操作
*/
const info = {
  address: '南京', 
  name: '560'
}
const infoProxy = reactive(info)

watchFn(() => {
  console.log(infoProxy.address, '-------info的address修改时执行');
})

infoProxy.address = "杭州"



// 普通函数
function bar() { 
  console.log('hello');
  console.log('普通函数');
}



/*
依赖收集的数据结构
obj对象
name - nameDepend age - ageDepend

每一个对象都有自己的map, key-对象属性，value-对象属性的depend
const objMap = new Map()
objMap.set('name', 'nameDepend')
objMap.set('age', 'ageDepend')
----------------------------------------------------
info对象
name - nameDepend address - addDepend

const infoMap = new Map()
infoMap.set('name', 'nameDepend')
infoMap.set('address', 'addDepend')


const wk = new WeakMap()
wk.set(obj, objMap)
wk.set(info, infoMap)

去找到obj的name属性对应的depend
const depend = wk.get(obj).get('name')
depend.notify()
*/