// 模拟利用回调处理异步代码
// function requestData(url, successCb, failureCb) {
//   setTimeout(() => {
//     if (url === 'coderwhy') {
//       let data = '6666'
//       successCb(data)
//     } else {
//       let errMessage = "请求失败， url错误"
//       failureCb(errMessage)
//     }
//   }, 3000)
// }

// 用Promise处理异步代码
function requestData(url) {
  return new Promise((resolve, reject) => {
    // 利用setTimeout模拟网络请求，利用url模拟返回的数据
    setTimeout(() => {
      resolve(url)
      // if (url === 'coderwhy') {
      //   // 数据返回
      //   let data = '6666'
      //   resolve(data)
      // } else {
      //   let errMessage = "请求失败， url错误"
      //   reject(errMessage)
      // }
    }, 3000)
  })
}

// 需求1 发送一次请求
// const p = requestData("127.0.0.1/getData")
// p.then((res) => {
//   console.log(res, '请求成功');
// }, (err) => {
//   console.log(err, '请求失败');
// })


// 需求2 多次异步调用，每一次请求都要用到上次请求获得的数据
// 1. url = 'six' => res: data1
// 2. url = res + '111' => res: data2
// 3. url = res + '222' => res: data3

// 1. 使用Promise解决， 会产生回调地狱
// requestData("six").then(res => {
//   console.log(res);

//   requestData(res + '111').then(res => {
//     console.log(res);

//     requestData(res + '222').then(res => {
//       console.log(res);
//     })
//   })
// })

// 2. 使用Promise中的返回值来解决
// requestData('six').then(res => {
//   console.log(res);
//   // return会返回一个promise
//   return requestData(res + '111')
// }).then(res => {
//   console.log(res);
//   return requestData(res + '222')
// }).then(res => {
//   console.log(res);
// })


// 3. 使用Promise + generator实现

// 封装一个生成器函数
function* getData() {
  const res1 = yield requestData("six")

  const res2 = yield requestData(res1 + '111')

  const res3 = yield requestData(res2 + '222')

  console.log(res3, '最终结果');
}

// 方案一：手动执行生成器函数
const generator = getData()
generator.next().value.then(res => {
  console.log(res);

  generator.next(res).value.then(res => {
    console.log(res);
    generator.next(res).value.then(res => {
      console.log(res);

      generator.next(res)
    })
  })
})

// 方案二: 自动化执行, 参数为生成器函数
// function execGenerator(genFn) {
//   // 先拿到生成器
//   const generator = genFn()

//   function exec(res) {
//     const result = generator.next(res)
//     if (result.done) {
//       return result.value
//     }

//     result.value.then(res => {
//       exec(res)
//     })
//   }

//   exec()
// }

// execGenerator(getData)


// 方案三： 第三方包co自动执行
// const co = require('co')
// co(getData)

// 4. 使用async/await
// async function getData2() {
//   const res1 = await requestData('six')
//   const res2 = await requestData(res1 + '111')
//   const res3 = await requestData(res2 + '222')
//   console.log(res3, '最终结果');
// }
// getData2()
