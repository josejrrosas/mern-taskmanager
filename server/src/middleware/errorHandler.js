const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log full error to server logs

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: {
      message,
      code: status,
      details: err.details || null,
    },
  });
};

export default errorHandler;
