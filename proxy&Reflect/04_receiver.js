const obj = {
  _name: 'six',
  get name() {
    // 需要使this指向objProxy代理对象， 而不是obj
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}

const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log('get方法被访问', key, receiver); 
    // get方法被访问 name { _name: 'six', name: [Getter/Setter] }
    // get方法被访问 _name { _name: 'six', name: [Getter/Setter] }
    
    
    //Reflect第三个参数可以改变get name()中的this指向
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
  }

})
console.log(objProxy.name);