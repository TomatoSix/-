let activeReactiveFn = null
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null

}

class Depend {
  constructor() {
    this.creativeFns = new Set()
  }

  depend() {
    if (activeReactiveFn) {
      this.creativeFns.add(activeReactiveFn)
    }
  }

  notify() {
    
      this.creativeFns.forEach(fn => fn())
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

      return Reflect.get(target, key, receiver)
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