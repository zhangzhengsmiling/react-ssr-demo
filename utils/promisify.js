const promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if(err) {
        return reject(err.message);
      } else {
        return resolve(data);
      }
    });
  });
};

export default promisify;
