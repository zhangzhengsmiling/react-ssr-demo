import { useState, useEffect } from 'react';
import { useSSRDataContext } from './SSRDataContext';

export const useSSRState = (getData) => {
  const ssrData = useSSRDataContext();
  const [state, setState] = useState(ssrData);
  useEffect(() => {
    if (!ssrData)
    getData?.(fetch).then(setState);
  }, []);
  return [state, setState];
};


