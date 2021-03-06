import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

const defaultOptions = {
  forwardRef: false,
  pure: false,
};

const inject = function (ppStore, mapStore, options = {}) {
  const config = {
    ...defaultOptions,
    ...options,
  };

  return WrappedComp => {
    const {
      getDisplayName = name => `Inject(${name})`,
      pure,
      forwardRef,
    } = config;

    function InjectFunction({ ppStoreForwardedRef, ...props }) {
      const injectProps = mapStore(ppStore.stores);
      const newProps = { ...injectProps, ...props };

      return <WrappedComp {...newProps} ref={ppStoreForwardedRef} />;
    }

    const Inject = pure ? React.memo(InjectFunction) : InjectFunction;

    const wrappedComponentName =
      WrappedComp.displayName || WrappedComp.name || 'Component';
    const displayName = getDisplayName(wrappedComponentName);
    Inject.displayName = InjectFunction.displayName = displayName;
    Inject.WrappedComponent = WrappedComp;

    if (forwardRef) {
      const forwarded = React.forwardRef((props, ref) => {
        return <Inject {...props} ppStoreForwardedRef={ref} />;
      });

      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComp;

      return hoistStatics(forwarded, WrappedComp);
    }

    return hoistStatics(Inject, WrappedComp);
  };
};

export const createInject = function (ppStore) {
  return function (mapStore, options) {
    return inject(ppStore, mapStore, options);
  };
};
