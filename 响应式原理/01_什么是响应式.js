let  m = 100

// m发生变化后，以下代码自动执行
console.log(m);
console.log(m*2);
console.log('111');

// m发生变化后
m = 200


// 针对对象的响应式
const obj = {
  name: 'six',
  age: 18
}

// 当obj发生改变后，相关的依赖都会执行
console.log(obj.name);
console.log(obj.age);