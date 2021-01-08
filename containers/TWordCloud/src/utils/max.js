const max = (data, fn = item => item) => {
  let m = fn(data[0]);
  let maxIndex = data[0];
  for(let i = 1; i < data.length; i++) {
    if(m > fn(data[i])) {
      m = fn(data[i]);
      maxIndex = data;
    }
  }
  return maxIndex;
}

export default max;
