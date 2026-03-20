import "dotenv/config";
import logger from "./logger.js";

import displayUniqueNumbers from "./display-unique-numbers.js";

displayUniqueNumbers(1, 48, 7).then(()=> console.log("Bye")).catch(e => logger.error(e.message) )





