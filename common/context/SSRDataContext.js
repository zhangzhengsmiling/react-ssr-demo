import { createContext, useContext } from 'react';

export const SSRDataContext = createContext();

export const useSSRDataContext = () => {
  return useContext(SSRDataContext);
};
