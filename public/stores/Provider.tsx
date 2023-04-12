import React, {createContext, ReactNode, useState} from 'react';
import {ContextType, IState} from './types';

const initialState = {

};

const AppContext = createContext<ContextType>({
  store: initialState,
  setStore: Function,
});

interface IProvider {
  children: ReactNode;
}

const Provider: React.FC<IProvider> = ({children}) => {
  const [store, setState] = useState<IState>(initialState);
  const setStore = (name: string, e: any) => {
    if (name === 'reset') {
      setState(initialState);
    }
    setState(prevState => ({...prevState, [name]: e}));
  };

  return (
    <AppContext.Provider
      value={{
        store,
        setStore,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {Provider, AppContext};
