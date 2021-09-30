<<<<<<< HEAD
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'
=======
import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
<<<<<<< HEAD
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
=======
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });

    // check if working
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
