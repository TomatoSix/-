// 可迭代对象:  要求必须实现@@iterator 方法，在代码中使用 Symbol.iterator 访问该属性
const iteratorObj = {
  names: ["abc", 'cba', 'bac'],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      // 必须使用箭头函数
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        } 
      }
    }
  }
}

// 生成迭代器
const iterator = iteratorObj[Symbol.iterator]()
console.log(iterator.next());  //{ done: false, value: 'abc' }
console.log(iterator.next());  //{ done: false, value: 'cba' }
console.log(iterator.next());  //{ done: false, value: 'bac' }
console.log(iterator.next());  //{ done: true, value: 'undefined' }