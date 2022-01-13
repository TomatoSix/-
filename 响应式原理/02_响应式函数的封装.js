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
let reactiveFns = []
function watchFn(fn) {
  // 把需要响应的函数push进来
  reactiveFns.push(fn)
}
const obj = {
  name: 'why',
  age:18
}
watchFn(function foo() {
  const newName = obj.name
  console.log('123');
  console.log(obj.name);
})
watchFn(function demo() {
  console.log(obj.name);
})

function bar() {
  console.log('普通的其它函数');
  console.log('该函数不需要有任何响应式');
}
// 修改obj.name时foo函数自动执行
obj.name= 'kobe'
reactiveFns.forEach(fn =>{
  fn()
})