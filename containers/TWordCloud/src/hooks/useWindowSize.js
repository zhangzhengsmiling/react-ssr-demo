import { useState, useEffect } from 'react';

const useWindowSize = (callback) => {
  
  const [size, setSize] = useState({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });

  const onWindowSizeChange = (e) => {
		setSize({ width: e.target.innerWidth, height: e.target.innerHeight });
  }
  useEffect(() => {
  	window.addEventListener('resize', onWindowSizeChange);
  }, [])

  useEffect(() => {
	if(typeof callback === 'function')
	  callback(size);
  }, [size])

  return size;
}

export default useWindowSize;
