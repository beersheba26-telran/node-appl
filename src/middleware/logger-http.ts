import pinoHttp from "pino-http";
import logger from "../logger.js";
const logger_middleware = pinoHttp.default({
  logger,
  customLogLevel: (_req, res, error) => {
    return error || res.statusCode >= 400 ? "error" : "debug";
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
export default logger_middleware
