const IS_PROD = process.env.NODE_ENV === "production";

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  // Always log the full error server-side
  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.message);
  if (!IS_PROD) console.error(err.stack);

  // Never expose stack trace to client
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
    ...(IS_PROD ? {} : { stack: err.stack })
  });
};

export default errorHandler;