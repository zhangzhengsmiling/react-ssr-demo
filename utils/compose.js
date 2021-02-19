
const compose = (...fns) => {
  return (trigger) => {
    return fns.reduceRight((temp, fn) => {
      return fn(temp);
    }, trigger);
  }
}

export default compose;
