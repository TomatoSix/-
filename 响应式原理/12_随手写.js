let activeReactiveFn = null

class Depend{
  constructor() {
    this.reactiveFns = new Set()
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
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

function reactive(obj) {
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

const objProxy = reactive(obj)

watchFn(() => {
  console.log(objProxy.name, '已自动监听该函数');
  console.log(objProxy.name, '第二次输出');
})

objProxy.name = '番茄'