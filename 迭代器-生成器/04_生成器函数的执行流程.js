// 当遇到yield时暂停函数的执行
// 当遇到return时生成器就停止执行
function* foo() {
  console.log("函数开始执行");

  const value1 = 1
  console.log('第一段代码',value1);
  
  // yield 会把后面的值value1放到next()返回对象的value中
  // next(10) 会作为上一个yield的返回值
  const n = yield value1
  
  const value2 = 200 * n
  console.log(n, 'n'); // 10 n
  console.log('第二段代码', value2); //第二段代码 2000
  yield value2

  const value3 = 300
  console.log('第三段代码',value3);
  yield

  console.log("函数执行结束");
  // 会把return的值赋值到next()返回对象的value中
  return '结束'
}

// 调用生成器函数时，会给我们返回一个生成器对象
const generator = foo()

console.log(generator.next());
// 函数开始执行 1 { value: 1, done: false }
console.log(generator.next(10));
// 10 n
// 第二段代码 2000
// { value: 2000, done: false }
generator.next() 
// 第二段代码 300
console.log(generator.next());
// 第三段代码 300
// 函数执行结束
// { value: '结束', done: true }


console.log('---------------------------------------');

// 第二段代码
function* foo2() {
  console.log("函数开始执行");

  const value1 = 1
  console.log('第一段代码',value1);

  const n = yield value1
  
  const value2 = 200 * n
  console.log(n, 'n'); 
  console.log('第二段代码', value2); 
  yield value2

  const value3 = 300
  console.log('第三段代码',value3);
  yield

  console.log("函数执行结束");
  return '结束'
}
const generator2 = foo2()
console.log(generator2.next());
// 不会执行接下去的代码, 会把return里的值作为next()返回对象的value, 并且整段代码停止执行
console.log(generator2.return(15));


console.log('-----------------------------------');

// 第三段代码
function* foo3() {
  console.log("函数开始执行");

  const value1 = 1
  console.log('第一段代码',value1);

  // const n = yield value1
  try {
    yield value1
  } catch (error) {
    console.log("捕获到异常情况", error);
  }


  console.log('第二段代码开始执行');
  const value2 = 200 
  console.log('第二段代码', value2); 
  yield value2

  console.log('第三段代码开始执行');
  const value3 = 300
  console.log('第三段代码',value3);
  yield

  console.log("函数执行结束");
  return '结束'
}
const generator3 = foo3()
console.log(generator3.next());
// 抛出异常, 用try catch金子那个捕获
console.log(generator3.throw('error message'));
