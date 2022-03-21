# setup

1. 组件中所用到的数据、方法等等，均配置在 setup 中

```js
setup() {
  let name='张三'
  let age = 18

  function sayHello() {
    alert(name, age)
  }

  return {
    name, age, sayHello
  }
}
```

# ref 函数

1. 定义一个响应式数据
   创建一个包含响应式数据的引用对象 RefImpl(reference implement) 引用实现
2. - ref 把基本数据类型的变量'name'加工为引用对象，借助 Object.defineProperty()中的 get 和 set 完成的
   - 把对象'job'加工为 Proxy 代理对象，借助 reactive 函数

```js
setup() {
  let name = ref('张三')
  let age = ref(18)

  function changeInfo() {
    console.log(name)  // RefImpl {_rawValue: '张三'，value: '张三'} 对象
  }

  return {
    name, age, changeInfo
  }
}
```

3. 操作数据需要 ×××.value

```js
setup() {
  let name = ref('张三')
  let age = ref(18)
  let job = ref({
    type: '前端工程师',
    salary: '30k'
  })

  function changeInfo() {
    // 修改name 和 age job
    name.value = "李四"
    age.value = 48
    jon.value.type = '测试'
  }

  return {
    name, age, changeInfo
  }
}
```

# reactive 函数

作用: 定义一个对象类型的响应式数据(基本数据类型不能用，只能用 ref)
const 代理对象 = reactive(源对象) 接受一个对象，返回一个代理对象
操作数据可以直接修改

```js
setup() {
  let name = ref('张三')
  let age = ref(18)
  let job = reactive({
    type: '前端工程师',
    salary: '30k'
  })
  let hobby = reactive(['你好','我们','认识吗'])

  function changeInfo() {
    // 修改name 和 age job
    name.value = "李四"
    age.value = 48
    job.type = '测试'
    hobby[2] = '不认识'
  }

  return {
    name, age, changeInfo
  }
}
```

# Vue3 响应式原理

## vue2 响应式原理

```js
let person = {
  name: "张三",
  age: 18,
};
let p = {};
Object.defineProperty(p, "name", {
  get() {
    // 有人读取name时调用
    return person.name;
  },
  set(value) {
    //有人修改name时调用
    person.name = value;
  },
});
Object.defineProperty(p, "age", {
  get() {
    return person.age;
  },
  set(value) {
    person.age = value;
  },
});
```

## vue3 为什么要使用 proxy?

1. Object.defineProperty 无法监听数组的变化
   proxy 可以直接监听数组的变化；
2. Object.defineProperty 只能劫持对象的属性，因此需要对每个对象的每个属性进行遍历
3. proxy 可以监听对象而非属性.它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
   Proxy 直接可以劫持整个对象,并返回一个新对象。

## vue3 响应式原理

- 通过 Proxy 代理：拦截对象中任意属性的变化，包括：属性值的读写、属性得添加、属性的删除等等
- 通过 Reflect 反射： 对源对象的属性进行操作

1. proxy
   对 p(代理对象)进行增删改查会反映到 person(目标对象)上
   ```js
   let person = {
     name: "张三",
     age: 18,
   };
   // p 代理对象 第一个参数person 目标对象  第二个参数{} 处理程序对象
   let p = new Proxy(person, {
     // 读取属性时调用
     // 参数 target目标对象 propName属性
     get(target, propName) {
       console.log(`有人读取了p身上的${propName}属性`);
       return target[propName];
     },
     // 修改、新增属性时调用
     // 参数 target 目标对象 propName 属性  value 值
     set(target, propName, value) {
       console.log(`有人修改了p身上的${propName}属性`);
       target[propName] = value;
     },
     // 删除属性时调用
     deleteProperty(target, propName) {
       console.log(`有人删除了p身上的${propName}属性`);
       return delete target[propName];
     },
   });
   ```
2. Reflect 反射
   ```js
   // 修改对象可以用Reflect
   let obj = {
     a: 1,
     b: 2,
   };
   Reflect.get(obj, "a"); //1
   // obj {a: 1, b: 2}
   Reflect.set(obj, "a", 666); // true
   // obj {a: 666, b: 2}
   Reflect.deleteProperty(obj, "a"); // true
   // obj { b: 2}
   ```
   - 如果使用 Object.defineProperty,追加属性如果重名可能会报错，导致整个代码瘫痪，而 Reflect 不会
   ```js
   let obj = { a: 1, b: 2 };
   Object.defineProperty(obj, "c", {
     get() {
       return 3;
     },
   });
   Object.defineProperty(obj, "c", {
     get() {
       return 4; // Uncaught TypeError
     },
   });
   ```
   - Reflect 可以输出对象 x1 查看代码有没有执行成功
   ```js
   // 修改对象可以用Reflect
   let obj = {
     a: 1,
     b: 2,
   };
   const x1 = Reflect.defineProperty(obj, "c", {
     get() {
       return 3;
     },
   });
   // x1 true
   const x2 = Reflect.defineProperty(obj, "c", {
     get() {
       return 4;
     },
   });
   //x2 false
   ```
3. vue3 响应式原理
   ```js
   let person = {
     name: "张三",
     age: 18,
   };
   // p 代理对象 第一个参数person 目标对象  第二个参数{} 处理程序对象
   let p = new Proxy(person, {
     // 读取属性时调用
     // 参数 target目标对象 propName属性
     get(target, propName) {
       console.log(`有人读取了p身上的${propName}属性`);
       return Reflect.get(target, propName);
     },
     // 修改、新增属性时调用
     // 参数 target 目标对象 propName 属性  value 值
     set(target, propName, value) {
       console.log(`有人修改了p身上的${propName}属性`);
       Reflect.set(target, propName, value);
     },
     // 删除属性时调用
     deleteProperty(target, propName) {
       console.log(`有人删除了p身上的${propName}属性`);
       return Reflect.deleteProperty(target, propName);
     },
   });
   ```

# ref 与 reactive 对比

1. 从定义数据角度对比
   ref 用来定义：基本数据类型， 对象数据类型(它内部会自动通过 reactive 转为代理对象)
   reactive 用来定义： 对象（或数组）类型数据
2. 从原理角度对比
   ref 通过 Object.defineProperty()的 get 和 set 来实现响应式(数据劫持)
   reactive 通过使用 Proxy 来实现响应式(数据劫持)，并通过 Reflect 操作源对象内部的数据
3. 从使用角度对比：
   ref 定义的数据： 操作数据需要 ×××.value， 读取数据时模板中直接读取不需要.value
   reactive 定义的数据：操作数据与读取数据均不需要.value

# v-model

`<input v-model="searchText" /> `
本质上就是
`<input :value="searchText" @input="searchText = $event.target.value">`

# computed

```js
import {computed, reactive} from 'vue'

export default {
  setup() {
    let person = reactive({
      firstName = '王',
      lastName = '明'
    })
    // 1. computed简写形式
    // person.fullName = computed(() => {
    //   return person.firstName + '-' + person.lastName
    // })

    // 2. computed完整写法
    person.fullName = computed(() => {
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(value) {
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })
  }
}
```

# watch

1. watch 监视 ref 数据
   参数：
   1. ref 数据
   2. 触发函数
   3. 配置{ immediate: true }
2. watch 监视 reactive 数据

   1. 无法获取了正确的 oldValue
   2. 如果监视的是一整个 reactive 数据对象，强制开启了深度监视, deep 配置无效
   3. 监视 reactive 对象中的某个属性，第一个参数要写成一个函数，例如 `watch(() => person.name, (newValue, oldValue) => {console.log("属性改变了")})`
   4. 监视 reactive 对象中的某些属性，数组中写函数
   5. 监视 reactive 对象中的某个属性(是一个对象), 需要开启 deep 配置

   ```js
   import {ref, watch} from 'vue'
   setup() {
     let sum = ref(0)
     let msg = ref('你好啊')

     // 监视ref的多个响应式数据
     // watch参数: 变量名， 响应函数， 配置
     // 1. 方法一, 写多个watch,
     watch(sum, (newValue, oldValue) => {
       console.log("sum 变了")
     }, { immediate: true })
     watch(msg, (newValue, oldValue) => {
       console.log("msg 变了")
     })
     // 2. 方法二: 数组形式, 谁改变谁, 谁调用这个函数
     watch([sum, msg], (newValue, oldValue) => {
       console.log('谁改变输出谁')
     })

     consol.log('-------------------------------')

     let person = reactive({
       name: "six",
       age: 18,
       job: {
         a: {
           salary: '20k'
         }
       }
     })
     // 1. 监视person整个对象的变化
     // 用reactive不能正确获取oldValue
     // watch(person, (newValue, oldValue) => {
       console.log("属性改变了")
     // })
     // 2. 监视person对象中的某个属性
     watch(()=> person.name, (newValue, oldValue) => {
       console.log("属性改变了")
     })
     // 3. 监视person对象中的某些属性, 数组里面写函数
     watch([() => person.name, () => person.age], (newValue, oldValue) => {
       console.log("属性改变了")
     })
     // 4. 监视person对象中的某个属性是一个对象，例如person.job, 需要开启深度监听
     watch(() => person.job, (newValue, newValue) => {
       console.log("属性改变了")
     })



     return {
       sum,
       msg,
       person
     }
   }
   ```

3. watch 监视 ref 数据， 到底要不要`.value`

   1. 监视 ref 基本数据, 不需要`.value`
   2. 监视 ref 引用数据,
      1. 如果 `.value`, .value 是一个 proxy 对象(reactive 封装的)，监视的就是 reactive 定义的数据
      2. 如果不加，加 deep: true 属性

   ```js
   import {ref, watch} from 'vue'
   setup() {
     let sum = ref(0)
     let msg = ref('你好啊')
     let person = ref({
       name: "six",
       age: 18,
       job: {
         a: {
           salary: '20k'
         }
       }
     })
     // 监视ref基本数据
     watch(sum, (newValue, oldValue) => {
       console.log("数据修改了")
     })
     // 监视ref引用数据
     watch(person.value.name, (newValue, oldValue) =>{
       console.log("数据修改了")
     })






     return {
       sum,
       msg,
       person
     }
   }
   ```

# watchEffect

1. 不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
2. watchEffect 有点像 computed,
   1. 但是 computed 注重的是计算出来的值(回调的返回值)，所以必须要写返回值
   2. watchEffect 更注重过程(回调函数的函数体)，所以不用写返回值

```js
import {ref, watch, watchEffect} from 'vue'
setup() {
  let sum = ref(0)
  let msg = ref('你好啊')
  let person = reactive({
    name: "six",
    age: 18,
    job: {
      a: {
        salary: '20k'
      }
    }
  })
  // 1. 监视person整个对象的变化
  // 用reactive不能正确获取oldValue
  watch(sum, (newValue, oldValue) => {
    console.log("属性改变了")
  })

  watchEffect(() => {
    const x1 = sum.value
    console.log("watchEffect被调用了")
  })




  return {
    sum,
    msg,
    person
  }
}
```

# 自定义 hook

本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装
类似于 vue2 中的 Mixin

```js
import { ref } from "vue";
// 引入hooK文件
import usePoint from "hook文件";
export default {
  setup() {
    let sum = ref(0);
    let point = usePoint();
    return {
      sum,
      point,
    };
  },
};
```

```js
import { reactive, onMounted， onBeforeUnmount } from "vue";

// hooks文件
export default function savePoint() {
  let point = reactive({
    x: 0,
    y: 0,
  });

  function savaPoint(e) {
    point.x = e.pageX;
    point.y = e.pageY;
  }
  onMounted(() => {
    window.addEventListener("click", savaPoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", savaPoint);
  });

  return Point
}
```

# toRef 和 toRfs

作用: toRef 创建一个 ref 对象，其 value 值指向另一个对象中的某个属性
将响应式对象中的某个属性单独提供给外使用

```js
import { toRef, ref, reactive, toRefs } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });
    // 会报错，相当于直接把值赋给了name, age, salary,失去了响应式
    // return {
    //   name: person.name,
    //   age: person.age,
    //   salary: person.job.j1.salary
    // }

    // 解决方法
    // 方法一: 直接返回一整个reactive响应式数据
    // return {
    //   person,
    // };
    // 方法二: 使用toRef, 参数：对象, 属性
    const name = toRef(person, "name");
    const age = toRef(person, "age");
    const salary = toRef(person.job.j1, "salary");
    return {
      name,
      age,
      salary,
    };
    // 方法三: 使用toRefs
    return {
      // 只能把第一层拆出
      // 即 name, age, job
      ...toRefs(person),
    };
  },
};
```

# shallowReactive 与 shallowRef

1. shallowReactive 浅层次的响应式
   只处理对象最外层属性的响应式
2. shallowRef

   1. 如果传入的是基本对象类型，和 ref 没有区别
   2. 如果传入的是对象类型，不进行响应式处理

   ```js
   import {ref, shallowReactive} from 'vue'
   setup() {
     let person = reactive({
       name:'six',
       age: 18,
       job: {
         j1: {
           salary: 20
         }
       }
     })
     return {
       person
     }
   }
   ```

# readonly 与 shallowReadonly

1. readOnly: 让一个响应式数据变为只读的
2. shallowReadonly: 让一个响应式数据变为只读的(浅只读)

# toRaw 与 marginRaw

# customRef

创建一个自定义的 Ref, 并对其依赖项跟踪和更新触发进行显式控制
customRef 要求传入一个函数，该函数要求返回一个对象，有 get 和 set

```js
customRef((track, trigger) => {
  return {
    get() {},
    set() {},
  };
});
```

1. 案例, input 框输入数据，延迟 1s 后在下方输出

```
<template>
  <input type="text" v-model="keyWord">
  <h3>{{keyWord}}<h3>
</template>
```

```js
import { ref, customRef } from "vue";
export default {
  setup() {
    // 自定义一个ref: myRef
    function myRef(value) {
      return customRef((track, trigger) => {
        let timer;
        return {
          get() {
            console.log("读取数据");
            // 通知vue追踪数据keyWord的改变，看看谁要数据
            track();
            return value;
          },
          set(newValue) {
            console.log("修改数据");
            clearTimeout(timer);
            // 1. 修改数据
            value = newValue;
            // 2. 通知vue去重新解析模板
            // trigger();
            setTimeout(() => {
              trigger;
            }, 1000);
          },
        };
      });
    }
    // let keyWord = ref("hello"); // 使用vue提供的ref
    let keyWord = myRef("hello"); // 使用自定义的ref
    return {
      keyWord,
    };
  },
};
```

# provide 与 inject

实现祖孙组件间通信

```js
import {reactive, provide } from 'vue'
// 组组件
setup() {
  let car = reactive({
    name: "奔驰",
    price: '40'
  })
  // 给后代组件传递数据
  // 参数: 数据名称， 数据变量
  provide('car', car)

  return {
    car
  }
}
```

```js
import {inject} from 'vue'
// 孙组件
setup() {
  // 如何获取组组件的数据, 传入数据名称
  let car = inject('car')
  return {
    car
  }
}
```

# fragment 组件

# teleport 组件

# suspense 组件
