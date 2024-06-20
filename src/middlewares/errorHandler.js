export const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(500).json({
    status,
    message: 'Something went wrong',
    data: message,
  });
  next(err);
};
