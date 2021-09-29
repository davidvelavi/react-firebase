import React from 'react';
import useStore from '../hooks/useStore';

const AppContext = React.createContext({});

export const AppContextProvider = ({ children }) => {
  const store = useStore();
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
