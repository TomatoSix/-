# 数字分类
```js
let str = '13 1 2 3 4 5 6 7 8 9 10 20 16 18'
let arr = str.split(' ').map(item => parseInt(item))
let arrRes = arr.map(item => item%5)
let a=0,b=0,c=0,d=0,e=0,count=0
let flag = true
for (let i=0; i<arr.length; i++) {
  let number = arr[i]
  let numberRes = arrRes[i]

  switch(numberRes) {
    case 0:
      a += number%2 === 0? number:0
      break
    case 1:
      if (flag) {
        b += number
      } else {
        b -= number
      }
      break
    case 2:
      c++
      break
    case 3:
      d += number
      count++
      break
    case 4:
      e = Math.max(e,number)
      break
  }
}
console.log(`${a} ${b} ${c} ${(d / count).toFixed(1)} ${e}`);
```