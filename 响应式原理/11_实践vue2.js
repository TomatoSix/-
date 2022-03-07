let activeReactiveFn = null


function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
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


function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      let depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)

      let depend = getDepend(target, key)
      depend.notify()
    }
  })
}







var obj = {
  name: 'six',
  age: 18
}

const objProxy = reactive(obj)

watchFn(() => {
  console.log(objProxy.name, 'name被修改过');
})

objProxy.name = '番茄'