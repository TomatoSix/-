
let obj = {
  id: 'six',
  age: 18
}

// 1. 监听obj中某个属性, 利用Object.defineProperty
// Object.defineProperty(obj, "id", {
//   get: function() {
//     console.log("监听name属性");
//   },
//   set: function() {
//     console.log("监听name属性被修改");
//   }
// })

// console.log(obj.id, '2222');
// obj.id = "kebe"

// 2. 监听obj中所有属性
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`Obj对象中${key}被访问`);
      return value
    }, 
    set: function(newVal) {
      console.log(`Obj对象中${key}被修改`);
      value = newVal
    }
  })
})

obj.id = '66' // Obj对象中id被修改
obj.age = 20 // Obj对象中age被修改
console.log(obj.id); // Obj对象中id被访问 66
obj.height = 188 //
// Object.defineProperty的缺点
// 无法监听新增属性、删除属性等操作