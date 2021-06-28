const errorHandlerMiddleware = (res) => error => res.send({ message: error });

export default errorHandlerMiddleware;
