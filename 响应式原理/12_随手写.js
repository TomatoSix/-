let activeReactiveFn = null

function watchFn(fn) {
  activeReactiveFn = fn
  // fn必须调用一次，这样才会触发Proxy的set操作
  fn()
  activeReactiveFn = null
}

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)

    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      console.log(fn, 'fn');
      fn()
    })
  }
}

let wk = new WeakMap()
function getDepend(target, key) {
  let map = wk.get(target)
  if (!map) {
    map = new Map()
    wk.set(target, map)
  }
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

function creative(obj) {
  return new Proxy(obj, {
    get: function(target, key, receiver) {
      let depend = getDepend(target, key) 
      depend.depend()
      return Reflect.get(target, key)
    },
    set: function(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      let depend = getDepend(target, key) 
      depend.notify()
    }
  })
}





const obj = {
  name: 'six',
  age: 18
}

const objProxy = creative(obj)

watchFn(() => {
  console.log(objProxy.name, '已自动监听该函数');
  console.log(objProxy.name, '第二次输出');
})

objProxy.name = '番茄'