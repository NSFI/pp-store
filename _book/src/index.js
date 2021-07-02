import createStore from './createStore';
import { logError } from './utils';

const ppStore = {
  stores: {},
  config(opts) {
    ppStore = {
      ...ppStore,
      opts,
    };
  },
  mode: 'loose',
  // applyMiddleware时传入的中间件， 默认加载logger
  middlewares: ['logger'],
  // store创建函数
  create(opts) {
    const { stores } = ppStore;
    const { initialState, reducer, actions, name } = opts;

    opts.mode = opts.mode || ppStore.mode;

    if (opts.mode === 'strict') {
      if (!reducer || !actions) {
        logError('propertie [reducer] [actions] is required');
      }
    }

    if (!initialState || !name) {
      logError('propertie [initialState] [name] is required');
    }

    if (stores[name]) {
      logError(`store ${name} exist, please check the store name`);
    }

    if (!opts.middlewares) {
      opts.middlewares = ppStore.middlewares;
    }

    const thisStore = createStore(opts);

    stores[name] = thisStore;
    return thisStore;
  },
  getStore(name) {
    if (!name) {
      return ppStore.stores;
    }
    return ppStore.stores[name];
  },
};

export default ppStore;

export { inject } from './inject';
