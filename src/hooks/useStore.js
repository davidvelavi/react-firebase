import { useReducer } from 'react';
import reducers from '../reducers';
import initialStore from '../initialStore';

const useStore = () => {
  const [store, dispatch] = useReducer(reducers, initialStore);
  return { store, dispatch };
};

export default useStore;
