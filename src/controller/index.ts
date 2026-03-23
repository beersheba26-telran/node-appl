import "dotenv/config"
import app from "./appl.js";
import logger from "../logger.js";
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
