import React, { useRef } from 'react';
import counterStore from './store';

export default function Counter(props) {
  const [counter, setStore] = counterStore.useStore();
  const { actions } = counterStore;
  const renderTimes = useRef(0);
  renderTimes.current += 1;

  const onIncrement = () => {
    actions.increment();
  };

  const onDecrement = () => {
    setStore(prev => {
      return {
        count: prev.count - 1,
      };
    });
  };

  const incrementAsync = () => {
    setStore(prev => ({
      ...prev,
      loading: true,
    }));
    setTimeout(() => {
      setStore(prev => {
        return {
          count: prev.count + 1,
          loading: false,
        };
      });
    }, 1000);
  };

  return (
    <>
      <h2>Counter</h2>
      <p>
        current component render times (will render if store.loading change):{' '}
        {renderTimes.current}
      </p>
      <p>current loading: {JSON.stringify(counter.loading)}</p>
      Clicked: {counter.count} times <button onClick={onIncrement}>+</button>{' '}
      <button onClick={onDecrement}>-</button>{' '}
      <button onClick={incrementAsync}>Increment async</button>
    </>
  );
}
