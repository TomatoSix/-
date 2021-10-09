#  前端框架

1. 真实DOM和其解析流程

    (1). 构建DOM树:用HTML分析器，分析HTML元素，创建一棵DOM树;

    (2). 生成样式表，用css分析器，分析css文件和元素上的inline样式，生成页面的样式表;

    (3). 构建Render树: 将DOM树和样式表关联起来，构建一颗Render树(Attachment) 每个DOM节点都有attach方法，接受样式信息，返回一个render对象(又名renderer)，这些render对象最终会构建成一颗render树;

    (4). 确定节点坐标: 根据Render树结构，为每个Render树上的节点确定一个在显示屏上出现的精确坐标;

    (5). 绘制页面: 根据Render树和节点显示坐标，然后调用每个节点的paint方法，将它门绘制出来;

    注意点:

    (1). 构建DOM树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个HTML文档解析完成之后才开始构建render树和布局;

    (2). Render树DOM树和CSS样式表这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析以及一边渲染;

    (3). CSS的解析是从右往左逆向解析的，嵌套标签越多，解析越慢;

    (4). 用我们传统的开发模式，原声JS操作DOM时，浏览器会从构建DOM树开始从头到尾执行一边流程，在一次操作中，我们需要更新10个DOM节点，浏览器收到第一个DOM请求后并不知道还有9次更新操作，因此会立即马上执行流程，最终执行10次，这样会导致页面卡顿并且影响用户体验;

2. Virtual DOM

   虚拟DOM的好处

    虚拟DOM就是为了解决浏览器性能问题而被设计出来的，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attach到DOM树上，再进行后续操作，避免大量无谓的计算量，所以用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制

    比较两颗虚拟DOM树的差异 - diff算法

    diff算法用来比较virtual dom树的差异，如果两颗树完全比较，那么diff算法的时间复杂度位O(n^3)，但是在前端当中，会很少跨越层级地移动DOM元素，所以virtual dom只会对同一层级的元素进行对比，这样算法复杂度就可以达到O(n)

    (1).深度优先遍历记录差异;

    (2). 差异类型;

        节点替换：节点改变了，例如将上面的 div 换成 h1;

        顺序互换：移动、删除、新增子节点，例如上面 div 的子节点，把 p 和 ul 顺序互换；

        属性更改：修改了节点的属性，例如把上面 li 的 class 样式类删除；

        文本改变：改变文本节点的文本内容，例如将上面 p 节点的文本内容更改为 “Real Dom”;

    (3). 列表对比算法

        子节点的对比算法，例如      p, ul, div 的顺序换成了 div, p, ul。这个该怎么对比？如果按照同层级进行顺序对比的话，它们都会被替换掉。如 p 和 div 的 tagName 不同，p 会被 div 所替代。最终，三个节点都会被替换，这样 DOM 开销就非常大。而实际上是不需要替换节点，而只需要经过节点移动就可以达到，我们只需知道怎么进行移动

        将这个问题抽象出来其实就是字符串的最小编辑距离问题（Edition Distance），最常见的解决方法是 Levenshtein Distance , Levenshtein Distance 是一个度量两个字符序列之间差异的字符串度量标准，两个单词之间的 Levenshtein Distance 是将一个单词转换为另一个单词所需的单字符编辑（插入、删除或替换）的最小数量。Levenshtein Distance 是1965年由苏联数学家 Vladimir Levenshtein 发明的。Levenshtein Distance 也被称为编辑距离（Edit Distance），通过动态规划求解，时间复杂度为 O(M*N)。

3. Vue与React的区别

    (1). Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能而React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染;

    (2). Vue支持双向绑定，而React的数据流一直提倡单向数据流，他称之为 onChange/setState()模式。;

    (3). 模版渲染方式不同 React是在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的，Vue是在和组件JS代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现;

4. SPA单页面应用


    其所有的活动局限于一个Web页面中，仅在该Web页面初始化时加载相应的HTML、JavaScript、CSS文件，一旦页面加载完成，SPA不会进行页面的重新加载或跳转，而是利用JavaScript动态的变换HTML，默认Hash模式是采用锚点实现路由以及元素组件的显示与隐藏实现交互，简单来说SPA应用只有一个页面，通常多页面应用会有多个页面不断跳转，而单页面应用始终在一个页面中，，默认Hash模式是通过锚点实现路由以及控制组件的显示与隐藏来实现类似于页面跳转的交互。

    优点: 减轻服务端的压力，可维护性高

    缺点: 首次加载速度慢，搜索引擎优化效果不好

    为什么首屏时间慢，SEO 差？
    单页应用的首屏时间慢，首屏时需要请求一次html，同时还要发送一次js请求，两次请求回来了，首屏才会展示出来。相对于多页面应用，首屏时间慢。

    SEO效果差，因为搜索引擎只认识html里的内容，不认识js渲染生成的内容，搜索引擎不识别，也就不会给一个好排名，会导致单页应用做出来的网页在搜索引擎上的排名差。




    多页面应用: 每一次页面跳转的时候，后台服务器都会返回一个新的html文档，这种类型的网站也就是多页网站，也叫多页应用。

## Vue

1. MVVM模型

    MVVM是Model-View-ViewModel缩写，也就是把MVC中的contorller演变成ViewModel,Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据

2. 介绍下Vue的响应式数据

    Vue在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)

    Vue3.x响应式数据原理

        Vue3.x该用proxy代替Object.defineProperty. 因为Proxy可以直接监听对象和数组的变化

        Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？

            判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。

        监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？

            我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。

3. Vue2.x中如何监测数组变化
    
    使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法，这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控，这样就实现了监测数组变化。

4. nextTick实现原理

    在下次DOM更新循环结束之后执行延迟回调，nextTick主要使用了宏任务和微任务，根据执行环境分别尝试采用(1).promise;(2).MutationObserver;(3).setImmediate;(4).如果以上都不行采用setTimeout

    定义一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列

5. Vue的生命周期

    Vue实例有一个完整的生命周期，也就是从开始创建，初始化数据，编译模版，挂载Dom,渲染, 更新 再渲染， 销毁等一系列过程，我们称这个为vue的生命周期。

    每一个组件或者实例都会经历一个完整的生命周期，总共分为三个阶段: 初始化，运行中，销毁

    (1). 实例，组件通过new Vue()创建出来之后会初始化事件和生命周期，然后就会执行`beforeCreate`钩子函数，这个时候数据还没有挂载，只是一个空壳，无法访问到数据和真实的dom，一般不做操作

    (2). 挂载数据，绑定事件等，然后执行`created`函数，这个时候已经可以使用到数据，也可以更改数据，在这里更改数据不会触发update函数，在这里可以再渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以再这里初始数据的获取

    (3). 接下里开始实例或者组件对应的模版，编译模版为虚拟dom放入到render函数中准备渲染，然后执行`beforeMount`钩子函数，在这个函数中虚拟dom已经创建完成，马上就要渲染，在这里也可以更改数据，不会触发update，这里是渲染前最后一次更改数据的机会，不会触发其他钩子函数，一般可以在这里做初始数据的获取

    (4). 接下来开始render，渲染出真实dom，然后执行`mounted`钩子函数，此时，组件已经出现在页面中，数据，真实dom都已经处理好了，事件已经挂载好了，可以在这里操作真实dom等事情；

    (5). 当组件或实例的数据更改之后，会立即执行`beforeUpdate`,然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用`diff`算法进行对比之后重新渲染，一般不做什么事

    (6). 当更新完成后，执行`updated`，数据已经更新完成，dom也重新render完成，可以操作更新后的虚拟dom

    (7). 当经过某种途径调用$destory方法之后，立即执行`beforeDestroy`,一般在这里做一些善后工作，例如清除计时器，清除非指令绑定的事件等

    (8). 组件的数据绑定，监听去掉后只剩下dom空壳，这个时候执行`destoryed`,在这里做善后工作也可以

    嵌套组件的生命周期的执行顺序：

    vm.beforeCreate ——> vm.created ——> vm.beforeMount ——> son.beforeCreate ——> son.created ——> son.beforeMount ——> son.mounted ——> vm.mounted

    更改组件数据　　修改子组件的数据

    vm.beforeCreate ——> vm.created ——> vm.beforeMount ——> son.beforeCreate ——> son.created ——> son.beforeMount ——> son.mounted ——> vm.mounted ——> son.beforeUpdate ——> son.updated

    `Vue.nextTick()`: 在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM

    Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

    当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它

6. Vue的父组件和子组件生命周期钩子函数执行顺序

    加载渲染过程

    父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

    子组件更新过程

    父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

    父组件更新过程

    父 beforeUpdate -> 父 updated

    销毁过程

    父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

    在哪个生命周期内调用异步请求

        可以在钩子函数created，beforeMount, mounted中进行调用，因为在这三个钩子函数中，data已经创建，可以将服务端返回的数据进行赋值，

    在什么阶段才能访问操作DOM

        在钩子函数mounted被调用前，Vue已经将编译号的模版挂载到页面上，所以在mounted中可以访问操作DOM

7. `created`和`mounted`的区别
    
    `created`: 在模版渲染成html前调用，即挂载数据和绑定事件等等，此时是无法对html的dom节点进行操作的，此时更改数据不会触发`update`函数

    `mounted`: 在模版渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作，此时更改数据会触发`update`函数

8. Vue双向绑定的原理

    vue数据双向绑定事通过数据劫持结合发布者-订阅者模式的方式来实现的
    vue通过`Object.defineProperty()`这个方法重新定义了对象获取属性值(get)和设置属性值(set)

    `Object.defineProperty()`的第一个缺陷，无法监听数组变化，第二个缺陷是只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历

    1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
    
    2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对 应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
    
    3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
    
    在自身实例化时往属性订阅器(dep)里面添加自己 
    自身必须有一个 update() 方法
    待属性变动 dep.notice() 通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，则功成身退。

    4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过Observer来监听
    自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新;视图交互变化(input) -> 数据 model 变 更的双向绑定效果。


    v-model本质上是一个父子通信组件的语法糖，通过props和$emit实现

9. v-show和v-if的区别
    
    v-if: 是真正的条件渲染，因为它会确保在切换的过程中条件块内的事件监听器和子组件适当地被销毁和重建，也是惰性的，如果在初始渲染时条件为假，则什么也不做直到条件第一次变为真时，才会开始渲染条件块

    v-show: 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于css的‘display’属性进行切换

    所以v-if适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show则适用于需要非常频繁切换条件的场景

10. v-for中 key 值的作用

    在列表渲染过程中，key可以提高列表渲染的效率，提高页面的性能，因为`v-for`更新已渲染的元素列表时，默认用就地复用的原则对列表进行修改，他会根据key的值去判断某个值是否修改，如果修改了key，则重新渲染这一项，否则复用之前的元素

11. 父子组件的通信

    父传子: 通过`v-on`绑定一个变量名称，在子组件中用props进行接收

    子传父: 在子组件中绑定一个方法，将参数传入之后通过`$emit()`传递出去， `$emit()`里的参数是父组件中定义的方法名称以及参数

12. 为什么组件里的`data`必须是函数而不是对象？
    
    因为组件在Vue中是可以重复调用的，那么如果这个组件被多次调用并且`data`是对象的话，所有这个组件的实例会共同share一份`data`这样就会造成数据的泄漏，并且组件中的数据会对不上号，可能实例a的数据应用在了实例b上， 所以如果`data`是函数，就能确保每一个实例都有一份自己的`data`,使得统一组件的不同实例间的`data`不会互相影响

13. `computed`和`watch`的区别
    
    计算属性`computed`和监听器`watch`都可以观察属性的变化从而做出响应，不同的是: 

    计算属性`computed`更多是作为缓存功能的观察者，它可以将一个或者多个data的属性进行复杂的计算生成一个新的值，提供给渲染函数使用，当依赖的属性变化时，`computed`不会立即重新计算生成新的值，而是先标记为脏数据，当下次`computed`被获取的时候，才会进行重新计算并返回;

    而监听器`watch`并不具备缓存性，监听器`watch`提供一个监听函数，当监听的属性发生变化时，会立即执行该函数

    异步请求就用`watch`

    computed: 是计算属性，依赖其他属性值，并且computed的值有缓存，只有它依赖的属性值发生改变，下一次获取computed的值时，才会重新计算computed的值

    watch: 更多的是观察的作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续的操作

    应用场景:

        (1).当我们需要进行数值计算，并且依赖于其他数据时，应该使用computed，因为可利用computed的缓存特性，避免每次获取值时，都要重新计算;

        (2). 当我们需要在数据变化时执行异步或者开销较大的操作时，应该使用watch，使用watch选项允许我们执行异步操作(访问一个API)限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态，这些都是计算属性无法做到的;

14. 怎样理解Vue的单向数据流

    所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

    额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

15. Vue中key的作用

    key是为Vue中vnode的唯一标记，通过key，我们的diff操作可以更加准确，更快速，Vue的diff过程可以概括为: oldCh和newCh各有两个头尾的变量oldStartIndex, oldEndIndex和newStartIndex, newEndIndex，新旧节点会两两对比，即一共有四种比较方式, 如果以上4种都没有匹配，如果设置了key，就会用key再进行比较，在比较的过程中，遍历会往中间靠，一旦StartIndex > EndIndex表明oldCh和newCh至少一个已经遍历完了，就会结束比较(如果没有key,4种都没有匹配成功就会将newStartIndex所在的节点直接生成新的节点且插入到原有的root的子节点中)

    VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段。

    所以key是Vue中vnode的唯一标记，通过这个key，我们的diff操作可以更准确，更快速

    新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。
    需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

16. Vue2.x和Vue3.x渲染器的diff不同处

    简单来说，diff算法的过程

    (1). 同级比较，再比较子节点;
    (2). 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除);
    (3). 比较都有子节点的情况;
    (4). 递归比较子节点;

    正常Diff两个树的时间复杂度时O(N ^ 3),但实际情况下我们很少会进行跨层级的移动DOM,所以Vue将Diff进行优化，从O(N^3) -> O(N)只有当新旧children都为多个子节点时才需要用核心的diff算法进行同层级比较

    Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。

    Vue3的diff算法在创建VNode时就确定其类型1，以及在mounted/patch的过程中采用位运算来判断一个VNode的类型，在这个基础上再配合核心的Diff算法

    diff 过程中又分了好几种情况，oldCh 为 oldVnode的子节点，ch 为 Vnode的子节点：

    首先进行文本节点的判断，若 oldVnode.text !== vnode.text，那么就会直接进行文本节点的替换；

    在vnode没有文本节点的情况下，进入子节点的 diff；

    当 oldCh 和 ch 都存在且不相同的情况下，调用 updateChildren 对子节点进行 diff；

    若 oldCh不存在，ch 存在，首先清空 oldVnode 的文本节点，同时调用 addVnodes 方法将 ch 添加到elm真实 dom 节点当中；

    若 oldCh存在，ch不存在，则删除 elm 真实节点下的 oldCh 子节点；

    若 oldVnode 有文本节点，而 vnode 没有，那么就清空这个文本节点。

17. Virtual DOM  
   虚拟DOM的好处  

    虚拟DOM就是为了解决浏览器性能问题而被设计出来的，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attach到DOM树上，再进行后续操作，避免大量无谓的计算量，所以用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制

    比较两颗虚拟DOM树的差异 - diff算法

    diff算法用来比较virtual dom树的差异，如果两颗树完全比较，那么diff算法的时间复杂度位O(n^3)，但是在前端当中，会很少跨越层级地移动DOM元素，所以virtual dom只会对同一层级的元素进行对比，这样算法复杂度就可以达到O(n)

    (1).深度优先遍历记录差异;

    (2). 差异类型;

        节点替换：节点改变了，例如将上面的 div 换成 h1;

        顺序互换：移动、删除、新增子节点，例如上面 div 的子节点，把 p 和 ul 顺序互换；

        属性更改：修改了节点的属性，例如把上面 li 的 class 样式类删除；

        文本改变：改变文本节点的文本内容，例如将上面 p 节点的文本内容更改为 “Real Dom”;

    (3). 列表对比算法

        子节点的对比算法，例如      p, ul, div 的顺序换成了 div, p, ul。这个该怎么对比？如果按照同层级进行顺序对比的话，它们都会被替换掉。如 p 和 div 的 tagName 不同，p 会被 div 所替代。最终，三个节点都会被替换，这样 DOM 开销就非常大。而实际上是不需要替换节点，而只需要经过节点移动就可以达到，我们只需知道怎么进行移动

        将这个问题抽象出来其实就是字符串的最小编辑距离问题（Edition Distance），最常见的解决方法是 Levenshtein Distance , Levenshtein Distance 是一个度量两个字符序列之间差异的字符串度量标准，两个单词之间的 Levenshtein Distance 是将一个单词转换为另一个单词所需的单字符编辑（插入、删除或替换）的最小数量。Levenshtein Distance 是1965年由苏联数学家 Vladimir Levenshtein 发明的。Levenshtein Distance 也被称为编辑距离（Edit Distance），通过动态规划求解，时间复杂度为 O(M*N)。

18. Vue事件绑定原理

    原生事件绑定是通过addEventListener绑定给真实元素的，组件事件绑定是通过Vue自定义的$on实现的。

19. watch中deep和immediate的作用？

    deep，默认值是 false，代表是否深度监听。
    immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。

20. 组件之间通信的方式哪些？

    父子组件的通信: props和$emit

    祖孙组件的通信: provide/inject,允许一个祖先组件向其所有子孙后代注入一个依赖,不论组件层次有多深,并在起上下文关系成立的时间里始终生效

    $attrs和$listeners
      组件A下面有一个组件B,组件B下面有一个组件C,如果想将组件A的数据和自定义事件传递给组件C,就可以使用$attrs和$listeners。
      vm.$attrs: 当一个组件没有声明任何 prop 时(没有在props声明属性)，这里会包含所有父作用域的绑定 ，并且可以通过 v-bind="$attrs" 传入内部组件
      vm.$listeners: 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件。

    通过中央事件总线来进行通信
    通过新建一个Vue事件的bus对象,然后通过bus.$emit来触发事件,bus.$on监听触发的事件。使用中央事件总线时,需要在手动清除它,不然它会一直存在,原本只执行一次的操作,将会执行多次。

21. Vue模版编译原理

    简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段：

    生成AST树
    优化
    codegen

    首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。
    使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。
    Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。
    编译的最后一步是将优化后的AST树转换为可执行的代码。


### Vue-router

1. Vue-router是什么？有哪些组件？

    Vue-router是`Vue.js`官方的路由管理器，它和`Vue.js`的核心深度集成，让构建单页面应用变得易如反掌

    共有三个组件分别是`<router-link>, <router-view>和<keep-alive>(vue2.0提供)`

2. Vue-router有几种钩子函数？具体时什么以及参数

    (1). 前置守卫 在进入这个路由之前;
    (2). 全局解析守卫;
    (3). 后置钩子 ;
    (4). 路由独享的钩子;
    (5). 组件内的导航钩子

    导航解析流程

    (1). 导航被触发;

    (2). 在失活的组件里调用`beforeRouteLeave`守卫;

    (3). 调用全局的`beforeEach`守卫;

    (4). 在重用的组件里调用`beforeRouteUpdate`守卫;

    (5). 在路由配置里调用`beforeEnter`;

    (6). 解析异步路由组件;

    (7). 在被激活的组件里调用`beforeRouterEnter`;

    (8). 调用全局的`beforeResolve`守卫;

    (9). 导航被确认;

    (10). 调用全局的`afterEach`钩子;

    (11). 触发DOM更新;

    (12). 调用`beforeRouterEnter`守卫中传给`next`的回调函数，创建好的组件实例会作为回调函数的参数传入;

3. `$route`和`$router`的区别是什么？

    `router`为vue-router的实例，是一个全局路由对象，包含了路由跳转的方法，钩子函数等

    `route`是路由信息对象和跳转的路由对象，每一个路由都一个route对象，是一个局部对象，包含`path, params, hash, query, fullpath, matched, name`等路由信息参数

4. `keep-alive`如何使用

    `keep-alive`的作用就是缓存组件内部的状态避免重新渲染

    在`keep-alive`中会多出两个生命周期的钩子: `actived` - 组件第一次渲染时调用，之后每次缓存组件被激活时调用，`deactivated` - 组件被停用(离开路由)时调用

    提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

    使用了`keep-alive`就不会调用`beforeDestory`和`destoryed`的钩子因为组件并没有被销毁，而是被缓存起来了  

    keep-alive的中还运用了LRU(Least Recently Used)算法。

    如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

5. `hash`模式和`history`模式的区别？

    最明显的是在显示上，`hash`模式的`URL`中会夹杂着`#`号，而`history`没有；

    hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

    Vue底层对它们的实现方式不同，`hash`模式是依靠`onhashchange`事件(监听`location.hash`的改变)，而`history`模式是主要依靠的`html5 history`中新增的两个方法，`pushState()`可以改变`url`地址且不会发送请求，`replaceState()`可以读取历史记录栈，还可以对浏览器记录进行修改。

    当真正需要通过`URL`向后端发送HTTP请求的时候，比如常见的用户手动输入`URL`后回车，或者是刷新(重启)浏览器，这时候，`history`模式需要后端的支持

    因为`history`模式下，前端的`URL`必须和实际向后端发送请求的URL一致，例如有一个`URL`是带哦俣路径`path`的(例如`www.lindaidai.wang/blogs/id`)，如果后端没有对这个路径做处理的话，就会返回`404`错误，所以需要后端增加一个覆盖所有情况的候选资源，一般对配合前端给出一个`404`页面

6. Vue-router传参方式

    (1). 直接调用`$router.push`实现携带参数的跳转;

        ```
        this.$router.push({path: `/describe/${id}`})

        // 对应的路由配置
        {
         path: '/describe/:id',
         name: 'Describe',
         component: Describe
       }

       this.$route.params.id
        ```

    (2).父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。;

        ```
        this.$router.push({
            name: 'Describe',
            params: {
                id: id
            }
        })

        {
         path: '/describe/:id',
         name: 'Describe',
         component: Describe
       }

       this.$route.params.id
        ```

    (3). 父组件：使用path来匹配路由，然后通过query来传递参数;

    ```
    this.$router.push({
      path: '/describe',
      query: {
        id: id
      }
    })

    {
     path: '/describe',
     name: 'Describe',
     component: Describe
    }

    this.$route.query.id
    ```

7. Vue-router的跳转方式

    (1). router-link;
    (2). this.$router.push();
    (3). this.$router.replace();
    (4). this.$router.go();
    (5). this.$router.forward();
    (6). this.$router.back();


### Vuex

Vue组件接收交互行为，调用dispatch方法触发action相关处理，若页面状态需要改变，则调用commit方法提交mutation修改state，通过getters获取新的state的值，重新渲染Vue componments,界面随之更新

1. vuex为什么需要用 mutation 这些来修改 state 数据，而不是直接更改
    
    Vuex 单向数据流有关，因为需要知道数据修改的来源


