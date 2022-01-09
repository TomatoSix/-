// 案例一: 生成器替代迭代器
// 创建迭代器
function createArrayIterator(arr) {
  let index = 0
  return {
    next: function() {
      if (index < arr.length) {
        return { done: false, value: arr[index++]}
      } else {
        return { done: true, value: undefined}
      }
    }
  }
}
const names = ['jennie', 'jisoo', '英路']
const namesIterator = createArrayIterator(names)
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

console.log('-----------------');

// 生成器替代迭代器
function* createArrayIterator1(arr) {
  // 方法一
  // for (const item of arr) {
  //   yield item
  // }

  // 方法二
  // yield* 生产一个可迭代对象, 是方法一的语法糖
  yield*  arr
}

const names1 = ['jennie', 'jisoo', '英路']
const namesIterator1 = createArrayIterator1(names1)
console.log(namesIterator1.next()); // { value: 'jennie', done: false }
console.log(namesIterator1.next());
console.log(namesIterator1.next());
console.log(namesIterator1.next());
console.log('----------------------------');

// 案例二: 创建一个函数，这个函数可以迭代一个范围内的数字
// 10 20

// 方法一 使用迭代器
function createRangeIterator(start, end) {
  let index = start
  return {
    next: function() {
      if (index < end) {
        return { done: false, value: index++}
      } else {
        return { done: true, value: undefined}
      }
    }
  }
}

const rangeIterator = createRangeIterator(10, 20)
console.log(rangeIterator.next()); // { done: false, value: 10 }
console.log(rangeIterator.next()); // { done: false, value: 11 }
console.log(rangeIterator.next()); // { done: false, value: 12 }
console.log(rangeIterator.next()); // { done: false, value: 13 }


// 方法二 使用生成器
function* createRangeIterator2(start, end) {
  let index = start
  while (index < end) {
    yield index++
  }
}

const rangeIterator2 = createRangeIterator(1, 5)
console.log(rangeIterator2.next()); // { done: false, value: 1 }
console.log(rangeIterator2.next()); // { done: false, value: 2 }
console.log(rangeIterator2.next()); // { done: false, value: 3 }
console.log(rangeIterator2.next()); // { done: false, value: 4 }