import ppStore from 'pp-store';

const initialState = {
  list: ['read book'],
};

const todoStore = ppStore.create({
  initialState,
  name: 'looseTodoStore',
});

export default todoStore;
