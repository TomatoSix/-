// 用生成器替代迭代器使用
function* createArrayIterator(arr) {
  let index = 0

  // yield*写法：要求后面跟上可迭代对象
  yield* arr
  // 就是下面的语法糖
  // for (const item of arr) {
  //   yield item
  // }
}

const names = ["abc", 'cba', 'nba']
const nameIterator = createArrayIterator(names)

console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());

// 案例二
// 创建一个函数，这个函数可以迭代一个范围内的数字
function* createRangeIterator(start, end) {
  let index = start

  while (index < end) {
    yield index++
  }
  // return {
  //   next: function() {
  //     if (index < end) {
  //       return {done: false, value: index++}
  //     } else {
  //       return {done: true, value: undefined}
  //     }
  //   }
  // }
}

const rangeIterator = createRangeIterator(10,13)
console.log(rangeIterator.next()); // { done: false, value: 10 }
console.log(rangeIterator.next()); // { done: false, value: 11 }
console.log(rangeIterator.next()); // { done: false, value: 12 }
console.log(rangeIterator.next()); // { done: true, value: undefined }