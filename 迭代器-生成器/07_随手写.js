function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 3000);
  })
  
}

// 多次调用
// 第一次请求: url
// 第二次请求: url + '111'
// 第三次请求: url + '222'

let url = 'six'

// 1. promise链式调用
// requestData('six').then(res => {
//   console.log(res);
//   requestData(res + '111').then(res => {
//     console.log(res);
//     requestData(res + '222').then(res => {
//       console.log(res);
//     })
//   })
// })

// 2. promise返回结果
// requestData('six').then(res => {
//   console.log(res);
//   return requestData(res + '111')
// }).then(res => {
//   console.log(res);
//   return requestData(res + '222')
// }).then(res => {
//   console.log(res);
// })

// 3. 使用async/await
// async function getData() {
//   const res1 = await requestData('six')
//   console.log(res1);
//   const res2 = await requestData(res1 + '111')
//   console.log(res2);

//   const res3 = await requestData(res2 + '222')
//   console.log(res3);
// }
// getData()


// 4. generator + promise
// 封装一个生成器函数
function* getData() {
  const res1 = yield requestData('six')
  console.log(res1);
  const res2 = yield requestData(res1 + '111')
  console.log(res2);
  const res3 = yield requestData(res2 + '222')
  console.log(res3);
}

// 返回一个生成器
// const generator = getData()
// generator.next().value.then(res => {
//   generator.next(res).value.then(res => {
//     generator.next(res).value.then(res => {
//       generator.next(res)
//     })
//   })
// })


// generator + promise 自动化执行
function execGenerator(genFn) {
  const generator = genFn()

  function exec(res) {
    let result = generator.next(res)
    if (result.done) {
      return result.value
    }
    result.value.then(res => {
      exec(res)
    })
  }
  exec()
   
}
execGenerator(getData)



