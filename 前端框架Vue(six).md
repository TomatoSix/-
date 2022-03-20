「自我检验」熬夜总结 50 个 Vue 知识点，全都会你就是神！！！
https://juejin.cn/post/6984210440276410399

最全的 Vue 面试题+详解答案
https://juejin.cn/post/6961222829979697165

1. 什么是 SPA 单页面应用？

   SPA( single-page application)

   1. 概念：
      仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

   2. 优点：

      1. 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
      2. 基于上面一点，SPA 相对对服务器压力小；
      3. 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

   3. 缺点：

      1. 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
      2. 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
      3. SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

2. 为什么 vue 组件中 data 必须是一个函数？

   对象为引用类型，当复用组件时，由于数据对象都指向同一个 data 对象，当在一个组件中修改 data 时，其他重用的组件中的 data 会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object 的实例），引用地址不同，则不会出现这个问题。

3. vue 组件通讯方式
   vue 中 8 种组件通信方式, 值得收藏!
   https://juejin.cn/post/6844903887162310669

   Vue3 的 8 种和 Vue2 的 12 种组件通信，值得收藏
   https://juejin.cn/post/6999687348120190983

   1. props/$emit
      $emit 绑定一个自定义事件, 当这个语句被执行时, 就会将参数 arg 传递给父组件,父组件通过 v-on 监听并接收参数。

      ```js
      // 父组件
      <article :article="articleList">
      export default {
        data() {
          return {
            articleList: ['西游记', '红楼梦']
          }
        }
      }
      ```

      ```js
      // 子组件
      export default {
        props: ["article"],
      };
      ```

   2. $parent/$child
      父实例使用 this.$children访问子实例，
      子实例使用 this.$parent 访问父实例
   3. provide/inject

      ```js
      provide: function() {
        return {
          getIndexRef: () => {
            // 返回一整个父组件
            return this
          }
        }
      }
      ```

      ```js
      inject: ["getIndexRef"];
      // 调用getIndexRef函数获取父组件
      this.getIndexRef();
      ```

   4. $attrs/$listeners
   5. $refs
      1. 设置 ref，给组件打标识
         `ref="组件名"`
      2. 如何获取
         `this.$refs.组件名`|`this.$refs['组件名']`
   6. eventBus
      `vc.prototype.proto` === `vue.prototype` vc 是 VueComponent 的实例对象
      $on $emit $off 都在 vue 的原型对象上

      1. 安装全局事件总线

         ```javascript
         const vm = new Vue({
           el: "#app",
           render: (h) => h(App),
           beforeCreate() {
             Vue.prototype.$bus = this; //安装全局事件总线
           },
         });
         ```

      2. 使用与解绑

         ```javascript
         const data = {
           name: "six",
           age: 18,
         };
         this.$bus.$emit("hello", data);
         ```

      3. 全局事件总线要解绑

         ```javascript
         mounted() {
           this.$bus.$on('hello', (data) => {
             console.log('我们认识吗')
           })
         }
         beforeDestroy() {
           this.$bus.$off('hello')
         }
         ```

   7. vuex

      1. state：用于数据的存储，是 store 中的唯一数据源
      2. getters：如 vue 中的计算属性一样，基于 state 数据的二次包装，常用于数据的筛选和多个数据的相关性计算
      3. mutations：类似函数，改变 state 数据的唯一途径，且不能用于处理异步事件
      4. actions：类似于 mutation，用于提交 mutation 来改变状态，而不直接变更状态，可以包含任意异步操作
      5. modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

   8. localStorage/sessionStorage

4. vue 的声明周期
   8 个分别为

   1. beforeCreate vue 实例的挂载元素 el 和数据对象 data 都为 undefined; methods 还未初始化
   2. created vue 实例的数据对象 data 有了，methods 中配置的方法，el 为 undefined,还未初始化

   3. beforeMount vue 实例的挂载元素 el 和 data 都初始化了，但挂在之前为虚拟的 dom 节点，data.message 还未替换, 模板尚未挂载到页面中

   4. mounted
      vue 被新创建的 vm.$el 替换，表示整个 Vue 实例已经初始化完毕，data.message 成功渲染

   5. beforeUpdate 当 data 变化时，会触发 beforeUpdate 和 updated 方法，data 数据是最新的，但是页面尚未和最新的数据保持同步

   6. updated 执行时，页面和 data 数据已经保持同步

   7. beforeDestroy 当执行 beforeDestroy 的时候，实例身上所有的 data 和所有的 methods 以及过滤器、指令都处于可用状态，此时还未真正执行销毁的过程

   8. destroyed 对 data 的改变不会再触发周期函数，此时 vue 实例已经解除了事件监听和 DOM 的绑定，但是 dom 结构依然存在

   9. activated keep-alive 专属，组件被激活时调用
   10. deactivated keep-alive 专属，组件被销毁时调用

5. v-if 和 v-show 的区别

   1. v-if 真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

   适用于不需要频繁切换条件的场景

   2. v-show 仅在初始化时加载一次，操作的是样式(display),切换当前样式的显示与隐藏，

   适用于需要频繁切换条件的场景

6. v-if 和 v-for 为什么不建议一起使用
   因为 v-for 的优先级比 v-if 高会，先循环渲染出数据后才会进行条件渲染判断 造成性能浪费
   v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。

7. vue 内部指令

8. vue 的修饰符

9. computed 和 watch 的区别和运用场景

   1. computed
      计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容，它可以设置 getter 和 setter。
      计算属性一般用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；

      ```javascript
      const app = new Vue({
        el: '#app',
        data: {
          firstName: 'Kobe',
          lastName: 'Bryant'
        },
        // computed简写形式,只设置get方法，为只读属性
        // 计算属性的字段类似于放到data中
        computed: {
          fullName: function() {
            return this.firstName + ' ' + this.lastName
          }
        }

        //  计算属性的get和set方法
        computed: {
          fullName: {
            set: function(newValue) {
              const names = newValue.split(' ')
              this.firstName = name[0]
              this.lastName = name[1]
            },
            get: function() {
              return this.firstName + ' ' + this.lastName
            }
          }
        }
      })
      ```

   2. watch
      监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。
      适用于观测某个值的变化去完成一段复杂的业务逻辑

      ```js
      new Vue({
        el: "#root",
        data: {
          cityName: { id: 1, name: "shanghai" },
        },
        watch: {
          // 1. watch简写形式
          // cityName(newName, oldName) {}
          // 2. watch完整形式
          cityName: {
            handler(newName, oldName) {
              // ...
            },
            deep: true, //deep表示深度监听，用于监听对象内部属性的改变
            immediate: true, //immediate表示立刻监听，当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行，使用该属性表示会立刻监听
          },
        },
      });
      ```

10. vue2 响应式数据的原理

    1. 整体思路是数据劫持+观察者模式
       对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。

    2. 不足之处
       虽然我们通过 Object.defineProperty 方法实现了对 object 数据的可观测，但是这个方法仅仅只能观测到 object 数据的取值及设置值，当我们向 object 数据里添加一对新的 key/value 或删除一对已有的 key/value 时，它是无法观测到的，导致当我们对 object 数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新。

       当然，Vue 也注意到了这一点，为了解决这一问题，Vue 增加了两个全局 API:Vue.set 和 Vue.delete，

       ```js
       let activeReactiveFn = null;

       // 定义函数收集的类
       class Depend {
         constructor() {
           this.reactiveFns = new Set();
         }

         // addDepend(reactiveFn) {
         //   this.reactiveFns.push(reactiveFn)
         // }

         notify() {
           this.reactiveFns.forEach((fn) => {
             fn();
           });
         }

         depend() {
           if (activeReactiveFn) {
             this.reactiveFns.add(activeReactiveFn);
           }
         }
       }
       const depend = new Depend();

       // 封装一个收集需要调用的函数
       function watchFn(fn) {
         // 把需要响应的函数放入正确的依赖中
         // 1. 找到depend对象
         activeReactiveFn = fn;
         fn();
         activeReactiveFn = null;
       }

       // 封装一个获取depend的函数
       const targetMap = new WeakMap();
       function getDepend(target, key) {
         // 根据target获取Map
         let map = targetMap.get(target);
         if (!map) {
           // 初次使用不存在map
           map = new Map();
           targetMap.set(target, map);
         }

         let depend = map.get(key);
         if (!depend) {
           depend = new Depend();
           map.set(key, depend);
         }
         return depend;
       }

       function reactive(obj) {
         Object.keys(obj).forEach((key) => {
           let value = obj[key];
           Object.defineProperty(obj, key, {
             get: function () {
               const depend = getDepend(obj, key);
               depend.depend();
               return value;
             },
             set: function (newValue) {
               value = newValue;
               const depend = getDepend(obj, key);
               depend.notify();
             },
           });
         });
         return obj;
       }
       ```

11. vue3 响应式原理

    ```js
    let activeReactiveFn = null;

    class Depend {
      constructor() {
        this.reactiveFns = new Set();
      }

      depend() {
        if (activeReactiveFn) {
          this.reactiveFns.add(activeReactiveFn);
        }
      }

      notify() {
        this.reactiveFns.forEach((fn) => fn());
      }
    }

    function watchFn(fn) {
      activeReactiveFn = fn;
      fn();
      activeReactiveFn = null;
    }

    let wk = new WeakMap();
    function getDepend(target, key) {
      let map = wk.get(target);
      if (!map) {
        map = new Map();
        wk.set(target, map);
      }
      let depend = map.get(key);
      if (!depend) {
        depend = new Depend();
        map.set(key, depend);
      }
      return depend;
    }

    function reactive(obj) {
      return new Proxy(obj, {
        get: function (target, key, receiver) {
          let depend = getDepend(target, key);
          depend.depend();
          return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
          Reflect.set(target, key, value, receiver);
          let depend = getDepend(target, key);
          depend.notify();
        },
      });
    }

    const obj = {
      name: "six",
      age: 18,
    };

    const objProxy = reactive(obj);

    watchFn(() => {
      console.log(objProxy.name, "已自动监听该函数");
      console.log(objProxy.name, "第二次输出");
    });

    objProxy.name = "番茄";
    ```

12. 什么是虚拟 DOM

    虚拟 DOM 指的是用 JS 模拟的 DOM 结构，
    本质上是 Javascript 对象
    虚拟 DOM 提升性能的点在于 DOM 发生变化的时候，通过 diff 算法比对 JavaScript 原生对象，计算出需要变更的 DOM，然后只对变化的 DOM 进行操作，而不是更新整个视图。

    1. DOM 结构

    ```html
    <ul id="list">
      <li class="item">Item1</li>
      <li class="item">Item2</li>
    </ul>
    ```

    2. 映射成的虚拟 DOM 如下

    ```js
    var vDOM = {
      tag: "ul",
      attrs: {
        id: "list",
      },
      children: [
        {
          tag: "li",
          attrs: { className: "item" },
          children: ["Item1"],
        },
        {
          tag: "li",
          attrs: { className: "item" },
          children: ["Item2"],
        },
      ],
    };
    ```

    3. VNode 的作用
       我们在视图渲染之前，把写好的 template 模板先编译成 VNode 并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的 VNode 与前一次缓存下来的 VNode 进行对比，找出差异，然后有差异的 VNode 对应的真实 DOM 节点就是需要重新渲染的节点，最后根据有差异的 VNode 创建出真实的 DOM 节点再插入到视图中，最终完成一次视图更新。

    4. 为什么需要虚拟 DOM

       1. Vue 是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作 DOM,而操作真实 DOM 又是非常耗费性能的
       2. 那如何在更新视图的时候尽可能少的操作 DOM 呢？最直观的思路就是我们不要盲目的去更新视图，而是通过对比数据变化前后的状态，计算出视图中哪些地方需要更新，只更新需要更新的地方，而不需要更新的地方则不需关心，这样我们就可以尽可能少的操作 DOM 了。这也就是上面所说的用 JS 的计算性能来换取操作 DOM 的性能。
       3. 当数据发生变化时，我们对比变化前后的虚拟 DOM 节点，通过 DOM-Diff 算法计算出需要更新的地方，然后去更新需要更新的视图。

    5. VNode 的类型
       1. 注释节点
       2. 文本节点
       3. 元素节点
       4. 组件节点
       5. 函数式组件节点
       6. 克隆节点

13. v-model 原理

    v-model 指令在表单 <input>、<textarea> 及 <select> 元素上创建双向数据绑定。

    1. text 和 textarea 元素使用 value property 和 input 事件；
    2. checkbox 和 radio 使用 checked property 和 change 事件；
    3. select 字段将 value 作为 prop 并将 change 作为事件。

    ```html
    <body>
      <div id="app">
        <!-- v-model实现双向绑定 -->
        <!-- <input type="text" v-model="message"> -->

        <!-- 实现双向绑定方法二 -->
        <input type="text" :value="message" @input="valueChange" />

        <!-- 实现双向绑定方法三 -->
        <input
          type="text"
          :value="message"
          @input="message = $event.target.value"
        />

        <h2>{{message}}</h2>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        const app = new Vue({
          el: "#app",
          data: {
            message: "你好啊",
          },
          methods: {
            // 会默认传入一个event参数
            valueChange(event) {
              this.message = event.target.value;
            },
          },
        });
      </script>
    </body>
    ```

14. v-for 为什么要加 key

15. vue-router 路由钩子有哪些? 执行顺序

    1. 路由钩子
       1. 全局守卫 beforeEach/afterEach
       2. 独享路由守卫 beforeEnter
       3. 组件守卫 beforeRouteEnter/beforeRouteLeave
    2. 执行顺序
       导航被触发。
       在失活的组件里调用 beforeRouteLeave 守卫。
       调用全局的 beforeEach 守卫。
       在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
       在路由配置里调用 beforeEnter。
       解析异步路由组件。
       在被激活的组件里调用 beforeRouteEnter。
       调用全局的 beforeResolve 守卫 (2.5+)。
       导航被确认。
       调用全局的 afterEach 钩子。
       触发 DOM 更新。
       调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

16. vue-router 动态路由

17. vuex 的使用

    ```js
    // .vue文件
    export default {
      data() {
        return {
          n:1
        }
      }
      methods: {
        add() {
          this.$store.dispatch('jia', this.n)
        }
      }
    }

    ```

    ```js
    // store index.js
    import Vue from "vue";
    //引入Vuex
    import Vuex from "vuex";
    //应用Vuex插件
    Vue.use(Vuex);

    action = {
      // context表示上下文环境 ，有很多内容
      jia(context, value) {
        context.commit("JIA", value);
      },
    };
    mutations = {
      JIA(state, value) {
        state.sum += value;
      },
    };
    state = {
      sum: 1,
    };
    getters = {
      bigSum(state) {
        return state.sum * 10;
      },
    };

    //创建并暴露store
    export default new Vuex.Store({
      actions,
      mutations,
      state,
      getters,
    });
    ```

18. diff 算法原理
    https://vue-js.com/learn-vue/virtualDOM/patch.html#_1-%E5%89%8D%E8%A8%80
    DOM-diffing 过程叫做 patch 过程。以新的 VNode 为基准，改造旧的 oldVNode 使之成为跟新的 VNode 一样。

    1. 创建节点
       VNode 类可以描述 6 中类型的节点，实际上只有 3 中类型的节点能够被创建并插入到 DOM 中，它们是元素节点、文本节点、注释节点。需要判断节点类型
       1. 元素节点-是否有 tag 标签-是调用 createElement 方法创建元素节点，递归遍历子节点，将所有子节点创建好之后插入到当前元素节点里面，最后把当前元素节点插入到 DOM 中
       2. 注释节点-是否判断 isComment 为 true,是调用 createComment 方法创建文本节点
       3. 文本节点-调用 createTextNode 方法创建文本节点
    2. 删除节点
       只需在删除节点的父元素上调用 removeChild 方法即可
    3. 更新节点

       1. VNode 和 oldVNode 均为静态节点，直接跳过
          `<p>我是不会变化的文字</p>`
       2. VNode 是文本节点
          1. oldVNode 也是文本节点，判断两个文本是否相同
          2. oldVNode 不是文本节点，调用 setTextNode 方法改成文本节点
       3. VNode 是元素节点
          1. 新节点包含子节点
             1. 旧节点包含子节点
                递归对比更新子节点，调用 updateChildren 方法
             2. 旧节点不包含子节点
                1. 旧节点是空节点
                   新节点的子节点创建一份插入到旧节点里
                2. 旧节点是文本节点
                   文本清空，新节点的子节点创建一份插入到旧节点里
          2. 新节点不包含子节点
             说明该节点是空节点，直接清空 oldVNode 节点内容

    4. 新旧节点都包含子节点的逻辑

       - 把新的 VNode 上的子节点数组记为 newChildren，把旧的 oldVNode 上的子节点数组记为 oldChildren
       - 外层循环 newChildren 数组，内层循环 oldChildren 数组，每循环外层 newChildren 数组里的一个子节点，就去内层 oldChildren 数组里找看有没有与之相同的子节点

       1. 创建节点
          如果 newChildren 里面的某个子节点在 oldChildren 里找不到与之相同的子节点
          把新创建的节点插入到所有未处理节点之前
       2. 删除子节点
          oldChildren 还存在未处理的子节点，将这些节点删除

       3. 更新子节点
          如果 newChildren 里面的某个子节点在 oldChildren 里找到了与之相同的子节点，并且所处的位置也相同，那么就更新 oldChildren 里该节点，使之与 newChildren 里的该节点相同。
       4. 移动子节点
          如果 newChildren 里面的某个子节点在 oldChildren 里找到了与之相同的子节点，但是所处的位置不同，这说明此次变化需要调整该子节点的位置，那就以 newChildren 里子节点的位置为基准，调整 oldChildren 里该节点的位置，使之与在 newChildren 里的位置相同。

    5. 更新子节点优化逻辑
       newChildren 数组里的所有未处理子节点的第一个子节点称为：新前；
       newChildren 数组里的所有未处理子节点的最后一个子节点称为：新后；
       oldChildren 数组里的所有未处理子节点的第一个子节点称为：旧前；
       oldChildren 数组里的所有未处理子节点的最后一个子节点称为：旧后；

       1. 新前与旧前
          若相同，无需进行节点移动操作
       2. 新后与旧后
          若相同，无需进行节点移动操作
       3. 新后与旧前
          若相同， 我们要把 oldChildren 数组里把第一个子节点移动到数组中所有未处理节点之后。
       4. 新前与旧后
          若相同，我们要把 oldChildren 数组里把最后一个子节点移动到数组中所有未处理节点之前。
       5. 继续下一轮循环

       ```js
       // 循环更新子节点
       function updateChildren(
         parentElm,
         oldCh,
         newCh,
         insertedVnodeQueue,
         removeOnly
       ) {
         let oldStartIdx = 0; // oldChildren开始索引
         let oldEndIdx = oldCh.length - 1; // oldChildren结束索引
         let oldStartVnode = oldCh[0]; // oldChildren中所有未处理节点中的第一个
         let oldEndVnode = oldCh[oldEndIdx]; // oldChildren中所有未处理节点中的最后一个

         let newStartIdx = 0; // newChildren开始索引
         let newEndIdx = newCh.length - 1; // newChildren结束索引
         let newStartVnode = newCh[0]; // newChildren中所有未处理节点中的第一个
         let newEndVnode = newCh[newEndIdx]; // newChildren中所有未处理节点中的最后一个

         let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

         // removeOnly is a special flag used only by <transition-group>
         // to ensure removed elements stay in correct relative positions
         // during leaving transitions
         const canMove = !removeOnly;

         if (process.env.NODE_ENV !== "production") {
           checkDuplicateKeys(newCh);
         }

         // 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点
         while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
           if (isUndef(oldStartVnode)) {
             oldStartVnode = oldCh[++oldStartIdx]; // 如果oldStartVnode不存在，则直接跳过，比对下一个
           } else if (isUndef(oldEndVnode)) {
             oldEndVnode = oldCh[--oldEndIdx];
           } else if (sameVnode(oldStartVnode, newStartVnode)) {
             // 如果新前与旧前节点相同，就把两个节点进行patch更新
             patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
             oldStartVnode = oldCh[++oldStartIdx];
             newStartVnode = newCh[++newStartIdx];
           } else if (sameVnode(oldEndVnode, newEndVnode)) {
             // 如果新后与旧后节点相同，就把两个节点进行patch更新
             patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
             oldEndVnode = oldCh[--oldEndIdx];
             newEndVnode = newCh[--newEndIdx];
           } else if (sameVnode(oldStartVnode, newEndVnode)) {
             // Vnode moved right
             // 如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后
             patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
             canMove &&
               nodeOps.insertBefore(
                 parentElm,
                 oldStartVnode.elm,
                 nodeOps.nextSibling(oldEndVnode.elm)
               );
             oldStartVnode = oldCh[++oldStartIdx];
             newEndVnode = newCh[--newEndIdx];
           } else if (sameVnode(oldEndVnode, newStartVnode)) {
             // Vnode moved left
             // 如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前
             patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
             canMove &&
               nodeOps.insertBefore(
                 parentElm,
                 oldEndVnode.elm,
                 oldStartVnode.elm
               );
             oldEndVnode = oldCh[--oldEndIdx];
             newStartVnode = newCh[++newStartIdx];
           } else {
             // 如果不属于以上四种情况，就进行常规的循环比对patch
             if (isUndef(oldKeyToIdx))
               oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
             idxInOld = isDef(newStartVnode.key)
               ? oldKeyToIdx[newStartVnode.key]
               : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
             // 如果在oldChildren里找不到当前循环的newChildren里的子节点
             if (isUndef(idxInOld)) {
               // New element
               // 新增节点并插入到合适位置
               createElm(
                 newStartVnode,
                 insertedVnodeQueue,
                 parentElm,
                 oldStartVnode.elm,
                 false,
                 newCh,
                 newStartIdx
               );
             } else {
               // 如果在oldChildren里找到了当前循环的newChildren里的子节点
               vnodeToMove = oldCh[idxInOld];
               // 如果两个节点相同
               if (sameVnode(vnodeToMove, newStartVnode)) {
                 // 调用patchVnode更新节点
                 patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
                 oldCh[idxInOld] = undefined;
                 // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动
                 canMove &&
                   nodeOps.insertBefore(
                     parentElm,
                     vnodeToMove.elm,
                     oldStartVnode.elm
                   );
               } else {
                 // same key but different element. treat as new element
                 createElm(
                   newStartVnode,
                   insertedVnodeQueue,
                   parentElm,
                   oldStartVnode.elm,
                   false,
                   newCh,
                   newStartIdx
                 );
               }
             }
             newStartVnode = newCh[++newStartIdx];
           }
         }
         if (oldStartIdx > oldEndIdx) {
           /**
            * 如果oldChildren比newChildren先循环完毕，
            * 那么newChildren里面剩余的节点都是需要新增的节点，
            * 把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中
            */
           refElm = isUndef(newCh[newEndIdx + 1])
             ? null
             : newCh[newEndIdx + 1].elm;
           addVnodes(
             parentElm,
             refElm,
             newCh,
             newStartIdx,
             newEndIdx,
             insertedVnodeQueue
           );
         } else if (newStartIdx > newEndIdx) {
           /**
            * 如果newChildren比oldChildren先循环完毕，
            * 那么oldChildren里面剩余的节点都是需要删除的节点，
            * 把[oldStartIdx, oldEndIdx]之间的所有节点都删除
            */
           removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
         }
       }
       ```

19. Vue.mixin(混入) 的使用场景和原理

    ```js
    Vue.mixin = function (mixin: Object) {
      // 将传入的mixin对象与this.options合并，并返回给this.options
      this.options = mergeOptions(this.options, mixin);
      // 传给之后所有vue实例
      return this;
    };
    ```

20. nextTick 的使用场景和原理
    在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

21. keep-alive 使用场景和原理

    1. 对 keep-alive 的了解

       是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染

       1. 一般结合路由和动态组件一起使用，用于缓存组件
       2. 提供 include 和 exclude 属性，两者都支持字符串或正则表达式  
          include 表示只有名称匹配的组件会被缓存，
          exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
       3. 对应两个钩子函数 activated 和 deactivated  
          当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

    2. 原理
       缓存淘汰策略 LRU(最近最少使用)

22. Vue.set 原理

23. Vue.extend 作用和原理

24. 自定义指令使用和原理

25. Vue 模板编译原理

26. vue-router 路由模式实现原理

# MVC/MVP/MVVM 模式-都是常见的软件架构设计模式

https://juejin.cn/post/6879300070962003982
https://juejin.cn/post/6844903480126078989

## 什么是 MVC？

MVC: Model View Controller, 模型-视图-控制器的缩写

1. M: Model 数据模型（用于处理应用程序数据逻辑的部分）
2. V：View 视图（对于前端来说，就是页面）
3. C：Controller 控制器（是视图和数据模型沟通的桥梁，负责从视图读取数据，控制用户输入，并向模型发送数据）

当用户出发事件的时候，view 层会发送指令到 controller 层，接着 controller 去通知 model 层更新数据，model 层更新完数据以后直接显示在 view 层上，这就是 MVC 的工作原理。

## 什么是 MVP

## 什么是 MVVM？

https://juejin.cn/post/6879300070962003982
Model-View-ViewModel(MVVM)是一种软件架构设计模式

1. MVVM 模型, 包括 DOM Listeners 和 Data Bindings

1. View 层(视图)
   视图层，即用户界面，由 HTML 和 CSS 构建
1. Model 层(模型)
   指数据模型，即后端提供的 API 接口，指后端进行的各种业务逻辑处理和数据操控
1. ViewModel 层(视图模型)
   视图数据层，View 和 Model 层的桥梁

1. 模型转换成视图, 即将后端传递的数据转换成看到的页面，实现方式是数据绑定
1. 视图转换成模型，即将看到的页面转换成后端的数据，实现方式是 DOM 事件监听
   两个方向都实现, 就称为数据的双向绑定

1. MVC 和 MVVM 最大的区别

1. MVVM 实现了数据与页面的双向绑定，MVC 只实现了 Model 和 View 的单向绑定。
1. MVVM 实现了页面业务逻辑和渲染之间的解耦，也实现了数据与视图的解耦，并且可以组件化开发。

1. vue 如何体现 MVVM 思想
1. mustache 语法，实现了数据与视图的绑定
1. v-on 事件绑定，通过事件操作数据, v-model 会发生响应的变化

# 什么是双向绑定

当 Model 发生变化，ViewModel 就会自动更新；ViewModel 变化，Model 也会更新。
双向绑定： 数据变化更新视图，视图变化更新数据
即：输入框的内容发生变化时， data 中的数据同步变化； data 中的数据变化时，文本节点的内容同步变化

# Object.defineProperty

```javascript
let number = 18;

let person = {
  name: "小六",
  height: 180,
};

Object.defineProperty(person, "age", {
  value: 18,
  enumerable: true, //控制属性是否可以枚举
  writable: true, //控制属性是否可以修改
  configurable: true, //控制属性是否可以被删除 - 可配置的

  //当有人读取person的age属性时， get函数就会被调用， 且返回值就是age值
  get: function () {
    return number;
  },
  //当有人读取person的age属性时， set函数(setter)就会被调用， 且会收到修改的具体值
  set: function (value) {
    // 把number修改掉
    number = value;
  },
});
```

# Vue 中的数据代理

1. 数据代理
   概念：通过一个对象代理对另一个对象中的属性操作

```javascript
let obj = { x: 100 };
let obj2 = { y: 200 };

Object.defineProperty(obj2, x, {
  get() {
    return obj.x;
  },

  set(value) {
    obj.x = value;
  },
});
```

2. Vue 中的数据代理

```javascript
let data = {
  name: "尚硅谷",
  address: "不想",
};

const vm = new Vue({
  el: "#root",
  data: data,
});
```

vm 中的 \_data 就是 options 定义的 data,即 vm.\_data = options.data = data  
vm.\_data = options.data 前也做了一步处理，对 options 中的 data 进行加工 即数据监测

```javascript
let data = {
  name: "尚硅谷",
  address: "北京",
};

// 创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data);

// 准备一个vm实例对象
let vm = {};
vm._data = data = obs;

function Observer(obj) {
  // 汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj);
  // 遍历
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      get() {
        return obj[k];
      },
      set(val) {
        obj[k] = val;
      },
    });
  });
}
```

# 什么是观察者模式？

一个对象维持一系列依赖于它的对象，将有关状态的任何变更自动通知给它们

# key 的作用与原理

1. 虚拟 DOM 中 key 的作用：
   key 是虚拟 DOM 对象的标识，当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】，随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的差异比较，比较规则如下：

2. 对比规则
   (1)旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key:
   若虚拟 DOM 中内容没变，直接使用之前的真实 DOM
   若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM
   (2)旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
   创建新的真实 DOM，随后渲染到页面

3. 用 index 作为 key 可能会引发的问题：
   1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作
      会产生没有必要的真实 DOM 更新 ==> 界面效果没问题，但效率低
   2. 如果结构中还包含输入类的 DOM
      会产生错误 DOM 更新 ==> 界面有问题
4. 开发中如何选择 key?
   1. 最好使用每条数据的唯一标识作为 key,比如 id, 手机号, 身份证号等唯一值
   2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表展示，使用 index 作为 key 是没有问题的

- 虚拟 DOM 的 diffing 算法

# 过滤器 filter

定义： 对要显示的数据进行特定格式化后再显示
语法：

1. 注册过滤器：Vue.filter(name, callback) 或 new Vue{ filters: {}}
2. 使用过滤器： {{ xxx | 过滤器名 }} 或 v-bind:属性 = 'xxx | 过滤器名'
   备注：
3. 过滤器也可以接收额外参数 多个过滤器也可以串联
4. 并没有改变原本的数据， 是产生新的对应的数据

5. 局部过滤器

```js
methods: {

},
filters: {
  // 过滤名称
  timeFormatter(value) {

  }
}
```

2. 全局过滤器

```js
Vue.filter("myslice", function (value) {
  return value.slice(0, 4);
});
```

# Vue 更新时的问题 对象新增属性、删除属性、数组

1. 新增属性、删除属性，界面不会更新
2. 直接通过下标修改数组，界面不会自动更新

## Vue 监测对象数据的改变？

Vue.set(对象， 属性， 属性值) 会为对象的属性添加 getter 和 setter

- 用法：
  向响应式对象中添加一个 property,并确保这个新 property 同样是响应式的，且触发视图更新。
  注意： 对象不能是 Vue 实例，或者 Vue 实例的根数据对象 vm.\_data
  或者 this.$set  this.$delete

## Vue 监测数组对象的改变？

数组考虑性能原因没有用 defineProperty 对数组的每一项进行拦截，而是选择对 7 种数组（push,shift,pop,splice,unshift,sort,reverse）方法进行重写(AOP 切片思想)。所以在 Vue 中修改数组的索引和长度是无法监控到的。需要通过以上 7 种变异方法修改数组才会触发数组对应的 watcher 进行更新

数组中的元素不是通过 setter 和 getter 进行响应的
例如 arr[0] = '111' 无法进行视图更新

- Vue 只承认 push pop shift unshift splice sort reverse 这七个方法承认修改数组，会触发视图更新

```javascript
data() {
  return {
    user:['你好', '我们', '认识吗']
  }
}
methods： {
  change() {
    this.user[2] = '不认识'   // 视图不会更新
    this.user.splice(2,1,'不认识')  //视图会更新
  }
}
```

1. 利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
解决方法： Vue.set(vm.items, indexOfItem, newValue) 2.修改数组的长度时，例如：vm.items.length = newLength
解决方法： vm.items.splice(newLength)
<!--
  Vue监视数据的原理：
    1. vue会监视data中所有层次的数据。

    2. 如何监测对象中的数据？
            通过setter实现监视，且要在new Vue时就传入要监测的数据。
              (1).对象中后追加的属性，Vue默认不做响应式处理
              (2).如需给后添加的属性做响应式，请使用如下API：
                      Vue.set(target，propertyName/index，value) 或
                      vm.$set(target，propertyName/index，value)

    3. 如何监测数组中的数据？
              通过包裹数组更新元素的方法实现，本质就是做了两件事：
                (1).调用原生对应的方法对数组进行更新。
                (2).重新解析模板，进而更新页面。

    4.在Vue修改数组中的某个元素一定要用如下方法：
          1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
          2.Vue.set() 或 vm.$set()

    特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
-->

# $set 原理

https://github.com/lgwebdream/FE-Interview/issues/139

# vue.config.js 修改 webpack 配置

# class 与 style 的动态绑定

class 的动态绑定

1. 对象语法
v-bind:class 指令也可以与普通的 class attribute 共存
<div v-bind:class="{ active: isActive }"></div>

2. 数组语法
<div v-bind:class="[activeClass, errorClass]"></div>

<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<div v-bind:class="[{ active: isActive }, errorClass]"></div>

# v-for 进行列表渲染

1. 在 v-for 里使用数组
<li v-for="(item, index) in items">
2. 在 v-for 里使用对象
<div v-for="(value, name, index) in object">
3. 在 v-for 里使用值范围
   <span v-for="n in 10">{{ n }} </span>

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供一个唯一 key attribute：

# 有哪些修饰符

https://juejin.cn/post/6981628129089421326

1. v-model.lazy
改变输入框的值时 value 不会改变，当光标离开输入框时， v-model 绑定的值 value 才改变
<input type="text" v-model.lazy="value">
<div>{{value}}</div>

2. v-model.trim
   把 v-model 绑定的值的首尾空格给过滤掉

3. v-model.number
   将值转成数字

4. @click.stop
阻止冒泡
<div @click="clickEvent(2)" style="width:300px;height:100px;background:red">
    <button @click.stop="clickEvent(1)">点击</button>
</div>

5. @click.capture
   事件由外往内捕获

6. @click.self
   只有点击事件绑定的本身才会触发事件

7. @click.once
   事件只执行一次

8. @click.prevent
   阻止默认事件

9. @click.native
   加在自定义组件的事件上，保证事件能执行

10. @scroll.passive
    当我们在监听元素滚动事件的时候，会一直触发 onscroll 事件，使用这个修饰符，相当于给 onscroll 事件整了一个.lazy 修饰符

11. sync
    当父组件传值进子组件，子组件想要改变这个值时

父组件里
`<children :foo="bar" @update:foo="val => bar = val"></children>`
子组件里
`this.$emit('update:foo', newValue)`

父组件里
`<children :foo.sync="bar"></children>`
子组件里
`this.$emit('update:foo', newValue)`

## v-on 的修饰符使用

@click.stop 阻止冒泡 调用 event.stopPropagation()

<!-- 阻止单击事件继续传播 -->

<a v-on:click.stop="doThis"></a>
@click.prevent 阻止默认事件 调用 event.preventDefault()

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
@click.native  监听组件根元素的原生事件
@click.once  只触发一次回调
@keyUp.enter  键修饰符，监听回车

# 有哪些内部指令

1. v-if
2. v-else
3. v-else-if
4. v-show
5. v-for
6. v-on
7. v-bind
8. v-model
9. v-slot
10. v-once 元素和组件只渲染一次
11. v-text 向其所在的节点渲染文本内容，会全部替换节点中的内容 v-text='name'类似于{{name}}

# 自定义指令

# 事件处理方法

```vue
<body>
  <div id="app">
    <button @click="say()"> 方法 </button>
    // <!-- 没有参数()可以直接省略，有括号必须传入参数，否则为undefined -->
    <button @click="say1">方法1</button>
    <button @click="say2('hi')">方法2</button>
    // <!-- 通过$event访问原始的DOM事件 -->
    <button @click="say3(message, $event)">方法3</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊"
      },
      methods: {
        say(event){
          console.log(event);  //undefined
        },
        say1: function(event){
          // 会自动传入一个event
          console.log(event);  //MouseEvent
          console.log(this.message);   //你好啊
        },
        say2: function(a) {
          console.log(a);  //hi
        },
        say3: function(b,event) {
          console.log(b,event);  //你好啊   MouseEvent
        }
      },
    })
  </script>
</body>
```

# 消息订阅与发布

pubsub-js(publish-subscribe-js) 消息订阅与发布插件 实现任意组件间通信

# Vue 组件的通信方式

常见使用场景可以分为三类：  
父子组件通信、兄弟组件通信、跨级通信

常见的几种通信方式  
(1) props / $emit  适用于父子组件通信  
(2) ref="组件名" this.$refs.组件名 | this.$refs['组件名'] 适用于父子组件通信  
(3) $parent / $children 适用于父子组件通信  
(4) eventBus 全局事件总线  $emit/$on 任意组件间通信  
(5) vuex 适用于父子、隔代、兄弟组件通信  
(6) provide / inject 适用于隔代组件通信  
(7) $attrs / $listeners 适用于隔代组件通信
(8) pubsub-js 库 消息订阅与发布插件 实现任意组件间通信

## project 和 inject

```js
provide: function() {
  return {
    getIndexRef: () => {
      return this
    }
  }
}
```

```js
inject: ["getIndexRef"];
// 使用
this.getIndexRef();
```

## 全局事件总线

`vc.prototype.proto` === `vue.prototype` vc 是 VueComponent 的实例对象
$on $emit $off 都在 vue 的原型对象上

- 安装全局事件总线

```javascript
const vm = new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  },
});
```

- 使用与解绑

```javascript
const data = {
  name: "six",
  age: 18,
};
this.$bus.$emit("hello", data);
```

全局事件总线要解绑

```javascript
mounted() {
  this.$bus.$on('hello', (data) => {
    console.log('我们认识吗')
  })
}
beforeDestroy() {
  this.$bus.$off('hello')
}
```

# vuex 的使用

Vuex：专为 Vue.js 应用程序开发的状态管理模式
格式：

```js
const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
```

主要模块为
state:用于设置默认的初始状态  
getters:相当于 Vue 中的计算属性 computed，getter 的返回值会根据它的依赖被缓存起来，
且只有当它的依赖值发生了改变才会被重新计算

        接收两个参数分别为(state,getters)

mutations: 包括两个部分为
1 字符串的事件类型(type)  
 2 一个回调函数(handler)参数为(state,payload)

            state状态更新的唯一方式：
            在组件中使用this.$store.commit('mutations中的方法名'，payload) 提交mutation
            且必须为同步函数

actions: 用于提交 mutation,而不是直接变更状态，可以包含任意异步操作
组件中使用 this.$store.dispatch('actions中的方法名'，data)
            mutations中使用this.$store.commit('mutations 中的方法名'，data)
modules: 允许将单一的 store 拆分成多个 store 且同时保存在单一的状态树中

```js
// .vue文件
export default {
  data() {
    return {
      n:1
    }
  }
  methods: {
    add() {
      this.$store.dispatch('jia', this.n)
    }
  }
}

```

```js
// store index.js
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex);

action = {
  // context表示上下文环境 ，有很多内容
  jia(context, value) {
    context.commit("JIA", value);
  },
};
mutations = {
  JIA(state, value) {
    state.sum += value;
  },
};
state = {
  sum: 1,
};
getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

# vue-router

## 路由

1. 方法一

```js
// to 表示路由 active-class 当前切换路由效果
<router-link to="/about" active-class="active"> </router-link>
// 指定组件的呈现位置实现路由切换
<router-view></router-view>
```

方法二 编程式路由导航

## 嵌套路由

```javascript
routes: [
  {
    path: "/about",
    component: About,
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        // 子路由不需要加'/' 或者写全路径 '/home/new'
        path: "new",
        component: News,
      },
    ],
  },
];
```

方法一

```javascript
// 跳转必须把路径写全, 会从一级路由开始匹配
<router-link to="/home/news" active-class="active"></router-link>
```

## 路由传参

<router-link> 中的 to 字符串写法和对象写法
query 参数 放在请求体中 可以 name，也可以 path
params 参数 1. 放在链接中 必须和 name 命名路由一起 2.props 配置(三种)

1. 携带 query 参数(写在 Url 中&连接, 例如`/message/detail?id=003&title=11`)

   1. 字符串写法

   ```
   <router-link
      :to="`/home/message/detail?id=${m.id}&title=${m.title}`"
   >
   ```

   2. 对象写法, 可以写 path(路径要写全)或者写 name

   ```
   <router-link
    :to="{
      path:'/home/message/detail',
      query: {
        id: m.id,
        title: m.title
      }
   }">
   ```

2. 携带 params 参数(写在 url 中, 用`/`连接, 例如`/detail/1/你好`中的 1 是 id, 你好是 title)
   params 参数一定要和 name 搭配

   1. 写法一

   ```js
   // 写法一
   routes: [
     {
       path: "/detail/:id/:title",
       name: "detail",
       component: Detail,
     },
   ];
   ```

   ```
   // params一定要和name搭配
   <router-link :to="{
     name: "detail",
     params: {
       id: m.id,
       title: m.title
     }
   }">
   ```

3. props 配置

   1. 路由的 Props 配置

   ```js
   routes: [
     {
       path: "/detail/:id/:title",
       name: "detail",

       component: Detail,

       // props写法一 传递params
       // 值为对象，该对象中的所有key-value都会以props的形式传给detail使用, 组件用props接收
       props: { a: 1, b: "hello" },

       // props写法二 传递params
       // 值为布尔值，为true,就会把该路由组件收到的所有Params参数以props传给组件detail
       props: true,

       // props写法三 传递query
       props($route) {
         return {
           id: $route.query.id,
           title: $route.query.title,
         };
       },
     },
   ];
   ```

   ```js
   // detail组件，

   // 1. props接收params
   props: ["a", "b"];

   // 2. 使用this.$route.params获取
   ```

## 编程式路由导航

```js
this.$router.push({
  name: "about",
  params: {},
});
this.$router.back; //回退
this.$router.forward; //前进
this.$router.go(-1); //后退一步
this.$router.go(1); //前进一步
```

## 缓存路由导航

`keep-alive`让不展示的路由组件保持挂载，不被销毁
`include` 填组件名称
包含的路由组件的内容会缓存,该组件不会被销毁

1. 缓存一个组件
   <keep-alive include="News">
   <router-view></router-view>
   <keep-alive>
2. 缓存多个组件
   <keep-alive :include="['News', 'Message']">
   <router-view></router-view>
   <keep-alive>

## 路由钩子-生命周期

在 keep-alive 中的组件不会被销毁,所以重新展示该组件时不触发 beforeDestroy()和 mounted()

1. activated() {} //表示激活时
2. deactivated() {} //表示销毁时

## 路由守卫有哪些

1. 全局守卫 beforeEach/afterEach
   <!-- 全局前置路由守卫——初始化、每次路由切换之前被调用 -->

   1. 全局前置守卫
      router.beforeEach(to, from, next){}
      to 点击的路由信息
      from 上一个路由信息
      next() 放行

      ```js
      const router = export default new VueRouter({
        routes: [
          {
            name: "About",
            path: "/about",
            component: About,
          },
          {
            name: "Home",
            path: "/home",
            component: Home,
            children: [],
          },
        ],
      });

      router.beforeEach((to, from, next) => {
        // 如果前往的不是登录页， 就跳转到首页
        if (to.path !== '/login') {
          const token = localCache.getCache('token')
          // 如果没有token, 就跳转回首页
          if (!token) {
            router.push('/login')
          }
        }
      })
      ```

   2. 全局后置守卫
      <!-- 全局后置路由守卫——初始化、每次路由切换之后被调用 -->

      router.afterEach(to, from){}
      可以用来修改窗口名 window.title
      to 点击的路由
      from 上一个路由

      ```js
        const router = export default new VueRouter({
          routes: [
            {
              name: "About",
              path: "/about",
              component: About,
              meta: {title: '关于'}
            },
            {
              name: "Home",
              path: "/home",
              component: Home,
              meta: {title: '主页'}
              children: [
                {
                  name: 'xinwen',
                  path: 'news',
                  component: News,
                  meta: {isAuth: true, title: '新闻'}
                },
                {
                  name: 'xiaoxi',
                  path: 'message',
                  component: Message,
                  meta: {isAuth: false, title: '消息'}
                }
              ],
            },
          ],
        });
        // 后置路由守卫
        router.afterEach((to, from) => {
          // 可以用来修改页签title
          document.title = to.meta.title || '前端小册系统'
        })
      ```

2. (独享)路由守卫 beforeEnter(写在路由里)
   针对某个单独的路由设置的守卫
   beforeEnter(to, from , next)

   ```js
    const router = export default new VueRouter({
      routes: [
        {
          name: "About",
          path: "/about",
          component: About,
          meta: {title: '关于', isAuth: true}，
        },
        {
          name: "Home",
          path: "/home",
          component: Home,
          meta: {title: '主页'}
          children: [
            {
              name: 'xinwen',
              path: 'news',
              component: News,
              meta: {isAuth: true, title: '新闻'},
              beforeEnter: (to, from, next) => {
                // 判断是否需要鉴权
                if (to.meta.isAuth) {
                  next()
                } else {
                  console.log("无权限查看")
                }
              }
            },
            {
              name: 'xiaoxi',
              path: 'message',
              component: Message,
              meta: {isAuth: false, title: '消息'}
            }
          ],
        },
      ],
    });

   ```

3. 组件守卫 beforeRouteEnter/beforeRouteLeave

   1. beforeRouteEnter
      <!-- 通过路由规则，进入该组件时被调用 -->

      beforeRouteEnter(to, from, next) {}

      ```js
      export default {
        name: "About",
        mounted() {

        }
        // 通过路由规则，进入该组件时被调用
        beforeRouteEnter(to, from, next) {
          // 判断是否需要鉴权
          if (to.meta.isAuth) {
            next();
          } else {
            alert("无权限");
          }
        },
        // 通过路由规则，离开该组件时被调用
        beforeRouteLeave(to, from, next) {
          next()
        },
      };
      ```

   2. beforeRouteLeave
      <!-- 通过路由规则，离开该组件时被调用 -->
      beforeRouteLeave(to, from, next) {}

## history 模式和 hash 模式

mode: history

# assets 和 static 的区别？

assets 中的文件在运行 npm run build 的时候会打包，简单来说就是会被压缩体积，代码格式化之类的。打包之后也会放到 static 中。

static 中的文件则不会被打包。

# $nextTick 是什么？

在 DOM 更新完毕之后执行一个回调
<template>

  <div :class="$style.behavior">
    <TopView :cparams="params" ref="bb"></TopView>
  </div>
</template>
export default {
  created() {
    console.log('bbbbbbbbbbbbbbbbb', this.$refs.bb);
    this.$nextTick(() => {
    // 响应式发生修改页面渲染完成之后触发
    //在DOM更新完毕之后执行一个回调
    console.log('bbbbbbbbbbbbbbbbb', this.$refs.bb);
    });
    setTimeout(this.setOptions, 500);
  }
}

结果为
bbbbbbbbbbbbbbbbb undefined
bbbbbbbbbbbbbbbbb 打印出当前组件
可用于加载中，模拟延迟效果

# 原理

## diff 原理

15 张图，20 分钟吃透 Diff 算法核心原理，我说的！！！
https://juejin.cn/post/6994959998283907102

# 非单文件组件和单文件组件？

非单文件组件：
一个文件中包含有 n 个组件
单文件组件：
一个文件中只包含有 1 个组件

# VueComponent 构造函数？

1. 组件的本质是一个名为 VueComponent 的构造函数，且不是程序员定义的，是 Vue.extend 生成的
2.

# 在开发环境中关于 proxyTable 代理实现跨域

同源策略： 协议、域名、端口号相同

其它解决跨域：

1. cors(跨域资源共享)
2. jsonp(借助 script 标签 src 属性，在引入外部资源不受同源策略限制的特点，只能解决 get 请求)
3. 配置代理服务器
   - nginx
   - vue-cli devServer.proxy

## 配置代理 方式一

```js
// vue.config.js文件
devServer: {
  proxy: "http://localhost:5000"; //发送请求的服务器端口号
}
```

## 配置代理 方式二

```js
devServer: {
  proxy: {
    // 如果请求的前缀(在端口号后)是'/api', 就把请求转发给target'http://localhost: 5000'
    '/api': {
      target: 'http://localhost:5000',  // 发送请求的服务器端口号
      pathRewrite: {
        '^/api': ''
      }，
      ws: true, //用于支持websocket
      changeOrigin: false
      //是否更改代理服务器的端口号， 用于控制请求头中的host值
      // true时，服务器收到的请求头中的host为： localhost:5000 和服务器端口号一致
      // false时，服务器收到的请求头中的host为： localhost: 8080 和脚手架开启的端口号一致
    }
  }
}
```

https://blog.csdn.net/weixin_44116302/article/details/105420071

- 原理：
  同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。vue-cli 的 proxyTable 用的是 http-proxy-middleware 中间件，该中间件本质上是在本地开了一个服务器 dev-server，所有的请求都通过这里转发出去，即把浏览器的发送请求代理转发到代理服务器上，再由代理服务器发送请求给目标服务器，从而解决跨域问题。

```js
proxyTable: {
  '/api/*': {
    target: 'http://127.0.0.1:8088',  //代理目标的基础路径
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''  //匹配所有以'/api'为开头的路径
    },
  }
}
```

## jQuery、axios 都封装了 ajax 请求 xhr fetch 原生就有(兼容性问题)
