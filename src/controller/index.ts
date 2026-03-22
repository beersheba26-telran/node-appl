import "dotenv/config";
import logger from "../logger.js";
import http, { ServerResponse, IncomingMessage } from "node:http";
import calculate from "../service/calculate.js";
import { CalcData } from "../model/CalcData.js";
import { ServiceError } from "../errors/ServiceError.js";
const server = http.createServer();
const port = process.env.PORT || 3500;
server.listen(port, () => console.log(`server listening on port ${port}`));

server.on("request", async (req, res) => {
  logger.debug(`URL is ${req.url}`);
  try {
    const calcData = await getCalcData(req);
    logger.debug("calcData is " + JSON.stringify(calcData));
      const result =  calculate(calcData).toString();
      logger.debug(`result = ${result}`);
      sendResponse(res, 200, result)
    }
  catch (error: any) {
    if (error instanceof ServiceError) {
       sendResponse(res, error.code, error.message)
    } else {
        sendResponse(res, 500, `Inner Server error: ${error.message}`)
    }
  }

});
async function getCalcData(request: IncomingMessage): Promise<CalcData> {
   let data = ""
    for await (const chunk of request){
        data += chunk
    }
    logger.debug(`received JSON is ${data}`)
    const result: CalcData = JSON.parse(data)
  return result;
}
function sendResponse(response: ServerResponse, code: number, message: string): void {
    response.statusCode = code,
    response.end(message)
}
