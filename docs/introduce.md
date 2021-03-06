
# pp-store的优点和特性

  ## 基于hook
   整个的状态共享过程使用并只使用hook特性，所以使用起来安全简单，并且维护这份状态就像维护state一样，不需要担心性能问题，React的性能优化和协调同样适用于该hook。

  ## api简洁
   在我们的宽松模式设计中，使用store将会特别简单，因为不使用Context所以也不需要Provider，可能只需要关注createStore和userStore这两个api即可，前者用来创建hook，后者则是使用，使用方式与useState保持一致。

  ## 模块数据隔离
  我们推荐尽可能的创建多个store以此来达到更好的性能，当使用useStore去共享某个模块的数据时，`组件将只会使用到该模块的数据`， 同时也能减少前期的状态设计的负担，不用担心创建新的模块的时机，就像本能的拆分组件那样，你会本能的将它们拆分新的Store中。