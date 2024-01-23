const error = (err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  err.message = err.message ? err.message : "Internal Server Error";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    data: null,
  });
};

export { error };
